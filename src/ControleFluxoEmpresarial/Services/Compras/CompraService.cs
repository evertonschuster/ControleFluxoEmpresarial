using ControleFluxoEmpresarial.Models.Compras;
using ControleFluxoEmpresarial.Services.Compras.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ControleFluxoEmpresarial.Services.Compras
{
    public class CompraService : IService
    {
        public List<ProdutoCompra> CalcularValorRatiado(List<ProdutoDTO> produtos, decimal? frete, decimal? seguro, decimal? outros)
        {
            var result = new List<ProdutoCompra>(produtos.Count);
            var totalProduto = produtos.Sum(e => e.ValorUnitario * e.Quantidade);
            var totalCusto = (frete ?? 0) + (seguro ?? 0) + (outros ?? 0);

            foreach (var produto in produtos)
            {
                var percentualProd = (produto.Quantidade * produto.ValorUnitario) / totalProduto;
                var custoProd = percentualProd * totalCusto;
                var custoUnitario = produto.ValorUnitario + (custoProd / produto.Quantidade);

                var prodCompra = new ProdutoCompra()
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

            return result;
        }
    }
}
