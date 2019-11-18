using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Architectures
{
    public static class Swagger
    {
        public static void AddSwaggerGenConfig(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });

                //c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                //{
                //    In = ParameterLocation.Header,
                //    Description = "Porfavor, insira o token de autenticação!",
                //    Name = "Authorization",
                //    Type = SecuritySchemeType.ApiKey
                //});

                c.AddSecurityRequirement(new OpenApiSecurityRequirement {
                   {
                     new OpenApiSecurityScheme
                     {
                       Reference = new OpenApiReference
                       {
                         Type = ReferenceType.SecurityScheme,
                         Id = "Bearer"
                       }
                      },
                      new string[] { }
                    }
                  });

                // Define the OAuth2.0 scheme that's in use (i.e. Implicit Flow)
                var oauth = new OpenApiSecurityScheme
                {
                    Type = SecuritySchemeType.OAuth2,
                    In = ParameterLocation.Header,
                    Flows = new OpenApiOAuthFlows
                    {
                        Password = new OpenApiOAuthFlow()
                        {
                            TokenUrl = new Uri("/api/user/authorize", UriKind.Relative),
                            Scopes = new Dictionary<string, string>
                                {
                                    { "readAccess", "Access read operations" },
                                    { "writeAccess", "Access write operations" }
                                }
                        },

                    }
                };

                c.AddSecurityDefinition("oauth2", oauth);
            });
        }


        public static void UseSwaggerUIConfig(this IApplicationBuilder app)
        {
            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Gestão de fluxo empresarial");

                c.DocumentTitle = "Documentação da API";
            });
        }
    }
}
