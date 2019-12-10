using ControleFluxoEmpresarial.DAOs.Cidades;
using ControleFluxoEmpresarial.DAOs.Users;
using ControleFluxoEmpresarial.Models.Cidades;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Architectures
{
    public static class DependencyInjection
    {
        public static void ResolveInjection(this IServiceCollection services)
        {
            services.AddScoped<UserDAO>();
            services.AddScoped<PaisDAO>();
            services.AddScoped<EstadoDAO>();
            services.AddScoped<CidadeDAO>();


            services.AddTransient<IValidator<Pais>, PaisValidator>();


        }
    }
}
