using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using Xunit;

namespace ControleFluxoEmpresarial.teste
{
    public class CustomWebApplicationFactory<TStartup> : WebApplicationFactory<TStartup> where TStartup : class
    {
        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureAppConfiguration((hostingContext, configurationBuilder) =>
            {
                var type = typeof(TStartup);
                var path = @"C:\workspace\Testes\ControleFluxoEmpresarial";

                configurationBuilder.AddJsonFile($"{path}\\appsettings.json", optional: true, reloadOnChange: true);
                configurationBuilder.AddEnvironmentVariables();
            });

            // if you want to override Physical database with in-memory database
            builder.ConfigureServices(services =>
            {
                var serviceProvider = new ServiceCollection()
                    .AddEntityFrameworkSqlServer()
                    .BuildServiceProvider();

                services.AddDbContext<ApplicationContext>(b => b
                    .UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=ControleFluxoEmpresarial;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False"));
            });
        }
    }
}
