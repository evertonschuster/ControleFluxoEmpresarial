using ControleFluxoEmpresarial.Architectures.Exceptions;
using ControleFluxoEmpresarial.DAOs.Compras;
using ControleFluxoEmpresarial.DAOs.Movimentos;
using ControleFluxoEmpresarial.DAOs.Pessoas;
using ControleFluxoEmpresarial.DTO.Compras;
using ControleFluxoEmpresarial.DTO.Users;
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
        public UserDAO UserDAO { get; set; }
        public CompraDAO CompraDAO { get; set; }
        public ProdutoDAO ProdutoDAO { get; set; }
        public UserRequest UserRequest { get; set; }
        public ContaPagarDAO ContaPagarDAO { get; set; }
        public CompraProdutoDAO CompraProdutoDAO { get; set; }



        public CompraService(CompraDAO compraDAO, ContaPagarDAO contaPagarDAO, CompraProdutoDAO compraProdutoDAO, ProdutoDAO produtoDAO, UserRequest userRequest, UserDAO userDAO)
        {
            this.UserDAO = userDAO ?? throw new System.ArgumentNullException(nameof(userDAO));
            this.CompraDAO = compraDAO ?? throw new System.ArgumentNullException(nameof(compraDAO));
            this.ProdutoDAO = produtoDAO ?? throw new System.ArgumentNullException(nameof(produtoDAO));
            this.UserRequest = userRequest ?? throw new System.ArgumentNullException(nameof(userRequest));
            this.ContaPagarDAO = contaPagarDAO ?? throw new System.ArgumentNullException(nameof(contaPagarDAO));
            this.CompraProdutoDAO = compraProdutoDAO ?? throw new System.ArgumentNullException(nameof(compraProdutoDAO));
        }

        public Compra GetByID(CompraId id)
        {
            var compra = this.CompraDAO.GetByID(id);
            compra.Produtos = this.CompraProdutoDAO.ListByCompraId(compra.GetId());
            compra.Parcelas = this.ContaPagarDAO.ListByCompraId(compra.GetId());

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
                var novoValorCompra = (produtoDb.Quantidade * produtoDb.ValorCompra + compraProduto.Quantidade * compraProduto.ValorUnitario) / (compraProduto.Quantidade + produtoDb.Quantidade);

                produtoDb.ValorCompra = novoValorCompra;
                produtoDb.ValorVenda = novoValorCompra * (1 + produtoDb.PercentualLucro / 100);
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

        //Cancelar 
        //Validar se tem estoque que pode ser cancelado
        //Se uma parcela ja for dado baixa n pode, precisa cancelar a baixa
        //Cancelar compra, deve voltar o valor original do produto
        public void CancelarCompra(CancelarCompra model)
        {
            var compraId = new CompraId()
            {
                FornecedorId = model.FornecedorId,
                Modelo = model.Modelo,
                Numero = model.Numero,
                Serie = model.Serie
            };
            var result = this.UserDAO.PasswordSignIn(this.UserRequest.UserNome, model.Senha);
            if (!result.Succeeded)
            {
                throw new BusinessException(new { Senha = "Senha inválido" });
            }

            var compra = this.GetByID(compraId);
            var dataCancelamento = DateTime.Now;

            foreach (var contaPagar in compra.Parcelas)
            {
                if (contaPagar.DataBaixa != null)
                {
                    throw new BusinessException(new { Numero = "Compra já possuir uma conta a pagar baixada." });
                }

                contaPagar.DataCancelamento = dataCancelamento;
                contaPagar.UserCancelamento = UserRequest.Id.ToString();
                contaPagar.JustificativaCancelamento = model.Justificativa;
                this.ContaPagarDAO.Update(contaPagar, false);
            }


            foreach (var produtoCompra in compra.Produtos)
            {
                var produtoDb = this.ProdutoDAO.GetByID(produtoCompra.ProdutoId);

                //(ValorAtual * (Estoque + QntdCompra)) - (QntdCompra * ValorCompra)) / EstoqueSemCompra
                var novoCusto = (produtoDb.ValorCompra * (produtoDb.Quantidade) - (produtoCompra.Quantidade * produtoCompra.ValorUnitario)) / (produtoDb.Quantidade - produtoCompra.Quantidade);

                produtoDb.Quantidade -= produtoCompra.Quantidade;
                produtoDb.ValorCompra = novoCusto;
                if (produtoDb.Quantidade < 0)
                {
                    throw new BusinessException(new { Quantidade = $"Sem Estoque do produto {produtoDb.Nome}" });
                }

                this.ProdutoDAO.Update(produtoDb, false);
            }

            compra.DataCancelamento = dataCancelamento;
            compra.UserCancelamento = UserRequest.Id.ToString();
            compra.JustificativaCancelamento = model.Justificativa;
            this.CompraDAO.Update(compra);
        }

        internal PaginationResult<Compra> GetPagined(IPaginationQuery filter)
        {
            var result = this.CompraDAO.GetPagined(filter);
            foreach (var compra in result.Result)
            {
                compra.Produtos = this.CompraProdutoDAO.ListByCompraId(compra.GetId());
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
                    CustoUnitario = custoUnitario,
                };

                result.Add(prodCompra);
            }

            return result;
        }


    }
}
