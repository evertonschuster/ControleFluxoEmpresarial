using ControleFluxoEmpresarial.Entities;
using ControleFluxoEmpresarial.Filters.ModelView;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs
{
    public abstract class DAOComposePK<TEntity> : IDAOComposePK<TEntity> where TEntity : IBaseEntity
    {
        private string TableName { get; }
        private string[] IdsProperty { get; }
        public ApplicationContext Context { get; set; }
        protected DAOComposePK(ApplicationContext context, string tableName, params string[] idsProperty)
        {
            TableName = tableName ?? throw new ArgumentNullException(nameof(tableName));
            IdsProperty = idsProperty ?? throw new ArgumentNullException(nameof(idsProperty));
            Context = context ?? throw new ArgumentNullException(nameof(context));
        }


        public void Delete(bool commit = true, params object[] id)
        {
            throw new NotImplementedException();
        }

        public void Delete(bool commit = true, TEntity entity = default)
        {
            throw new NotImplementedException();
        }

        public TEntity GetByID(params object[] id)
        {
            throw new NotImplementedException();
        }

        public PaginationResult<TEntity> GetPagined(PaginationQuery filter)
        {
            throw new NotImplementedException();
        }

        public object[] Insert(bool commit = true, TEntity entity = default)
        {
            throw new NotImplementedException();
        }

        public void Update(bool commit = true, TEntity entity = default)
        {
            throw new NotImplementedException();
        }

        public void VerifyRelationshipDependence(params object[] id)
        {
            throw new NotImplementedException();
        }
    }
}
