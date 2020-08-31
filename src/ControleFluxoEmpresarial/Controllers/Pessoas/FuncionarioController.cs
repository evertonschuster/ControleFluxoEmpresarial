using ControleFluxoEmpresarial.DAOs.Pessoas;
using ControleFluxoEmpresarial.DTO.Filters.Queries;
using ControleFluxoEmpresarial.DTO.Users;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Pessoas;
using ControleFluxoEmpresarial.Services.Users;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Text.RegularExpressions;

namespace ControleFluxoEmpresarial.Controllers.Movimentos
{
    [Route("api/funcionarios")]
    [ApiController]
    public class FuncionarioController : ControllerBase<Funcionario, PaginationQuery>
    {
        public UserService UserService { get; set; }
        public FuncionarioController(FuncionarioDAO dAO, UserService userService) : base(dAO)
        {
            this.UserService = userService;
        }

        public override IActionResult Delete(int id)
        {
            return base.Delete(id);
        }

        public override IActionResult Desativar(int id)
        {
            return base.Desativar(id);
        }

        public override IActionResult Post([FromBody] Funcionario entity)
        {
            var id = this.DAO.Insert(entity);
            var userName = Regex.Replace(entity.Nome, @"[^A-Za-z]+", String.Empty);
            try
            {

                this.UserService.Insert(new ApplicationUserModel()
                {
                    Name = entity.Nome,
                    UserName = userName,
                    Email = entity.Email,
                    PhoneNumber = entity.Telefone,
                    Password = "123456",
                    ConfirmPassword = "123456"
                });

            }
            catch
            {
                return Ok(new CreateResult(id));
            }

            return Ok(new { Id = id, Message = $"Criado Login {userName} com senha 123456" });
        }

        public override IActionResult Put([FromBody] Funcionario entity, int id)
        {
            return base.Put(entity, id);
        }
    }
}
