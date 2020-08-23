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
using ControleFluxoEmpresarial.DTO.Users;

namespace ControleFluxoEmpresarial.DataBase
{
    public class DataBaseConnectionApplication : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        public DataBaseConnectionApplication(DbContextOptions<DataBaseConnectionApplication> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }

    public class DataBaseConnection : DataBaseConnectionApplication, IDisposable
    {
        public DataBaseConnection(DbContextOptions<DataBaseConnectionApplication> options, UserRequest userRequest) : base(options)
        {
            this.UserRequest = userRequest;
            this.Transaction = this.CreateTransaction();
        }

        public DbTransaction Transaction { get; }
        public UserRequest UserRequest { get; set; }


        public DbTransaction CreateTransaction()
        {
            var connection = this.Database.GetDbConnection();

            if (connection.State == ConnectionState.Closed)
            {
                connection.Open();
                return connection.BeginTransaction();
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