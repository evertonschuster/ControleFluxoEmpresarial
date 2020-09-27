using ControleFluxoEmpresarial.DTO.Compras;
using ControleFluxoEmpresarial.Models.Compras;
using ControleFluxoEmpresarial.Services.Compras;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ControleFluxoEmpresarial.Controllers.Compras
{
    [AllowAnonymous]
    [Route("api/compras")]
    [ApiController]
    public class CompraController : ControllerBase
    {
        public CompraService CompraService { get; set; }

        public CompraController(CompraService compraService)
        {
            CompraService = compraService;
        }

        [HttpGet("({modelo}:{serie}:{numero}:{fornecedorId})")]
        public virtual IActionResult Get([FromRoute] CompraId id)
        {
            var entity = this.CompraService.GetByID(id);
            if (entity == null)
            {
                return Ok();
            }

            return Ok(entity);
        }

        [HttpPost]
        public IActionResult Post(Compra compra)
        {
            this.CompraService.LancarCompra(compra);
            return Ok();
        }

        [HttpPost("calcular-valor-ratiado")]
        public IActionResult CalcularValorRatiado([FromBody] CalcularValorRatiadoDTO dto)
        {
            var result = this.CompraService.CalcularValorRatiado(dto.Produtos, dto.Frete, dto.Seguro, dto.OutrasDespesas);
            return Ok(result);
        }


        [HttpPost("list")]
        public IActionResult GetListPagined(CompraPaginationQuery filter)
        {
            return Ok(this.CompraService.GetPagined(filter));
        }


        [HttpPost("cancelar/({modelo}:{serie}:{numero}:{fornecedorId})")]

        public virtual IActionResult Cancelar([FromRoute] CompraId id, [FromBody] CancelarCompra model)
        {
            this.CompraService.CancelarCompra(model);
            return Ok();
        }

    }
}
