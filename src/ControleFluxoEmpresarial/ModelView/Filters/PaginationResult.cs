using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Filters.ModelView
{
    public class PaginationResult<TEntity>
    {
        [DataMember]
        public int PageSize { get; set; } = 10;

        [DataMember]
        public int CurrentPage { get; set; } = 1;

        [DataMember]
        public int TotalItem { get; set; }

        [DataMember]
        public IList<TEntity> Result { get; set; } = new List<TEntity>();
    }
}
