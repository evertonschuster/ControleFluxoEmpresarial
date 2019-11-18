using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Architectures
{
    public static class DataBaseConfig
    {
        public static void AddDataBase(this IServiceCollection services, IConfiguration configuration)
        {

            var conectionString = configuration.GetConnectionString("DefaultConnectionProd");

            services.AddDbContext<ApplicationContext>(b => b
              .UseSqlServer(conectionString));
            //.AddInterceptors(new HintCommandInterceptor()));

        }
    }
}
