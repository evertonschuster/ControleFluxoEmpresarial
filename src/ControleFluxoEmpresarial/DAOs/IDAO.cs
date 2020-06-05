using ControleFluxoEmpresarial.Filters.ModelView;
using ControleFluxoEmpresarial.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs
{
    public interface IDAO<TEntity> : IDAO where TEntity : IBaseEntity<Object>
    {
        PaginationResult<TEntity> GetPagined(PaginationQuery filter);

        TEntity GetByID(int id);

        int Insert(TEntity entity, bool commit = true);

        void Update(TEntity entity, bool commit = true);

        void Delete(int id, bool commit = true);

        void Delete(TEntity entity, bool commit = true);

    }

    public interface IDAO
    {

    }
}
