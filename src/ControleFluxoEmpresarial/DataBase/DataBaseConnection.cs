using ControleFluxoEmpresarial.Models.Cidades;
using ControleFluxoEmpresarial.Models.Pessoas;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Data.Common;

namespace ControleFluxoEmpresarial.DataBase
{
    public class DataBaseConnection : IdentityDbContext<ApplicationUser, ApplicationRole, string>, IDisposable
    {
        public DataBaseConnection(DbContextOptions<DataBaseConnection> options) : base(options)
        {
            this.Transaction = this.CreateTransaction();
        }

        public DbTransaction Transaction { get; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }


        public DbTransaction CreateTransaction()
        {
            var connection = this.Database.GetDbConnection();

            if (connection.State == ConnectionState.Closed)
            {
                connection.Open();
                return  connection.BeginTransaction();
            }

            return null;
        }

        public void Dispose()
        {
            base.Dispose();
            this.Database.GetDbConnection().Close();
        }
    }
}