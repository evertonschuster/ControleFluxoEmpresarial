using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs
{
    public interface IDAO<TEntity> where TEntity : class
    {
        IQueryable<TEntity> GetContext();

        TEntity GetByID(int id);

        void Insert(TEntity entity);

        void Update(TEntity entity);

        void Delete(int id);

        void Delete(TEntity entity);

        void InsertOrUpdate(TEntity entity);

        //EntityEntry<TEntity> Attach(TEntity entity);

        int SalveChanges();
    }
}
