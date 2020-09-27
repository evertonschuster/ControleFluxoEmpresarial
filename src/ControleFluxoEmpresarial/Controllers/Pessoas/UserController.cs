using ControleFluxoEmpresarial.DAOs.Pessoas;
using ControleFluxoEmpresarial.DTO.Users;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Services.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;

namespace ControleFluxoEmpresarial.Controllers.Users
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Microsoft.AspNetCore.Mvc.ControllerBase
    {
        public UserController(UserDAO userDAO, UserService userService)
        {
            UserDAO = userDAO ?? throw new ArgumentNullException(nameof(userDAO));
            UserService = userService ?? throw new ArgumentNullException(nameof(userService));
        }

        public UserDAO UserDAO { get; }
        public UserService UserService { get; }


        [HttpPost("authorize")]
        [AllowAnonymous]
        public IActionResult Authenticate([FromBody] AuthenticateModel model)
        {
            var userToken = this.UserService.Authenticate(model);
            return Ok(userToken);
        }

        [HttpPost]
        public IActionResult Insert([FromBody] ApplicationUserModel model)
        {
            var response = this.UserService.Insert(model);
            return Ok(response);
        }

        [HttpPut]
        public IActionResult Update([FromBody] ApplicationUserModel model)
        {
            this.UserService.Update(model);
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
        public new IActionResult GetListPagined(IPaginationQuery filter)
        {
            return Ok(this.UserDAO.GetPagined(filter));
        }

        [HttpPut("Change-Password")]
        public IActionResult ChangePassword(UserChangePasswordModel model)
        {
            this.UserService.ChangePassword(model);
            return Ok();
        }

    }
}