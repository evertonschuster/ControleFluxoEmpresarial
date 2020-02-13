using ControleFluxoEmpresarial.Models.Users;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DataBase
{
    public class ExecuteSeed : ISeedDataBase
    {
        public IApplicationBuilder serviceProvider { get; set; }
        public ApplicationContext Context { get; set; }
        public UserManager<ApplicationUser> UserManager { get; set; }

        public ExecuteSeed(IApplicationBuilder serviceProvider)
        {
            this.serviceProvider = serviceProvider ?? throw new ArgumentNullException(nameof(serviceProvider));

            IServiceScopeFactory serviceScopeFactory = serviceProvider.ApplicationServices.GetService(typeof(IServiceScopeFactory)) as IServiceScopeFactory;

            IServiceScope scope = serviceScopeFactory.CreateScope();
            var services = scope.ServiceProvider;

            this.Context = services.GetRequiredService<ApplicationContext>();
            this.UserManager = services.GetRequiredService<UserManager<ApplicationUser>>();
        }


        public void Execute()
        {
            SeedUsuario();
            SeedPais();
        }

        public void SeedUsuario()
        {
            if (!this.UserManager.Users.Any())
            {
                this.UserManager.CreateAsync(new ApplicationUser()
                {
                    UserName = "string",
                    Email = "string@string.com",
                    PhoneNumber = "45988293328"
                }, "string");
            }
        }

        public void SeedPais()
        {
            //var ass = this.Context.Paises.FirstOrDefault();

            //if (this.Context.Paises.Any())
            //{
            //    return;
            //}

        }

    }
}
