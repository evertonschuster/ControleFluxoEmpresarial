using ControleFluxoEmpresarial.DAOs.Movimentos;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Movimentos;
using Microsoft.AspNetCore.Mvc;

namespace ControleFluxoEmpresarial.Controllers.Movimentos
{
    [Route("api/produtos")]
    [ApiController]
    public class ProdutoController : ControllerBase<Produto, PaginationQuery>
    {
        public ProdutoController(ProdutoDAO dao) : base(dao)
        {
        }
    }
}
