using ControleFluxoEmpresarial.Architectures.Exceptions;
using ControleFluxoEmpresarial.Architectures.Helper;
using ControleFluxoEmpresarial.Filters.ModelView;
using ControleFluxoEmpresarial.Models;
using ControleFluxoEmpresarial.Models.Cidades;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs
{
    public abstract class DAO<TEntity> : DAO<TEntity, int>, IDAO<TEntity, int> where TEntity : class, IBaseEntity<int>, new()
    {
        public DAO(ApplicationContext context, string tableName, string idProperty = "Id") : base(context, tableName, idProperty)
        {
        }

        public override abstract void VerifyRelationshipDependence(int id);
    }

    public abstract class DAO<TEntity, TId> : BaseDAO<TEntity>, IDAO<TEntity, TId> where TEntity : class, IBaseEntity<TId>, new()
    {
        private string TableName { get; }
        private string IdProperty { get; }
        private string NameProperty { get; }
        public bool AutoIncrement { get; set; }
        protected virtual string SqlListPagined { set; get; } = null;
        private List<string> Property
        {
            get
            {
                return typeof(TEntity).Property(IdProperty);
            }
        }



        public DAO(ApplicationContext context, string tableName, string idProperty = "Id", string nameProperty = "nome", bool autoIncrement = true) : base(context, idProperty)
        {
            this.TableName = tableName;
            this.IdProperty = idProperty;
            this.NameProperty = nameProperty;
            this.AutoIncrement = autoIncrement;
        }

        protected override TEntity MapEntity(DbDataReader reader)
        {
            var entity = reader.MapEntity<TEntity, TId>(this.Property, this.IdProperty);

            foreach (var property in typeof(TEntity).PropertyIBaseEntity<TId>())
            {
                var instance = Activator.CreateInstance(property.PropertyType);

                var properties = property.PropertyType.Property(this.IdProperty);
                var propertyEntity = reader.MapEntity(instance, properties, this.IdProperty, $"{property.Name}.");

                property.SetValue(entity, propertyEntity);
            }

            return entity;
        }

        public virtual void Delete(TId id, bool commit = true)
        {
            var sql = $@"DELETE FROM {this.TableName} 
                        WHERE {this.IdProperty} = @id";

            this.ExecuteScript(sql, new { id });
        }

        public virtual void Delete(TEntity entity, bool commit = true)
        {
            this.Delete(entity.Id, commit);
        }

        public virtual TEntity GetByID(TId id)
        {
            var sql = $@"SELECT {this.IdProperty}, {this.Property.FormatProperty()}
                          FROM {this.TableName} 
                        WHERE {this.IdProperty} = @id";


            return base.ExecuteGetFirstOrDefault(sql, parameters: new { id });
        }

        public virtual PaginationResult<TEntity> GetPagined(PaginationQuery filter)
        {
            var sql = this.SqlListPagined ?? $@"SELECT {this.IdProperty}, {this.Property.FormatProperty()}
                          FROM {this.TableName} ";

            TId byId = default;
            if (!string.IsNullOrEmpty(filter.Filter))
            {
                var sqlId = "";
                TypeConverter converter = TypeDescriptor.GetConverter(typeof(TId));
                try
                {
                    byId = (TId)converter.ConvertFrom(filter.Filter);
                    sqlId += $" OR {this.TableName}.id = @id ";
                }
                catch
                {
                }
                filter.Filter = $"%{filter.Filter.Replace(" ", "%")}%";
                sql += $" WHERE {this.TableName}.{this.NameProperty} ilike @Filter {sqlId} ";
            }

            return base.ExecuteGetPaginated(sql, $"SELECT  COUNT(*) AS TotalItem FROM {this.TableName}", new { id = byId, filter.Filter }, filter);
        }

        public virtual TId Insert(TEntity entity, bool commit = true)
        {
            var sql = $@"INSERT INTO {this.TableName} ({this.Property.FormatProperty()} {(!this.AutoIncrement ? $", {this.IdProperty} " : "")})
                         VALUES ({this.Property.FormatProperty(e => $"@{e}")}  {(!this.AutoIncrement ? $", @{this.IdProperty} " : "")})";

            entity.DataCriacao = DateTime.Now;
            entity.DataAtualizacao = DateTime.Now;
            return this.ExecuteScriptInsert(sql, entity);
        }

        public virtual void Update(TEntity entity, bool commit = true)
        {
            var sql = $@"UPDATE {this.TableName} 
                        SET {this.Property.Where(e => e != nameof(IBaseEntity<TId>.DataCriacao)).FormatProperty(e => $"{e}=@{e}")}
                        WHERE {this.IdProperty} = @Id";

            entity.DataAtualizacao = DateTime.Now;
            base.ExecuteScript(sql, entity);
        }

        public abstract void VerifyRelationshipDependence(TId id);

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
                command.CommandText = sql += $"RETURNING {this.PropertiesIds.FormatProperty(e => e)};";
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
    }
}
