using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
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
    public class UserController : Microsoft.AspNetCore.Mvc.ControllerBase
    {
        public UserController(UserDAO userDAO)
        {
            UserDAO = userDAO ?? throw new ArgumentNullException(nameof(userDAO));
        }

        public UserDAO UserDAO { get; }


        [AllowAnonymous]
        [HttpPost("authorize")]
        public IActionResult Authenticate([FromBody] AuthenticateModel model)
        {
            var login = this.UserDAO.PasswordSignIn(model?.UserName, model.Password);

            if (login == null || !login.Succeeded)
            {
                return BadRequest(new { message = "Username or password is incorrect" });
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
                Email = model.Email
            };

            var response = this.UserDAO.Insert(user, model.Password, model.ConfirmPassword);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public virtual IActionResult Get(Guid id)
        {
            var entity = this.UserDAO.GetByID(id);
            if (entity == null)
            {
                return Ok();
            }

            return Ok(entity);
        }

        [HttpPost("list")]
        [AllowAnonymous]
        public new IActionResult GetListPagined(PaginationQuery filter)
        {
            return Ok(this.UserDAO.GetPagined(filter));
        }

    }
}