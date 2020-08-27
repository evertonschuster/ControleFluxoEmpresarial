using ControleFluxoEmpresarial.Models.Pessoas;
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
        public DataBaseConnection Context { get; set; }
        public UserManager<ApplicationUser> UserManager { get; set; }

        public ExecuteSeed(IApplicationBuilder serviceProvider)
        {
            this.serviceProvider = serviceProvider ?? throw new ArgumentNullException(nameof(serviceProvider));

            IServiceScopeFactory serviceScopeFactory = serviceProvider.ApplicationServices.GetService(typeof(IServiceScopeFactory)) as IServiceScopeFactory;

            var scope = serviceScopeFactory.CreateScope();
            var services = scope.ServiceProvider;

            this.Context = services.GetRequiredService<DataBaseConnection>();
            this.UserManager = services.GetRequiredService<UserManager<ApplicationUser>>();
        }


        public void Execute()
        {
            if (this.UserManager.Users.Any())
            {
                return;
            }

            SeedUsuario();
        }

        public void SeedUsuario()
        {
            if (!this.UserManager.Users.Any())
            {
                this.UserManager.CreateAsync(new ApplicationUser()
                {
                    UserName = "Admin",
                    Name = "Administrador do sistema",
                    Email = "string@string.com",
                    PhoneNumber = "45988293328"
                }, "123456");
            }
        }

    }
}
