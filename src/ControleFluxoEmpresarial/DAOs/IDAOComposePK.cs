using ControleFluxoEmpresarial.Entities;
using ControleFluxoEmpresarial.Filters.ModelView;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs
{
    public interface IDAOComposePK<TEntity> where TEntity : IBaseEntity
    {
        PaginationResult<TEntity> GetPagined(PaginationQuery filter);

        TEntity GetByID(params object[] id);

        object[] Insert(bool commit = true, TEntity entity = default);

        void Update(bool commit = true, TEntity entity = default);

        void Delete(bool commit = true, params object[] id);

        void Delete(bool commit = true, TEntity entity = default);

        void VerifyRelationshipDependence(params object[] id);
    }
}
