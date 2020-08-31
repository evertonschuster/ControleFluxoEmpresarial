using ControleFluxoEmpresarial.DAOs.Pessoas;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Pessoas;
using Microsoft.AspNetCore.Mvc;

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
