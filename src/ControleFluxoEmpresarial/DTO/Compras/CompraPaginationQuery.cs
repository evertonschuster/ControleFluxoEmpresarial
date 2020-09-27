using ControleFluxoEmpresarial.Filters.DTO;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace ControleFluxoEmpresarial.DTO.Compras
{
    public class CompraPaginationQuery : PaginationQuery<List<SituacaoCompraType>>
    {
        public int? FornecedorId { get; set; }

        public string Numero { get; set; }

        public string Modelo { get; set; }

        public string Serie { get; set; }

        public List<int> ProdutosId { get; set; }

        public DateTime? DataCompraInicio { get; set; }
        public DateTime? DataCompraFim { get; set; }

    }
}
