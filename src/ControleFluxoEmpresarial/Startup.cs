using Autofac;
using ControleFluxoEmpresarial.Architectures;
using ControleFluxoEmpresarial.Architectures.Middlewares;
using ControleFluxoEmpresarial.DataBase;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Text.Json.Serialization;

namespace ControleFluxoEmpresarial
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            Environment = env;
        }

        public IConfiguration Configuration { get; }
        public IWebHostEnvironment Environment { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            CultureInfo.CurrentCulture = new CultureInfo("en-US");
            CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("en-US");


            services.AddDataBase(this.Configuration, this.Environment);
            services.AddIdentityConfig();
            services.AddControllers();
            services.AddCorsConfig();

            services.AddMvcCore(opts =>
            {
                var policy = new AuthorizationPolicyBuilder()
                 .RequireAuthenticatedUser()
                 .Build();
                opts.Filters.Add(new AuthorizeFilter(policy));
                //opts.Filters.Add(typeof(ModelStateFeatureFilter));
            })
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                })
                .AddApiExplorer()
                .AddFluentValidation();

            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = (context) =>
                {
                    var errors = context.ModelState.ToDictionary(e => e.Key[0].ToString().ToLower() + e.Key.Substring(1),
                        e => e.Value.Errors.Select(ee => ee.ErrorMessage).ToList());

                    var result = new
                    {
                        Code = HttpStatusCode.UnprocessableEntity,
                        Message = "Erros ao preencher valores do formúlario",
                        Errors = errors
                    };

                    return new BadRequestObjectResult(result);
                };
            });

            services.AddSwaggerGenConfig();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app)
        {
            if (this.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }


            app.UseRouting();

            //app.UseHttpsRedirection();
            app.UseCorsConfig();
            app.UseAuthorizationConfig();
            app.UseErrorHandlingMiddleware();

            app.UseSwaggerUIConfig();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers().RequireAuthorization();
            });


            new ExecuteSeed(app).Execute();
        }


        public void ConfigureContainer(ContainerBuilder builder)
        {
            // You must have the call to AddAutofac in the Program.Main
            // method or this won't be called.
            builder.RegisterModule(new DependencyInjection());
        }
    }
}
