using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DTO.Filters.Queries
{
    public class CreateResult
    {
        public CreateResult(object id)
        {
            Id = id;
        }

        public object Id { get; set; }
    }
}
