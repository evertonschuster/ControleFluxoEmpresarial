using ControleFluxoEmpresarial.Architectures.Exceptions;
using ControleFluxoEmpresarial.DAOs.Pessoas;
using ControleFluxoEmpresarial.DTO.Users;
using ControleFluxoEmpresarial.Models.Pessoas;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ControleFluxoEmpresarial.Services.Users
{
    public class UserService : IService
    {
        public UserService(UserDAO userDAO, UserRequest userRequest)
        {
            UserDAO = userDAO ?? throw new ArgumentNullException(nameof(userDAO));
            UserRequest = userRequest ?? throw new ArgumentNullException(nameof(userRequest));
        }

        public UserDAO UserDAO { get; }
        public UserRequest UserRequest { get; }



        public IdentityResult Insert(ApplicationUserModel model)
        {
            var user = new ApplicationUser()
            {
                Name = model.Name,
                UserName = model.UserName,
                Email = model.Email,
                PhoneNumber = model.PhoneNumber
            };

            return this.UserDAO.Insert(user, model.Password, model.ConfirmPassword);
        }

        public void Update(ApplicationUserModel model)
        {
            var user = new ApplicationUser()
            {
                UserName = model.UserName,
                Email = model.Email,
                PhoneNumber = model.PhoneNumber
            };

            this.UserDAO.Update(this.UserRequest.User, user);
        }

        public void ChangePassword(UserChangePasswordModel model)
        {
            this.UserDAO.UpdatePassword(this.UserRequest.User, model.CurrentPassword, model.NewPassword, model.ConfirmPassword);
        }

        public AuthenticatedUser Authenticate(AuthenticateModel model)
        {
            if (string.IsNullOrEmpty(model.Password))
            {
                throw new BusinessException(new { Password = "Campo senha não foi informado!" });
            }

            if (string.IsNullOrEmpty(model.UserName))
            {
                throw new BusinessException(new { UserName = "Campo usuário não foi informado!" });
            }

            var login = this.UserDAO.PasswordSignIn(model?.UserName, model.Password);

            if (login == null || !login.Succeeded)
            {
                throw new BusinessException(new { userName = "Usuário ou senha inválido!" }, "Usuário ou senha inválido!");
            }

            var user = this.UserDAO.FindByName(model.UserName);
            //var user = new ApplicationUser();

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("appSettings.Secret");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString("N")),
                    new Claim(JwtRegisteredClaimNames.UniqueName, user.Id.ToString()),
                    new Claim("Id", user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.UserName.ToString()),
                    new Claim(ClaimTypes.NameIdentifier, user.UserName.ToString()),
                }),
                Expires = DateTime.UtcNow.AddDays(356),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            var userToken = new AuthenticatedUser();
            userToken.Token = tokenHandler.WriteToken(token);
            userToken.UserName = user.UserName;
            userToken.Name = user.Name;

            return userToken;
        }
    }
}
