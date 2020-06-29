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
    public class ApplicationContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
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

    }
}