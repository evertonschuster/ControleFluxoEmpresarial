using ControleFluxoEmpresarial.Architectures.Helper;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.DTO.Filters;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;

namespace ControleFluxoEmpresarial.DAOs.simple
{
    public abstract class DAO<TEntity> : DAO<TEntity, int>, IDAO<TEntity, int> where TEntity : class, IBaseModel<int>, new()
    {
        public DAO(DataBaseConnection context, string tableName, string idProperty = "Id") : base(context, tableName, idProperty)
        {
        }

        public override abstract void VerifyRelationshipDependence(int id);
    }

    public abstract class DAO<TEntity, TId> : BaseDAO<TEntity>, IDAO<TEntity, TId> where TEntity : class, IBaseModel<TId>, new()
    {
        protected string TableName { get; }
        protected string PropertyId { get; }
        private string NameProperty { get; }
        public bool AutoIncrement { get; set; }
        protected List<string> Property
        {
            get
            {
                return typeof(TEntity).Property(PropertyId);
            }
        }

        public DAO(DataBaseConnection context, string tableName, string propertyId = "Id", string nameProperty = "nome", bool autoIncrement = true) : base(context, propertyId)
        {
            this.TableName = tableName;
            this.PropertyId = propertyId;
            this.NameProperty = nameProperty;
            this.AutoIncrement = autoIncrement;
        }

        protected override TEntity MapEntity(DbDataReader reader)
        {
            var entity = reader.MapEntity<TEntity, TId>(this.Property, this.PropertyId);

            foreach (var property in typeof(TEntity).PropertyIBaseEntity())
            {
                var instance = Activator.CreateInstance(property.PropertyType);

                var properties = property.PropertyType.Property(this.PropertyId);
                var propertyEntity = reader.MapEntity(instance, properties, new string[] { this.PropertyId }, $"{property.Name}.");

                property.SetValue(entity, propertyEntity);
            }

            return entity;
        }

        public virtual void Delete(TId id, bool commit = true)
        {
            var sql = $@"DELETE FROM {this.TableName} 
                        WHERE {this.PropertyId} = @id";

            this.ExecuteScript(sql, new { id }, commit);
        }

        public virtual void Delete(TEntity entity, bool commit = true)
        {
            this.Delete(entity.Id, commit);
        }

        public virtual TEntity GetByID(TId id)
        {
            var sql = $@"SELECT {this.PropertyId}, {this.Property.FormatProperty()}
                          FROM {this.TableName} 
                        WHERE {this.PropertyId} = @id";


            return base.ExecuteGetFirstOrDefault(sql, parameters: new { id });
        }

        public virtual (string query, object @params) GetQueryListPagined(IPaginationQuery filter)
        {
            var sql = $@"SELECT {this.PropertyId}, {this.Property.FormatProperty()}
                          FROM {this.TableName} 
                        WHERE 1 = 1 ";

            TId byId = default;
            if (!string.IsNullOrEmpty(filter.Filter))
            {
                var sqlId = "";
                byId = filter.Filter.ConvertValue<TId>();

                if (byId != null)
                {
                    sqlId += $" OR {this.TableName}.id = @id ";
                }

                filter.Filter = $"%{filter.Filter.Replace(" ", "%")}%";
                sql += $" AND ({this.TableName}.{this.NameProperty} ilike @Filter {sqlId}) ";
            }

            if ((filter as PaginationQuery<SituacaoType?>).Situacao == DTO.Filters.SituacaoType.Habilitado)
            {
                sql += " AND situacao is null";
            }
            if ((filter as PaginationQuery<SituacaoType?>).Situacao == DTO.Filters.SituacaoType.Desabilitado)
            {
                sql += " AND situacao is not null";
            }

            return (sql, new { id = byId, filter.Filter });
        }

        public virtual PaginationResult<TEntity> GetPagined(IPaginationQuery filter)
        {
            var (query, @params) = this.GetQueryListPagined(filter);
            return base.ExecuteGetPaginated(query, $"SELECT  COUNT(*) AS TotalItem FROM {this.TableName}", @params, filter);
        }

        public virtual TId Insert(TEntity entity, bool commit = true)
        {
            var sql = $@"INSERT INTO {this.TableName} ({this.Property.FormatProperty()} {(!this.AutoIncrement ? $", {this.PropertyId} " : "")})
                         VALUES ({this.Property.FormatProperty(e => $"@{e}")}  {(!this.AutoIncrement ? $", @{this.PropertyId} " : "")})";

            if (entity is IBaseAuditoria auditoria)
            {
                auditoria.DataCriacao = DateTime.Now;
                auditoria.UserCriacao = this.Context.UserRequest.Id.ToString();
            }
            return this.ExecuteScriptInsert(sql, entity, commit);
        }

        public virtual void Update(TEntity entity, bool commit = true)
        {
            var property = this.Property.Where(e => e != nameof(IBaseAuditoria.DataCriacao) && e != nameof(IBaseAuditoria.UserCriacao));

            var sql = $@"UPDATE {this.TableName} 
                        SET {property.FormatProperty(e => $"{e}=@{e}")}
                        WHERE {this.PropertyId} = @Id";

            if (entity is IBaseAuditoria auditoria)
            {
                auditoria.DataAtualizacao = DateTime.Now;
                auditoria.UserAtualizacao = this.Context.UserRequest.Id.ToString();
            }
            base.ExecuteScript(sql, entity, commit);
        }

        public abstract void VerifyRelationshipDependence(TId id);

        protected override void AddParameterValues(DbCommand command, object parameters)
        {
            command.AddParameterValues(parameters);
        }

        protected virtual new TId ExecuteScriptInsert(string sql, object parameters = null, bool commit = true)
        {
            if (string.IsNullOrEmpty(sql))
            {
                throw new Exception("Sql não informado ");
            }

            var command = CreateCommand();
            this.AddParameterValues(command, parameters);

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
