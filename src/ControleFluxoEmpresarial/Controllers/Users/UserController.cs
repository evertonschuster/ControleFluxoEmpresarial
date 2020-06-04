using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ControleFluxoEmpresarial.Architectures.Exceptions;
using ControleFluxoEmpresarial.DAOs.Users;
using ControleFluxoEmpresarial.Filters.ModelView;
using ControleFluxoEmpresarial.Models.Users;
using ControleFluxoEmpresarial.ModelView.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace ControleFluxoEmpresarial.Controllers.Users
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class UserController : Microsoft.AspNetCore.Mvc.ControllerBase
    {
        public UserController(UserDAO userDAO)
        {
            UserDAO = userDAO ?? throw new ArgumentNullException(nameof(userDAO));
        }

        public UserDAO UserDAO { get; }


        [HttpPost("authorize")]
        [AllowAnonymous]
        public IActionResult Authenticate([FromBody] AuthenticateModel model)
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
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                }),
                Expires = DateTime.UtcNow.AddDays(356),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            var userToken = new AuthenticatedUser();
            userToken.Token = tokenHandler.WriteToken(token);
            userToken.UserName = user.UserName;

            return Ok(userToken);
        }

        [HttpPost]
        public IActionResult Insert([FromBody] ApplicationUserModel model)
        {
            var user = new ApplicationUser()
            {
                UserName = model.UserName,
                Email = model.Email,
                PhoneNumber = model.PhoneNumber
            };

            var response = this.UserDAO.Insert(user, model.Password, model.ConfirmPassword);
            return Ok(response);
        }

        [HttpPut]
        public IActionResult Update([FromBody] ApplicationUserModel model)
        {
            var user = new ApplicationUser()
            {
                UserName = model.UserName,
                Email = model.Email,
                PhoneNumber = model.PhoneNumber
            };

            var userClaim = this.Request.HttpContext.User;

            this.UserDAO.Update(userClaim, user);
            return Ok();
        }

        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            var entity = this.UserDAO.GetByID(id);
            if (entity == null)
            {
                return Ok();
            }

            return Ok(entity);
        }

        [HttpPost("list")]
        public new IActionResult GetListPagined(PaginationQuery filter)
        {
            return Ok(this.UserDAO.GetPagined(filter));
        }

        [HttpPut("Change-Password")]
        public IActionResult ChangePassword(UserChangePasswordModel model)
        {
            var user = this.Request.HttpContext.User;

            this.UserDAO.UpdatePassword(user, model.CurrentPassword, model.NewPassword, model.ConfirmPassword);

            return Ok();
        }

    }
}