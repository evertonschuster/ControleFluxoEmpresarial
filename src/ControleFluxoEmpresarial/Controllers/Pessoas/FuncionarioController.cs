using ControleFluxoEmpresarial.DAOs;
using ControleFluxoEmpresarial.DAOs.Pessoas;
using ControleFluxoEmpresarial.Filters.ModelView;
using ControleFluxoEmpresarial.Models.Pessoas;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Controllers.Movimentos
{
    [Route("api/funcionarios")]
    [ApiController]
    public class FuncionarioController : ControllerBase<Funcionario, PaginationQuery>
    {
        public FuncionarioController(FuncionarioDAO dAO) : base(dAO)
        {
        }
    }
}
