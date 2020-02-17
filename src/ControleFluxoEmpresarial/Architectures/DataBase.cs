using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Architectures
{
    public static class DataBaseConfig
    {
        public static void AddDataBase(this IServiceCollection services, IConfiguration configuration, IWebHostEnvironment env)
        {

            var conectionString = "";
            if (env.IsDevelopment())
            {
                conectionString = configuration.GetConnectionString("DefaultConnectionPg");
            }
            else
            {
                conectionString = configuration.GetConnectionString("DefaultConnectionProd");
            }

            services.AddDbContext<ApplicationContext>(b => b
              .UseNpgsql(conectionString));
            //.AddInterceptors(new HintCommandInterceptor()));

        }
    }
}
