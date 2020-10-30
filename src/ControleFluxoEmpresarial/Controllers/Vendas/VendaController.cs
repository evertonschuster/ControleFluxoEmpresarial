using ControleFluxoEmpresarial.DAOs.Vendas;
using ControleFluxoEmpresarial.DTO.Filters;
using ControleFluxoEmpresarial.DTO.Vendas;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Vendas;
using ControleFluxoEmpresarial.Services.Vendas;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Razor.TagHelpers;
using System;

namespace ControleFluxoEmpresarial.Controllers.Vendas
{
    [Route("api/vendas")]
    [ApiController]
    public class VendaController : ControllerBase
    {
        public VendaController(VendaDAO dAO, VendaService vendaService)
        {
            VendaService = vendaService ?? throw new ArgumentNullException(nameof(vendaService));
        }


        public VendaService VendaService { get; set; }


        [HttpPost]
        public IActionResult Post(Venda venda)
        {
            this.VendaService.VendaProduto(venda);
            return Ok();
        }


        [HttpPost("list")]
        public IActionResult List(PaginationQuery<SituacaoType?> filter)
        {
            var result = this.VendaService.GetPagined(filter);
            return Ok(result);
        }

        // GET: api/Default/5
        [HttpGet("({modelo}:{serie}:{numero})")]
        public virtual IActionResult Get(string numero, string serie, string modelo)
        {
            var entity = this.VendaService.GetByID(new VendaId() { Numero = numero, Serie = serie, Modelo = modelo });
            return Ok(entity);
        }

        // GET: api/Default/5
        [HttpPost("cancelar/({modelo}:{serie}:{numero})")]
        public virtual IActionResult Cancelar([FromRoute] VendaId id, [FromBody] CancelarVenda cancelarVenda)
        {
            cancelarVenda.Numero = id.Numero;
            cancelarVenda.Modelo = id.Modelo;
            cancelarVenda.Serie = id.Serie;

            this.VendaService.Cancelar(cancelarVenda);
            return Ok();
        }
    }
}
