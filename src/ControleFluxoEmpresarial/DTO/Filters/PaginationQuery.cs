using ControleFluxoEmpresarial.DTO.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Filters.DTO
{
    public class PaginationQuery
    {
        public int PageSize { get; set; } = 10;

        public int CurrentPage { get; set; } = 1;

        public string? Filter { get; set; }

        public string? OrderByProps { get; set; }

        public SituacaoType Situacao { get; set; }
    }
}
