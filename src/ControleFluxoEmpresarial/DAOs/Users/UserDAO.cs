using ControleFluxoEmpresarial.Filters.ModelView;
using ControleFluxoEmpresarial.Models.Users;
using ControleFluxoEmpresarial.ModelView.Filters.Queries;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs.Users
{
    public class UserDAO : DAO<ApplicationUser>
    {
        public UserDAO(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            UserManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
            SignInManager = signInManager ?? throw new ArgumentNullException(nameof(signInManager));
        }

        public UserManager<ApplicationUser> UserManager { get; private set; }
        public SignInManager<ApplicationUser> SignInManager { get; private set; }

        public IdentityResult Insert(ApplicationUser user, string password)
        {
            return this.UserManager.CreateAsync(user, password).Result;
        }


        public virtual void Delete(ApplicationUser user)
        {
            _ = this.UserManager.DeleteAsync(user).Result;
        }

        public virtual ApplicationUser GetByID(int id)
        {
            var user = this.UserManager.FindByIdAsync(id.ToString()).Result;

            return user;
        }

        public ApplicationUser FindByName(string userName )
        {
            return UserManager.FindByNameAsync(userName).Result;
        }

        public SignInResult PasswordSignIn(string userName, string password)
        {
            return this.SignInManager.PasswordSignInAsync(userName, password, false, true).Result;
        }

        public PaginationResult<ApplicationUser> PaginationUser(SearchUser search)
        {
            var users = this.UserManager.Users.ToList();

            return new PaginationResult<ApplicationUser>()
            {
                Result = users
            };
        }
    }
}
