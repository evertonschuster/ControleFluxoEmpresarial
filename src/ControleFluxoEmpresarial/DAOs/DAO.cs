using ControleFluxoEmpresarial.Architectures.Helper;
using ControleFluxoEmpresarial.Filters.ModelView;
using ControleFluxoEmpresarial.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs
{

    //INSERT INTO Paises(Nome) VALUES('bob');
    //SELECT SCOPE_IDENTITY()

    //Insert into Paises(Nome) Output Inserted.Id Values ('example')


    public abstract class DAO<TEntity, TId> : IDAO<TEntity, TId> where TEntity : IBaseEntity<TId>, new()
    {
        private ApplicationContext Context { get; set; }
        public DbTransaction Transaction { get; set; }
        public DbConnection Connection { get { return this.Context.Database.GetDbConnection(); } }


        public DAO(ApplicationContext context)
        {
            this.Context = context ?? throw new ArgumentNullException(nameof(context));
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

        public abstract void VerifyRelationshipDependence(TId id);


        #endregion


        #region PRIVATE METHOD


        public void CreateTransaction(DbTransaction transaction = null)
        {
            var connection = this.Context.Database.GetDbConnection();

            if (transaction == null || connection.State == ConnectionState.Closed)
            {
                connection.Open();
                this.Transaction = connection.BeginTransaction();
            }
            else
            {
                this.Transaction = transaction;
            }
        }

        protected DbCommand CreateCommand()
        {
            var connection = this.Context.Database.GetDbConnection();
            var command = connection.CreateCommand();
            command.Transaction = this.Transaction;

            return command;
        }

        protected virtual TEntity MapEntity(DbDataReader reader)
        {
            var entity = new TEntity();
            entity.Id = reader.GetFieldValue<TId>("Id");

            return entity;
        }

        protected virtual void ExecuteScript(string sql, object parameters = null, bool commit = true)
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
                this.Transaction?.Rollback();
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

        protected virtual TEntity ExecuteGetFirstOrDefault(string sql, object parameters = null, bool closeConnection = true)
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
                command.CommandText = sql += " limit 1";
                command.CommandType = CommandType.Text;

                Console.WriteLine("SQL => " + command.CommandText);

                var reader = command.ExecuteReader();

                if (reader.HasRows)
                {
                    reader.Read();
                    var entity = MapEntity(reader);
                    reader.Close();
                    return entity;
                }

                reader.Close();
                return default(TEntity);

            }
            finally
            {
                if (closeConnection)
                {
                    command.Connection.Close();
                }
            }
        }

        protected virtual bool ExecuteExist(string sql, object parameters = null, bool closeConnection = true)
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
                command.CommandText = sql += " limit 1";
                command.CommandType = CommandType.Text;
                Console.WriteLine("SQL => " + command.CommandText);

                var reader = command.ExecuteReader();

                if (reader.HasRows)
                {
                    reader.Close();
                    return true;
                }

                reader.Close();
                return false;

            }
            finally
            {
                if (closeConnection)
                {
                    command.Connection.Close();
                }
            }
        }

        protected virtual PaginationResult<TEntity> ExecuteGetPaginated(string sql, string sqlTotalItem, object @params = null, PaginationQuery filter = default, bool closeConnection = true)
        {
            if (string.IsNullOrEmpty(sql))
            {
                throw new Exception("Sql não informado ");
            }
            if (!sql.Contains("order", StringComparison.OrdinalIgnoreCase))
            {
                sql += " ORDER BY Id  ";
            }
            var result = new PaginationResult<TEntity>()
            {
                CurrentPage = filter.CurrentPage,
                PageSize = filter.PageSize,
            };

            this.CreateTransaction(this.Transaction);
            var commandCount = CreateCommand();
            var command = CreateCommand();


            try
            {
                commandCount.CommandText = sqlTotalItem;
                commandCount.CommandType = CommandType.Text;

                var readerCount = commandCount.ExecuteReader();
                if (readerCount.HasRows)
                {
                    readerCount.Read();
                    result.TotalItem = readerCount.GetInt32("TotalItem");
                    readerCount.Close();

                    var totalPageDb = Math.Ceiling((double)result.TotalItem / filter.PageSize);
                    if (totalPageDb < filter.CurrentPage && totalPageDb != 0)
                    {
                        result.CurrentPage = (int)totalPageDb;
                        filter.CurrentPage = (int)totalPageDb;
                    }
                }
                else
                {
                    result.TotalItem = 0;
                    readerCount.Close();
                    return result;
                }


                command.AddParameterValues<TId>(@params);
                command.CommandText = sql
                                      + $@" OFFSET {filter.PageSize * (filter.CurrentPage - 1) }  "
                                      + $@" LIMIT {filter.PageSize}  ";

                command.CommandType = CommandType.Text;
                Console.WriteLine("SQL => " + command.CommandText);
                var reader = command.ExecuteReader();

                var list = new List<TEntity>();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        list.Add(MapEntity(reader));
                    }
                }
                reader.Close();
                result.Result = list;
                return result;
            }
            finally
            {
                if (closeConnection)
                {
                    command.Connection.Close();
                }
            }
        }

        protected virtual List<TEntity> ExecuteGetAll(string sql, object @params = null, bool closeConnection = true)
        {
            if (string.IsNullOrEmpty(sql))
            {
                throw new Exception("Sql não informado ");
            }
            if (!sql.Contains("order", StringComparison.OrdinalIgnoreCase))
            {
                sql += " ORDER BY Id  ";
            }


            this.CreateTransaction(this.Transaction);
            var command = CreateCommand();
            command.AddParameterValues<TId>(@params);

            try
            {
                command.CommandText = sql;
                command.CommandType = CommandType.Text;
                Console.WriteLine("SQL => " + command.CommandText);

                var reader = command.ExecuteReader();

                var list = new List<TEntity>();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        list.Add(MapEntity(reader));
                    }
                }
                reader.Close();

                return list.Count == 0 ? null : list;
            }
            finally
            {
                if (closeConnection)
                {
                    command.Connection.Close();
                }
            }
        }

        protected virtual TId ExecuteScriptInsert(string sql, object parameters = null, bool commit = true)
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

        #endregion
    }
}
