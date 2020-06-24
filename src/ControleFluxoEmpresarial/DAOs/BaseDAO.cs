using ControleFluxoEmpresarial.Architectures.Helper;
using ControleFluxoEmpresarial.Filters.DTO;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs
{
    public abstract class BaseDAO<TEntity> : IDAO
    {
        public string[] PropertiesIds { get; }
        private ApplicationContext Context { get; }
        public DbTransaction Transaction { get; set; }
        public DbConnection Connection { get { return this.Context.Database.GetDbConnection(); } }


        public BaseDAO(ApplicationContext context, params string[] propertiesIds)
        {
            this.Context = context ?? throw new ArgumentNullException(nameof(context));

            if (propertiesIds.Length > 0 && !string.IsNullOrWhiteSpace(propertiesIds[0]))
            {
                this.PropertiesIds = propertiesIds;
            }
            else
            {
                this.PropertiesIds = new[] { "Id" };
            }

        }

        #region connection

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

        #endregion


        protected abstract TEntity MapEntity(DbDataReader reader);

        protected virtual TEntity ExecuteGetFirstOrDefault(string sql, object parameters = null, bool closeConnection = true)
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
                return default;

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
            this.AddParameterValues(command, parameters);

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

        protected virtual void ExecuteScript(string sql, object parameters = null, bool commit = true)
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

                command.ExecuteScalar();

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

        protected abstract void AddParameterValues(DbCommand command, object parameters);

        protected virtual PaginationResult<TEntity> ExecuteGetPaginated(string sql, string sqlTotalItem, object @params = null, PaginationQuery filter = default, bool closeConnection = true)
        {
            if (string.IsNullOrEmpty(sql))
            {
                throw new Exception("Sql não informado ");
            }
            if (!sql.Contains("order", StringComparison.OrdinalIgnoreCase))
            {
                sql += $" ORDER BY {this.PropertiesIds.FormatProperty(e => e)} ";
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


                this.AddParameterValues(command, @params);
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
                sql += $" ORDER BY {this.PropertiesIds.FormatProperty(e => e)} ";
            }


            this.CreateTransaction(this.Transaction);
            var command = CreateCommand();
            this.AddParameterValues(command, @params);

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

        protected virtual void ExecuteScriptInsert(string sql, object parameters = null, bool commit = true)
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

                command.ExecuteScalar();

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
