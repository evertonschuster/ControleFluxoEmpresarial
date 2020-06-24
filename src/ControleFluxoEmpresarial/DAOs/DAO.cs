using ControleFluxoEmpresarial.Architectures.Helper;
using ControleFluxoEmpresarial.Filters.ModelView;
using ControleFluxoEmpresarial.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs
{

    public abstract class DAO<TEntity, TId> : BaseDAO<TEntity>, IDAO<TEntity, TId> where TEntity : IBaseEntity<TId>, new()
    {
        public DAO(ApplicationContext context) : base(context)
        {
        }

        #region PUBLIC CRUD

        public virtual void Delete(TId id, bool commit = true)
        {
            throw new NotImplementedException();
        }

        public virtual void Delete(TEntity entity, bool commit = true)
        {
            this.Delete(entity.Id, commit);
        }

        public virtual TEntity GetByID(TId id)
        {
            throw new NotImplementedException();
        }


        public virtual TId Insert(TEntity entity, bool commit = true)
        {
            throw new Exception();
        }

        public virtual void Update(TEntity entity, bool commit = true)
        {
        }

        public virtual PaginationResult<TEntity> GetPagined(PaginationQuery filter)
        {
            throw new Exception();
        }


        #endregion

        #region PRIVATE METHOD

        protected override TEntity MapEntity(DbDataReader reader)
        {
            var entity = new TEntity();
            entity.Id = reader.GetFieldValue<TId>("Id");

            return entity;
        }

        protected override void AddParameterValues(DbCommand command, object parameters)
        {
            command.AddParameterValues<TId>(parameters);
        }

        protected virtual new TId ExecuteScriptInsert(string sql, object parameters = null, bool commit = true)
        {
            if (string.IsNullOrEmpty(sql))
            {
                throw new Exception("Sql não informado ");
            }

            this.CreateTransaction(this.Transaction);
            var command = CreateCommand();
            command.AddParameterValues<TId>(parameters);

            try
            {
                command.CommandText = sql += "RETURNING id;";
                command.CommandType = CommandType.Text;

                Console.WriteLine("SQL => " + command.CommandText);

                TId id = (TId)Convert.ChangeType(command.ExecuteScalar(), typeof(TId));

                if (commit)
                {
                    this.Transaction.Commit();
                }

                return id;
            }
            catch
            {
                command.Transaction?.Rollback();
                throw;
            }
            finally
            {
                if (commit)
                {
                    command.Connection.Close();
                }
            }
        }

        public abstract void VerifyRelationshipDependence(TId id);

        #endregion
    }
}
