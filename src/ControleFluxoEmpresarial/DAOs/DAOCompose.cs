using ControleFluxoEmpresarial.Architectures.Helper;
using ControleFluxoEmpresarial.Entities;
using ControleFluxoEmpresarial.Filters.ModelView;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs.compose
{
    public abstract class DAO<TEntity> : BaseDAO<TEntity>, IDAO where TEntity : class, IBaseEntity
    {
        private string TableName { get; }
        private string[] PropertiesIds { get; }
        public ApplicationContext Context { get; set; }
        private List<string> Property
        {
            get
            {
                return typeof(TEntity).Property();
            }
        }

        protected DAO(ApplicationContext context, string tableName, params string[] propertiesIds) : base(context, propertiesIds)
        {
            this.TableName = tableName ?? throw new ArgumentNullException(nameof(tableName));
            this.PropertiesIds = propertiesIds ?? throw new ArgumentNullException(nameof(propertiesIds));
            this.Context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public void Delete(bool commit = true, params object[] ids)
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
            var sql = $@"INSERT INTO {this.TableName} ({this.Property.FormatProperty()} )
                         VALUES ( {this.Property.FormatProperty(e => $"@{e}")} )";

            entity.DataCriacao = DateTime.Now;
            entity.DataAtualizacao = DateTime.Now;
            this.ExecuteScriptInsert(sql, entity, commit);

            return null;
        }

        public void Update(bool commit = true, TEntity entity = default)
        {
            throw new NotImplementedException();
        }

        public abstract void VerifyRelationshipDependence(params object[] id);

        protected override void AddParameterValues(DbCommand command, object parameters)
        {
            command.AddParameterValues(parameters);
        }

        protected override TEntity MapEntity(DbDataReader reader)
        {
            var entity = reader.MapEntity(this.Property, this.Property, this.PropertiesIds) as TEntity;

            foreach (var property in typeof(TEntity).PropertyIBaseEntity())
            {
                var instance = Activator.CreateInstance(property.PropertyType);

                var properties = property.PropertyType.Property(this.PropertiesIds);
                var propertyEntity = reader.MapEntity(instance, properties, new string[] { "Id" }, $"{property.Name}.");

                property.SetValue(entity, propertyEntity);
            }

            return entity;
        }

        protected override void ExecuteScriptInsert(string sql, object parameters = null, bool commit = true)
        {
            if (string.IsNullOrEmpty(sql))
            {
                throw new Exception("Sql não informado ");
            }

            this.CreateTransaction(this.Transaction);
            var command = CreateCommand();
            this.AddParameterValues(command, parameters);

            try
            {
                command.CommandText = sql;
                command.CommandType = CommandType.Text;

                Console.WriteLine("SQL => " + command.CommandText);

                command.ExecuteNonQuery();

                if (commit)
                {
                    this.Transaction.Commit();
                }
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
    }
}
