using ControleFluxoEmpresarial.Architectures.Exceptions;
using ControleFluxoEmpresarial.Architectures.Helper;
using ControleFluxoEmpresarial.Filters.ModelView;
using ControleFluxoEmpresarial.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs
{
    public class DAOReflection<TEntity> : DAO<TEntity>, IDAO<TEntity> where TEntity : BaseEntity, new()
    {
        private string TableName { get; }
        private string IdProperty { get; }

        private List<string> Property
        {
            get
            {
                var properties = typeof(TEntity).GetProperties();


                return properties.Where(e => e.Name != this.IdProperty &&
                (
                    e.PropertyType.IsPrimitive ||
                    e.PropertyType == typeof(string) ||
                    e.PropertyType == typeof(DateTime)
                )).Select(e => e.Name).ToList();
            }
        }



        public DAOReflection(ApplicationContext context, string tableName, string idProperty = "Id") : base(context)
        {
            this.TableName = tableName;
            this.IdProperty = idProperty;
        }

        protected override TEntity MapEntity(DbDataReader reader)
        {
            var entity = base.MapEntity(reader);
            entity.Id = reader.GetInt32(IdProperty);
            foreach (var propertyName in this.Property)
            {
                var property = typeof(TEntity).GetProperty(propertyName);

                if (property.PropertyType == typeof(int))
                {
                    property.SetValue(entity, reader.GetInt32(property.Name));
                }
                else if (property.PropertyType == typeof(decimal))
                {
                    property.SetValue(entity, reader.GetDecimal(property.Name));
                }
                else if (property.PropertyType == typeof(double))
                {
                    property.SetValue(entity, reader.GetDouble(property.Name));
                }
                else if (property.PropertyType == typeof(string))
                {
                    property.SetValue(entity, reader.GetString(property.Name));
                }
                else if (property.PropertyType == typeof(DateTime))
                {
                    property.SetValue(entity, reader.GetDateTime(property.Name));
                }
                else
                {
                    throw new BusinessException("Deu Muito RUIM");
                }
            }


            return entity;
        }

        public override void Delete(int id, bool commit = true)
        {
            var sql = $@"DELETE FROM {this.TableName} 
                        WHERE {this.IdProperty} = @id";

            this.ExecuteScript(sql, new { id });
        }

        public override void Delete(TEntity entity, bool commit = true)
        {
            this.Delete(entity.Id, commit);
        }

        public override TEntity GetByID(int id)
        {
            var sql = $@"SELECT {this.IdProperty}, {this.Property.Aggregate((i, j) => i + ", " + j)}
                          FROM {this.TableName} 
                        WHERE {this.IdProperty} = @id";


            return base.ExecuteGetFirstOrDefault(sql, parameters: new { id });
        }

        public override PaginationResult<TEntity> GetPagined(PaginationQuery filter)
        {
            var sql = $@"SELECT {this.IdProperty}, {this.Property.Aggregate((i, j) => i + ", " + j)}
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
                sql += $" WHERE nome like @Filter {sqlId} ";
            }

            return base.ExecuteGetPaginated(sql, new { id = byId, filter.Filter }, filter);
        }

        public override int Insert(TEntity entity, bool commit = true)
        {
            var sql = $@"INSERT INTO {this.TableName} ({this.Property.Aggregate((i, j) => i + ", " + j)})
                         VALUES (@{this.Property.Aggregate((i, j) => i + ", @" + j)})";

            return base.ExecuteScriptInsert(sql, entity);
        }

        public override void Update(TEntity entity, bool commit = true)
        {
            var sql = $@"UPDATE {this.TableName} 
                        SET {this.Property.FirstOrDefault() }=@{this.Property.Aggregate((i, j) => $"{i},\t\t\t\n {j}=@{j}")}
                        WHERE Id = @Id";

            base.ExecuteScript(sql, entity);
        }
    }
}
