using ControleFluxoEmpresarial.Architectures.Helper;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.Entities;
using ControleFluxoEmpresarial.Filters.DTO;
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
        private string[] PropertiesId { get; }
        public DataBaseConnection Context { get; set; }
        private List<string> Property
        {
            get
            {
                return typeof(TEntity).Property();
            }
        }

        protected DAO(DataBaseConnection context, string tableName, params string[] propertiesIds) : base(context, propertiesIds)
        {
            this.TableName = tableName ?? throw new ArgumentNullException(nameof(tableName));
            this.PropertiesId = propertiesIds ?? throw new ArgumentNullException(nameof(propertiesIds));
            this.Context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public void Delete(object ids, bool commit = true)
        {
            var sql = $@"DELETE FROM {this.TableName} 
                        WHERE {this.PropertiesId.FormatProperty(e => $"{e} = @{e}", "and")}";

            base.ExecuteScript(sql, ids, commit);
        }

        public void Delete(TEntity entity, bool commit = true)
        {
            throw new NotImplementedException();
        }

        public TEntity GetByID(object ids)
        {
            throw new NotImplementedException();
        }

        public PaginationResult<TEntity> GetPagined(PaginationQuery filter)
        {
            throw new NotImplementedException();
        }

        public object[] Insert(TEntity entity, bool commit = true)
        {
            var sql = $@"INSERT INTO {this.TableName} ({this.Property.FormatProperty()} )
                         VALUES ( {this.Property.FormatProperty(e => $"@{e}")} )";

            this.ExecuteScriptInsert(sql, entity, commit);

            return null;
        }

        public void Update(TEntity entity, bool commit = true)
        {
            throw new NotImplementedException();
        }

        public abstract void VerifyRelationshipDependence(object ids);

        protected override void AddParameterValues(DbCommand command, object parameters)
        {
            command.AddParameterValues(parameters);
        }

        protected override TEntity MapEntity(DbDataReader reader)
        {
            var entity = reader.MapEntity(this.Property, this.Property, this.PropertiesId) as TEntity;

            foreach (var property in typeof(TEntity).PropertyIBaseEntity())
            {
                var instance = Activator.CreateInstance(property.PropertyType);

                var properties = property.PropertyType.Property(this.PropertiesId);
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
