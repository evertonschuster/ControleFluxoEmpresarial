using ControleFluxoEmpresarial.Filters.DTO;
using System;
using System.Collections.Generic;

namespace ControleFluxoEmpresarial.DTO.Vendas
{
    public class VendaPaginationQuery : PaginationQuery<List<SituacaoVendaType>>
    {
        public int? ClienteId { get; set; }

        public string Numero { get; set; }

        public string Modelo { get; set; }

        public string Serie { get; set; }

        public List<int> ProdutosId { get; set; }

        public DateTime? DataVendaInicio { get; set; }
        public DateTime? DataVendaFim { get; set; }

    }
}
