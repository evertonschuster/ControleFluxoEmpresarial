using ControleFluxoEmpresarial.DAOs.Movimentos;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Movimentos;
using Microsoft.AspNetCore.Mvc;

namespace ControleFluxoEmpresarial.Controllers.Movimentos
{
    [Route("api/unidades-medida")]
    [ApiController]
    public class UnidadeMedidaController : ControllerBase<UnidadeMedida, IPaginationQuery, string>
    {
        public UnidadeMedidaController(UnidadeMedidaDAO dAO) : base(dAO)
        {
        }
    }
}
