using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ControleFluxoEmpresarial.Architectures;
using ControleFluxoEmpresarial.Models.Users;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;

namespace ControleFluxoEmpresarial
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDataBase(this.Configuration);
            services.AddIdentityConfig();
            services.ResolveInjection();
            services.AddControllers();
            services.AddCorsConfig();

            services.AddMvcCore(opts =>
            {
                //opts.Filters.Add(typeof(ModelStateFeatureFilter));
            }).AddApiExplorer()
            .AddFluentValidation();


            services.AddSwaggerGenConfig();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }



            //app.UseHttpsRedirection();
            app.UseAuthorizationConfiG();
            app.UseRouting();
            app.UseCorsConfig();

            app.UseSwaggerUIConfig();
            
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });


        }
    }
}
