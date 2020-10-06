using ControleFluxoEmpresarial.Models.Movimentos;

namespace ControleFluxoEmpresarial.Services.Compras.Models
{
    public class ProdutoDTO
    {
        public int Id { get; set; }

        public Produto Produto { get; set; }

        public int Quantidade { get; set; }

        public decimal ValorUnitario { get; set; }

        public decimal? Desconto { get; set; }

        public decimal? IPI { get; set; }
    }
}
   