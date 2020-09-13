using ControleFluxoEmpresarial.Services.Compras.Models;
using System.Collections.Generic;

namespace ControleFluxoEmpresarial.DTO.Compras
{
    public class CalcularValorRatiadoDTO
    {
        public List<ProdutoDTO> Produtos { get; set; }

        public decimal? Frete { get; set; }

        public decimal? Seguro { get; set; }

        public decimal? OutrasDespesas { get; set; }
    }
}
