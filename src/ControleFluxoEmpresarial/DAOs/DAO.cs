using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs
{
    public class DAO<TEntity> : IDAO<TEntity> where TEntity : class
    {
        public virtual void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public virtual void Delete(TEntity entity)
        {
            throw new NotImplementedException();
        }

        public virtual TEntity GetByID(int id)
        {
            throw new NotImplementedException();
        }

        public virtual IQueryable<TEntity> GetContext()
        {
            throw new NotImplementedException();
        }

        public virtual void Insert(TEntity entity)
        {
            throw new NotImplementedException();
        }

        public virtual void InsertOrUpdate(TEntity entity)
        {
            throw new NotImplementedException();
        }

        public virtual int SalveChanges()
        {
            throw new NotImplementedException();
        }

        public virtual void Update(TEntity entity)
        {
            throw new NotImplementedException();
        }
    }
}
