using Autofac;
using ControleFluxoEmpresarial.DAOs;
using ControleFluxoEmpresarial.Models;
using ControleFluxoEmpresarial.Models.Cidades;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Architectures
{
    public class DependencyInjection : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterAssemblyTypes(AppDomain.CurrentDomain.Load("ControleFluxoEmpresarial"))
                .Where(x => x.GetInterfaces().Any(i => i.IsAssignableFrom(typeof(IDAO))))
                .InstancePerLifetimeScope();

            builder.RegisterAssemblyTypes(AppDomain.CurrentDomain.Load("ControleFluxoEmpresarial"))
                 .Where(x => x.IsAssignableTo<IValidator>())
                 .AsImplementedInterfaces()
                 .InstancePerLifetimeScope();
        }
    }
}
