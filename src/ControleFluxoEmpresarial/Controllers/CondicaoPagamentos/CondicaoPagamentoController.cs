using ControleFluxoEmpresarial.DAOs.CondicaoPagamentos;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.CondicaoPagamentos;
using ControleFluxoEmpresarial.Services.CondicoesPagamento;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Controllers.CondicaoPagamentos
{
    [Route("api/condicao-pagamento")]
    [ApiController]
    public class CondicaoPagamentoController : ControllerBase<CondicaoPagamento, PaginationQuery>
    {
        public CondicaoPagamentoController(CondicaoPagamentoDAO dAO, CondicaoPagamentoService condicaoPagamentoService) : base(dAO)
        {
            this.CondicaoPagamentoService = condicaoPagamentoService;
        }

        public CondicaoPagamentoService CondicaoPagamentoService { get; set; }

        [AllowAnonymous]
        [HttpGet("calcula-parcela/{condicaoPagamentoId}/{dataBase}/{valor}")]
        public IActionResult CalculaParcela([FromRoute]int condicaoPagamentoId, [FromRoute] DateTime dataBase, [FromRoute] decimal valor)
        {
            var parcelas = this.CondicaoPagamentoService.CalculaParcela(condicaoPagamentoId, dataBase, valor);
            return Ok(parcelas);
        }

    }
}
