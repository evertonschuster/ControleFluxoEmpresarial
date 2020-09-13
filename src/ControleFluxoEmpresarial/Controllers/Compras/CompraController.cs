using ControleFluxoEmpresarial.DTO.Compras;
using ControleFluxoEmpresarial.Services.Compras;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;

namespace ControleFluxoEmpresarial.Controllers.Compras
{
    [AllowAnonymous]
    [Route("api/compras")]
    [ApiController]
    public class CompraController : ControllerBase
    {
        public CompraController(CompraService compraService)
        {
            CompraService = compraService ?? throw new ArgumentNullException(nameof(compraService));
        }

        public CompraService CompraService { get; set; }

        [HttpPost("calcular-valor-ratiado")]
        public IActionResult CalcularValorRatiado([FromBody] CalcularValorRatiadoDTO dto)
        {
            var result = this.CompraService.CalcularValorRatiado(dto.Produtos, dto.Frete, dto.Seguro, dto.OutrasDespesas);
            return Ok(result);
        }
    }
}
