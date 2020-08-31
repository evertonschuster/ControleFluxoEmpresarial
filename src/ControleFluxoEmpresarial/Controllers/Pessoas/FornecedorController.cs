using ControleFluxoEmpresarial.DAOs.Pessoas;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Pessoas;
using Microsoft.AspNetCore.Mvc;

namespace ControleFluxoEmpresarial.Controllers.Pessoas
{
    [Route("api/fornecedores")]
    [ApiController]
    public class FornecedorController : ControllerBase<Fornecedor, PaginationQuery>
    {
        public FornecedorController(FornecedorDAO dAO) : base(dAO)
        {
        }
    }
}
