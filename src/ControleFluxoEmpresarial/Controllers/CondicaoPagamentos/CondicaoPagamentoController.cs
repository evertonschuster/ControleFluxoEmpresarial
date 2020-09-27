using ControleFluxoEmpresarial.DAOs.CondicaoPagamentos;
using ControleFluxoEmpresarial.DTO.Filters;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.CondicaoPagamentos;
using ControleFluxoEmpresarial.Services.CondicoesPagamento;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;

namespace ControleFluxoEmpresarial.Controllers.CondicaoPagamentos
{
    [Route("api/condicao-pagamento")]
    [ApiController]
    public class CondicaoPagamentoController : ControllerBase<CondicaoPagamento, PaginationQuery<SituacaoType?>>
    {
        public CondicaoPagamentoController(CondicaoPagamentoDAO dAO, CondicaoPagamentoService condicaoPagamentoService) : base(dAO)
        {
            this.CondicaoPagamentoService = condicaoPagamentoService;
        }

        public CondicaoPagamentoService CondicaoPagamentoService { get; set; }

        [AllowAnonymous]
        [HttpGet("calcula-parcela/{condicaoPagamentoId}/{dataBase}/{valor}")]
        public IActionResult CalculaParcela([FromRoute] int condicaoPagamentoId, [FromRoute] DateTime dataBase, [FromRoute] decimal valor)
        {
            var parcelas = this.CondicaoPagamentoService.CalculaParcela(condicaoPagamentoId, dataBase, valor);
            return Ok(parcelas);
        }

    }
}
