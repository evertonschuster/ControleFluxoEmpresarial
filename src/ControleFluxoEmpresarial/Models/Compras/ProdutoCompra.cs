using ControleFluxoEmpresarial.Models.Movimentos;

namespace ControleFluxoEmpresarial.Models.Compras
{
    public class ProdutoCompra
    {
        public int ProdutoId { get; set; }

        public Produto  Produto { get; set; }

        public string UnidadeMedidaId { get; set; }

        public UnidadeMedida UnidadeMedida { get; set; }

        public decimal Quantidade { get; set; }

        public decimal ValorUnitario { get; set; }

        public decimal? Desconto { get; set; }

        public decimal? IPI { get; set; }

        public decimal CustoUnitario { get; set; }
    }
}
