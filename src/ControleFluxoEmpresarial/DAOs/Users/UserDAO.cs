using ControleFluxoEmpresarial.Architectures.Exceptions;
using ControleFluxoEmpresarial.Filters.ModelView;
using ControleFluxoEmpresarial.Models.Users;
using ControleFluxoEmpresarial.ModelView.Filters.Queries;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs.Users
{
    public class UserDAO : IDAO<ApplicationUser>
    {
        public UserDAO(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            UserManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
            SignInManager = signInManager ?? throw new ArgumentNullException(nameof(signInManager));
        }

        public UserManager<ApplicationUser> UserManager { get; private set; }
        public SignInManager<ApplicationUser> SignInManager { get; private set; }

        public IdentityResult Insert(ApplicationUser user, string password, string confirmPassword)
        {
            if (confirmPassword != password)
            {
                throw new BusinessException(new { ConfirmPassword = "Senha e confirmar senha não conferem." });
            }

            var result = this.UserManager.CreateAsync(user, password).Result;

            if (!result.Succeeded)
            {
                this.FormatMessageError(result);
            }

            return result;
        }


        public virtual void Delete(ApplicationUser user, bool commit = true)
        {
            _ = this.UserManager.DeleteAsync(user).Result;
        }

        public virtual ApplicationUser GetByID(int id)
        {
            var user = this.UserManager.FindByIdAsync(id.ToString()).Result;

            return user;
        }

        public ApplicationUser GetByID(Guid id)
        {
            var user = this.UserManager.FindByIdAsync(id.ToString()).Result;

            return user;
        }
        public ApplicationUser FindByName(string userName)
        {
            return UserManager.FindByNameAsync(userName).Result;
        }

        public SignInResult PasswordSignIn(string userName, string password)
        {
            return this.SignInManager.PasswordSignInAsync(userName, password, false, true).Result;
        }



        public PaginationResult<ApplicationUser> GetPagined(PaginationQuery filter)
        {
            var listUser = this.UserManager.Users
                .Where(e => string.IsNullOrEmpty(filter.Filter) || e.UserName.Contains(filter.Filter)).ToList();

            return new PaginationResult<ApplicationUser>()
            {
                Result = listUser
            };
        }

        public int Insert(ApplicationUser entity, bool commit = true)
        {
            throw new NotImplementedException();
        }

        public void Update(ApplicationUser entity, string password, string confirmPassword)
        {
            var user = UserManager.FindByIdAsync(entity.Id).Result;

            user.UserName = entity.UserName;
            user.Email = entity.Email;
            user.PhoneNumber = entity.PhoneNumber;

            var result = UserManager.UpdateAsync(user).Result;

            if (!result.Succeeded)
            {
                this.FormatMessageError(result);
            }


            //this.UserManager.pass
        }

        public void Delete(int id, bool commit = true)
        {
            throw new NotImplementedException();
        }

        public void Update(ApplicationUser entity, bool commit = true)
        {
            throw new NotImplementedException();
        }

        private void FormatMessageError(IdentityResult result)
        {
            var lisErrors = new Dictionary<Object, Object>();
            foreach (var item in result.Errors)
            {
                if (item.Code == "PasswordTooShort")
                {
                    lisErrors.Add("Password", "Senha deve conter no minimo 6 caracteres.");
                }
                else if (item.Code == "DuplicateUserName")
                {
                    lisErrors.Add("UserName", "Nome de usuário em uso.");
                }
                else if (item.Code == "PasswordMismatch")
                {
                    lisErrors.Add("PasswordMismatch", "Senha e confirmar senha inválidos.");
                }
                else if (item.Code.Contains("Password"))
                {
                    lisErrors.Add("Password", item.Description);
                }
                else
                {
                    lisErrors.Add("UserName", item.Description);
                }
            }
            throw new BusinessException(lisErrors, result);
        }

        public void UpdatePassword(ClaimsPrincipal userClaim, string currentPassword, string newPassword, string confirmPassword)
        {
            var user = this.UserManager.GetUserAsync(userClaim).Result;
            var errors = this.UserManager.ChangePasswordAsync(user, currentPassword, newPassword).Result;

            FormatMessageError(errors);
        }
    }
}
