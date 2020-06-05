﻿using ControleFluxoEmpresarial.DAOs.Associados;
using ControleFluxoEmpresarial.DAOs.Cidades;
using ControleFluxoEmpresarial.DAOs.Clients;
using ControleFluxoEmpresarial.DAOs.CondicaoPagamentoParcelas;
using ControleFluxoEmpresarial.DAOs.CondicaoPagamentos;
using ControleFluxoEmpresarial.DAOs.Users;
using ControleFluxoEmpresarial.Models.Cidades;
using ControleFluxoEmpresarial.Models.Clients;
using ControleFluxoEmpresarial.Models.CondicaoPagamentos;
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
            services.AddScoped<PaisDAOReflection>();
            services.AddScoped<EstadoDAOReflection>();
            services.AddScoped<CidadeDAOReflection>();

            //services.AddScoped<FormaPagamentoDAO>();
            services.AddScoped<FormaPagamentoDAOReflection>();
            services.AddScoped<CondicaoPagamentoDAO>();
            services.AddScoped<CondicaoPagamentoParcelaDAO>();

            services.AddScoped<UserDAO>();
            services.AddScoped<ClientDAO>();
            services.AddScoped<TitularDAO>();
            services.AddScoped<AssociadoDAO>();


            services.AddTransient<IValidator<Pais>, PaisValidator>();
            services.AddTransient<IValidator<Estado>, EstadoValidator>();
            services.AddTransient<IValidator<Cidade>, CidadeValidator>();
            services.AddTransient<IValidator<Client>, ClientValidator>();
            services.AddTransient<IValidator<FormaPagamento>, FormaPagamentoValidator>();
            services.AddTransient<IValidator<CondicaoPagamento>, CondicaoPagamentoValidator>();

        }
    }
}
