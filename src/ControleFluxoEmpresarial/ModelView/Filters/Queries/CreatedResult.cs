using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.ModelView.Filters.Queries
{
    public class CreateResult
    {
        public CreateResult(int id)
        {
            Id = id;
        }

        public int Id { get; set; }
    }
}
