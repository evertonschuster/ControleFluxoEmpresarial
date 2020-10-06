using ControleFluxoEmpresarial.Entities;
using ControleFluxoEmpresarial.Models.Movimentos;

namespace ControleFluxoEmpresarial.Models.Compras
{
    public class CompraProduto : IBaseEntity
    {
        public string Modelo { get; set; }
        public string Serie { get; set; }
        public string Numero { get; set; }
        public int FornecedorId { get; set; }

        public int ProdutoId { get; set; }

        public Produto Produto { get; set; }

        public decimal Quantidade { get; set; }

        public decimal ValorUnitario { get; set; }

        public decimal? Desconto { get; set; }

        public decimal? IPI { get; set; }

        public decimal CustoUnitario { get; set; }
    }
}
