using ControleFluxoEmpresarial.Filters.ModelView;
using ControleFluxoEmpresarial.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs
{
    public interface IDAO<TEntity> where TEntity : IBaseEntity
    {
        PaginationResult<TEntity> GetPagined(PaginationQuery filter);

        TEntity GetByID(int id);

        int Insert(TEntity entity);

        void Update(TEntity entity);

        void Delete(int id);

        void Delete(TEntity entity);

    }
}
