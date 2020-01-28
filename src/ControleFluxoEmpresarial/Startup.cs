using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ControleFluxoEmpresarial.Architectures;
using ControleFluxoEmpresarial.Models.Users;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
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
                var policy = new AuthorizationPolicyBuilder()
                 .RequireAuthenticatedUser()
                 .Build();
                opts.Filters.Add(new AuthorizeFilter(policy));
                //opts.Filters.Add(typeof(ModelStateFeatureFilter));
            }).AddApiExplorer()
            .AddFluentValidation();

            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = (context) =>
                {
                    var errors = context.ModelState.ToDictionary(e => e.Key[0].ToString().ToLower() + e.Key.Substring(1),
                        e => e.Value.Errors.Select(ee => ee.ErrorMessage).ToList() );

                    var result = new
                    {
                        Code = "00009",
                        Message = "Validation Errors",
                        Errors = errors
                    };

                    return new BadRequestObjectResult(result);
                };
            });

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
            app.UseAuthorizationConfig();
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
