using Autofac;
using ControleFluxoEmpresarial.DAOs;
using ControleFluxoEmpresarial.Services;
using FluentValidation;
using System;
using System.Linq;

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
                .Where(x => x.GetInterfaces().Any(i => i.IsAssignableFrom(typeof(IService))))
                .InstancePerLifetimeScope();

            builder.RegisterAssemblyTypes(AppDomain.CurrentDomain.Load("ControleFluxoEmpresarial"))
                 .Where(x => x.IsAssignableTo<IValidator>())
                 .AsImplementedInterfaces()
                 .InstancePerLifetimeScope();
        }
    }
}
