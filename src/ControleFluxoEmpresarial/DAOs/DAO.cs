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


    public class DAO<TEntity> : IDAO<TEntity> where TEntity : BaseEntity, new()
    {
        private ApplicationContext Context { get; set; }
        public DbTransaction Transaction { get; set; }
        public DbConnection Connection { get { return this.Context.Database.GetDbConnection(); } }

        public DAO(ApplicationContext context)
        {
            this.Context = context ?? throw new ArgumentNullException(nameof(context));
        }

        #region PUBLIC CRUD

        public virtual void Delete(int id, bool commit = true)
        {
            throw new NotImplementedException();
        }

        public virtual void Delete(TEntity entity, bool commit = true)
        {
            this.Delete(entity.Id, commit);
        }

        public virtual TEntity GetByID(int id)
        {
            throw new NotImplementedException();
        }


        public virtual int Insert(TEntity entity, bool commit = true)
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
            entity.Id = reader.GetInt32("Id");

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
            command.AddParameterValues(parameters);

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
            command.AddParameterValues(parameters);

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


                return null;

            }
            finally
            {
                if (closeConnection)
                {
                    command.Connection.Close();
                }
            }
        }

        //protected virtual TEntity ExecuteGetFirstOrDefault(string sql, bool closeConnection = true)
        //{
        //    if (string.IsNullOrEmpty(sql))
        //    {
        //        throw new Exception("Sql não informado ");
        //    }

        //    this.CreateTransaction(this.Transaction);
        //    var command = CreateCommand();

        //    try
        //    {
        //        command.CommandText = sql += " limit 1";
        //        command.CommandType = CommandType.Text;

        //        Console.WriteLine("SQL => " + command.CommandText);

        //        var reader = command.ExecuteReader();

        //        if (reader.HasRows)
        //        {
        //            reader.Read();
        //            var entity = MapEntity(reader);
        //            reader.Close();
        //            return entity;
        //        }


        //        return null;

        //    }
        //    finally
        //    {
        //        if (closeConnection)
        //        {
        //            command.Connection.Close();
        //        }
        //    }
        //}

        protected virtual PaginationResult<TEntity> ExecuteGetPaginated(string sql, object @params = null, PaginationQuery filter = default, bool closeConnection = true)
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
            command.AddParameterValues(@params);

            try
            {
                command.CommandText = sql.Insert(6, "   COUNT(*) OVER() AS TotalItem,   ")
                                      + $@" OFFSET {filter.PageSize * (filter.CurrentPage - 1) }  "
                                      + $@" LIMIT {filter.PageSize}  ";

                command.CommandType = CommandType.Text;
                Console.WriteLine("SQL => " + command.CommandText);

                var reader = command.ExecuteReader();

                var list = new List<TEntity>();
                var totalItem = 0;

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        totalItem = reader.GetInt32("TotalItem");
                        list.Add(MapEntity(reader));
                    }
                }

                return new PaginationResult<TEntity>()
                {
                    CurrentPage = filter.CurrentPage,
                    PageSize = filter.PageSize,
                    Result = list,
                    TotalItem = totalItem
                };
            }
            finally
            {
                if (closeConnection)
                {
                    command.Connection.Close();
                }
            }
        }


        protected virtual PaginationResult<TEntity> ExecuteGetPaginated(string sql, PaginationQuery filter, bool closeConnection = true)
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

            try
            {
                command.CommandText = sql.Insert(6, "   COUNT(*) OVER() AS TotalItem,   ")
                                      + $@" OFFSET {filter.PageSize * (filter.CurrentPage - 1) }  "
                                      + $@" LIMIT {filter.PageSize}  ";

                command.CommandType = CommandType.Text;
                Console.WriteLine("SQL => " + command.CommandText);

                var reader = command.ExecuteReader();

                var list = new List<TEntity>();
                var totalItem = 0;

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        totalItem = reader.GetInt32("TotalItem");
                        list.Add(MapEntity(reader));
                    }
                }

                return new PaginationResult<TEntity>()
                {
                    CurrentPage = filter.CurrentPage,
                    PageSize = filter.PageSize,
                    Result = list,
                    TotalItem = totalItem
                };
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
            command.AddParameterValues(@params);

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

        protected virtual int ExecuteScriptInsert(string sql, object parameters = null, bool commit = true)
        {
            if (string.IsNullOrEmpty(sql))
            {
                throw new Exception("Sql não informado ");
            }

            this.CreateTransaction(this.Transaction);
            var command = CreateCommand();
            command.AddParameterValues(parameters);

            try
            {
                command.CommandText = sql += "RETURNING id;";
                command.CommandType = CommandType.Text;

                Console.WriteLine("SQL => " + command.CommandText);

                int id = Convert.ToInt32(command.ExecuteScalar());

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

            return -1;
        }
        #endregion
    }
}
