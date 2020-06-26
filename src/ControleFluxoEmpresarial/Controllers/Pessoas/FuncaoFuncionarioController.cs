using ControleFluxoEmpresarial.DAOs;
using ControleFluxoEmpresarial.DAOs.Pessoas;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Pessoas;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Controllers.Pessoas
{
    [Route("api/funcao-funcionarios")]
    [ApiController]
    public class FuncaoFuncionarioController : ControllerBase<FuncaoFuncionario, PaginationQuery>
    {
        public FuncaoFuncionarioController(FuncaoFuncionarioDAO dAO) : base(dAO)
        {
        }
    }
}
