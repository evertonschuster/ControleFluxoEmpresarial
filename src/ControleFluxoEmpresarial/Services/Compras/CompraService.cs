using ControleFluxoEmpresarial.DAOs.Compras;
using ControleFluxoEmpresarial.DAOs.Movimentos;
using ControleFluxoEmpresarial.DTO.Compras;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Compras;
using ControleFluxoEmpresarial.Services.Compras.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ControleFluxoEmpresarial.Services.Compras
{
    public class CompraService : IService
    {
        public CompraService(CompraDAO compraDAO, ContaPagarDAO contaPagarDAO, CompraProdutoDAO compraProdutoDAO, ProdutoDAO produtoDAO)
        {
            this.CompraDAO = compraDAO ?? throw new System.ArgumentNullException(nameof(compraDAO));
            this.ProdutoDAO = produtoDAO ?? throw new System.ArgumentNullException(nameof(produtoDAO));
            this.ContaPagarDAO = contaPagarDAO ?? throw new System.ArgumentNullException(nameof(contaPagarDAO));
            this.CompraProdutoDAO = compraProdutoDAO ?? throw new System.ArgumentNullException(nameof(compraProdutoDAO));
        }
        public CompraDAO CompraDAO { get; set; }
        public ProdutoDAO ProdutoDAO { get; set; }

        public ContaPagarDAO ContaPagarDAO { get; set; }

        public CompraProdutoDAO CompraProdutoDAO { get; set; }


        public Compra GetByID(CompraId id)
        {
            var compra = this.CompraDAO.GetByID(id);
            compra.Produtos = this.CompraProdutoDAO.GetByCompraId(compra.GetId());
            compra.Parcelas = this.ContaPagarDAO.GetByCompraId(compra.GetId());

            return compra;
        }


        //Atualizar valor de venda, (Media ponderada)
        //Atualizar estoque
        //Lancar contas a pagar
        //Validar se conta a pagar ja foi lançada
        public void LancarCompra(Compra compra)
        {
            this.CompraDAO.Insert(compra, false);

            foreach (var compraProduto in compra.Produtos)
            {
                compraProduto.Modelo = compra.Modelo;
                compraProduto.Serie = compra.Serie;
                compraProduto.Numero = compra.Numero;
                compraProduto.FornecedorId = compra.FornecedorId;

                this.CompraProdutoDAO.Insert(compraProduto, false);


                //Atualiza estoque e valor do produto
                var produtoDb = this.ProdutoDAO.GetByID(compraProduto.ProdutoId);
                var custoCompra = (produtoDb.Quantidade * produtoDb.ValorCompra + compraProduto.Quantidade * compraProduto.ValorUnitario) / (compraProduto.Quantidade + produtoDb.Quantidade);

                produtoDb.ValorCompra = custoCompra;
                produtoDb.ValorVenda = custoCompra * (1 + produtoDb.PercentualLucro / 100);
                produtoDb.Quantidade += compraProduto.Quantidade;
                this.ProdutoDAO.Update(produtoDb, false);
            }

            foreach (var parcela in compra.Parcelas)
            {
                parcela.Modelo = compra.Modelo;
                parcela.Serie = compra.Serie;
                parcela.Numero = compra.Numero;
                parcela.FornecedorId = compra.FornecedorId;
                parcela.DataEmissao = compra.DataEmissao;
                parcela.Descricao = "Lançada apartir de Compra";

                this.ContaPagarDAO.Insert(parcela, false);
            }

            this.CompraDAO.Commit();
        }

        internal PaginationResult<Compra> GetPagined(PaginationQuery filter)
        {
            var result = this.CompraDAO.GetPagined(filter);
            foreach (var compra in result.Result)
            {
                compra.Produtos = this.CompraProdutoDAO.GetByCompraId(compra.GetId());
            }

            return result;
        }

        public List<CompraProduto> CalcularValorRatiado(List<ProdutoDTO> produtos, decimal? frete, decimal? seguro, decimal? outros)
        {
            var result = new List<CompraProduto>(produtos.Count);
            var totalProduto = produtos.Sum(e => e.ValorUnitario * e.Quantidade);
            var totalCusto = (frete ?? 0) + (seguro ?? 0) + (outros ?? 0);

            foreach (var produto in produtos)
            {
                var percentualProd = (produto.Quantidade * produto.ValorUnitario) / totalProduto;
                var custoProd = percentualProd * totalCusto;
                var custoUnitario = produto.ValorUnitario + (custoProd / produto.Quantidade);

                var prodCompra = new CompraProduto()
                {
                    ProdutoId = produto.Produto.Id,
                    Produto = produto.Produto,
                    ValorUnitario = produto.ValorUnitario,
                    Desconto = produto.Desconto,
                    Quantidade = produto.Quantidade,
                    IPI = produto.IPI,
                    UnidadeMedida = produto.UnidadeMedida,
                    UnidadeMedidaId = produto.UnidadeMedida.Id,
                    CustoUnitario = custoUnitario
                };

                result.Add(prodCompra);
            }

            Console.WriteLine("teste da MAE");

            return result;
        }

        //Cancelar compra, deve voltar o valor original do produto
    }
}
