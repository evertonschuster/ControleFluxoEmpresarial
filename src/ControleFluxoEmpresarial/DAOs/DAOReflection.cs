using ControleFluxoEmpresarial.Architectures.Exceptions;
using ControleFluxoEmpresarial.Architectures.Helper;
using ControleFluxoEmpresarial.Filters.ModelView;
using ControleFluxoEmpresarial.Models;
using ControleFluxoEmpresarial.Models.Cidades;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs
{
    public class DAOReflection<TEntity> : DAOReflection<TEntity, int>, IDAO<TEntity, int> where TEntity : IBaseEntity<int>, new()
    {
        public DAOReflection(ApplicationContext context, string tableName, string idProperty = "Id") : base(context, tableName, idProperty)
        {
        }
    }

    public class DAOReflection<TEntity, TId> : DAO<TEntity, TId>, IDAO<TEntity, TId> where TEntity : IBaseEntity<TId>, new()
    {
        private string TableName { get; }
        private string IdProperty { get; }

        private List<string> Property
        {
            get
            {
                return typeof(TEntity).Property(IdProperty);
            }
        }

        protected virtual string SqlListPagined { set; get; } = null;


        public DAOReflection(ApplicationContext context, string tableName, string idProperty = "Id") : base(context)
        {
            this.TableName = tableName;
            this.IdProperty = idProperty;
        }

        protected override TEntity MapEntity(DbDataReader reader)
        {
            var entity = reader.MapEntity<TEntity, TId>(this.Property, this.IdProperty);

            foreach (var property in typeof(TEntity).PropertyIBaseEntity())
            {
                var instance = Activator.CreateInstance(property.PropertyType) as IBaseEntity<TId>;

                var properties = property.PropertyType.Property("Id");
                var propertyEntity = reader.MapEntity<TEntity, TId>((TEntity)instance, properties, "Id", $"{property.Name}.");

                property.SetValue(entity, propertyEntity);
            }

            return entity;
        }

        public override void Delete(TId id, bool commit = true)
        {
            var sql = $@"DELETE FROM {this.TableName} 
                        WHERE {this.IdProperty} = @id";

            this.ExecuteScript(sql, new { id });
        }

        public override void Delete(TEntity entity, bool commit = true)
        {
            this.Delete(entity.Id, commit);
        }

        public override TEntity GetByID(TId id)
        {
            var sql = $@"SELECT {this.IdProperty}, {this.Property.FormatProperty()}
                          FROM {this.TableName} 
                        WHERE {this.IdProperty} = @id";


            return base.ExecuteGetFirstOrDefault(sql, parameters: new { id });
        }

        public override PaginationResult<TEntity> GetPagined(PaginationQuery filter)
        {
            var sql = this.SqlListPagined ?? $@"SELECT {this.IdProperty}, {this.Property.FormatProperty()}
                          FROM {this.TableName} ";

            int byId = 0;
            if (!string.IsNullOrEmpty(filter.Filter))
            {
                var sqlId = "";
                if (Int32.TryParse(filter.Filter, out byId))
                {
                    sqlId += $" OR id = @id ";
                }
                filter.Filter = $"%{filter.Filter}%";
                sql += $" WHERE nome ilike @Filter {sqlId} ";
            }

            return base.ExecuteGetPaginated(sql, new { id = byId, filter.Filter }, filter);
        }

        public override int Insert(TEntity entity, bool commit = true)
        {
            var sql = $@"INSERT INTO {this.TableName} ({this.Property.FormatProperty()})
                         VALUES ({this.Property.FormatProperty(e => $"@{e}")})";

            entity.DataCriacao = DateTime.Now;
            entity.DataAtualizacao = DateTime.Now;
            return base.ExecuteScriptInsert(sql, entity);
        }

        public override void Update(TEntity entity, bool commit = true)
        {
            var sql = $@"UPDATE {this.TableName} 
                        SET {this.Property.Where(e => e != nameof(IBaseEntity<TId>.DataCriacao)).FormatProperty(e => $"{e}=@{e}")}
                        WHERE Id = @Id";

            entity.DataAtualizacao = DateTime.Now;
            base.ExecuteScript(sql, entity);
        }
    }
}
