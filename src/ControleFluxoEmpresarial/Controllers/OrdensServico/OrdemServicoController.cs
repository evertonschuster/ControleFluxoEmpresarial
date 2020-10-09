using ControleFluxoEmpresarial.DTO.Filters;
using ControleFluxoEmpresarial.DTO.Filters.Queries;
using ControleFluxoEmpresarial.DTO.OrdensServico;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.OrdensServico;
using ControleFluxoEmpresarial.Services.OrdensServico;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace ControleFluxoEmpresarial.Controllers.OrdensServico
{
    [Route("api/ordem-servico")]
    [ApiController]
    public class OrdemServicoController : ControllerBase
    {
        public OrdemServicoController(OrdemServicoService service)
        {
            Service = service ?? throw new ArgumentNullException(nameof(service));
        }

        public OrdemServicoService Service { get; set; }

        // GET: api/Default/5
        [HttpGet("{id}")]
        public virtual IActionResult Get(int id)
        {
            var entity = this.Service.GetByID(id);
            if (entity == null)
            {
                return Ok();
            }

            return Ok(entity);
        }

        // POST: api/Default
        [HttpPost("new")]
        public virtual IActionResult Post([FromBody] AbrirOrdemServico entity)
        {
            var id = this.Service.Insert(entity);
            return Ok(new CreateResult(id));
        }

        //// PUT: api/Default/5
        [HttpPut("iniciar/{id}")]
        public virtual IActionResult Iniciar([FromRoute] int id)
        {
            var data = this.Service.Iniciar(id);
            return Ok(data);
        }

        [HttpPut("salvar-andamento/{id}")]
        public virtual IActionResult SalvarAndamento([FromRoute] int id, [FromBody] AndamentoOrdemServico ordem)
        {
            ordem.Id = id;
            this.Service.SalvarAndamento(ordem);
            return Ok();
        }

        [HttpPut("finalizar/{id}")]
        public virtual IActionResult Finalizar([FromRoute] int id, [FromBody] OrdemServico ordem)
        {
            ordem.Id = id;
            this.Service.Finalizar(ordem);
            return Ok();
        }


        /// <summary>
        /// So pode cancelar se n tiver venda
        /// </summary>
        /// <param name="id"></param>
        /// <param name="ordem"></param>
        /// <returns></returns>
        [HttpPut("cancelar/{id}")]
        public virtual IActionResult Cancelar([FromRoute] int id, [FromBody] CancelarOrdemServico os)
        {
            os.Id = id;
            this.Service.Cancelar(os);
            return Ok();
        }

        [HttpPost("list")]
        public IActionResult GetListPagined(PaginationQuery<List<SituacaoOrdemServicoType>> filter)
        {
            return Ok(this.Service.GetPagined(filter));
        }
    }
}
