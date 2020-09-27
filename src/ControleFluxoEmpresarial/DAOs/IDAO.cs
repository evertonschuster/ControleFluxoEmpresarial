using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models;

namespace ControleFluxoEmpresarial.DAOs
{
    public interface IDAO<TEntity, TId> : IDAO where TEntity : IBaseModel<TId>
    {
        PaginationResult<TEntity> GetPagined(IPaginationQuery filter);

        TEntity GetByID(TId id);

        TId Insert(TEntity entity, bool commit = true);

        void Update(TEntity entity, bool commit = true);

        void Delete(TId id, bool commit = true);

        void Delete(TEntity entity, bool commit = true);

        void VerifyRelationshipDependence(TId id);

        void Commit();
    }

    public interface IDAO
    {

    }
}
