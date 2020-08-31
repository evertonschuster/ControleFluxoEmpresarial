using ControleFluxoEmpresarial.DAOs.Movimentos;
using ControleFluxoEmpresarial.DTO.Filters.Queries;
using ControleFluxoEmpresarial.DTO.Movimentos;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Movimentos;
using ControleFluxoEmpresarial.Services.Movimentos;
using Microsoft.AspNetCore.Mvc;

namespace ControleFluxoEmpresarial.Controllers.Movimentos
{
    [Route("api/contas-pagar")]
    [ApiController]
    public class ContaPagarController : ControllerBase
    {
        public ContaPagarController(ContaPagarDAO dao, ContaPagarService contaPagarService)
        {
            this.DAO = dao;
            this.ContaPagarService = contaPagarService;
        }

        public ContaPagarDAO DAO { get; set; }
        public ContaPagarService ContaPagarService { get; set; }

        // GET: api/Default/5
        [HttpGet("({modelo}:{serie}:{numero}:{fornecedorId}:{parcela})")]
        public virtual IActionResult Get([FromRoute] ContaPagarId id)
        {
            var entity = this.DAO.GetByID(id);
            if (entity == null)
            {
                return Ok();
            }

            return Ok(entity);
        }

        // POST: api/Default
        [HttpPost]
        public virtual IActionResult Post([FromBody] ContaPagar entity)
        {
            var id = this.ContaPagarService.Insert(entity);
            return Ok(new CreateResult(id));
        }

        // PUT: api/Default/5
        [HttpPut("({modelo}:{serie}:{numero}:{fornecedorId}:{parcela})")]
        public IActionResult Put([FromRoute] ContaPagarId id, ContaPagar entity)
        {
            entity.Modelo = id.Modelo;
            entity.Serie = id.Serie;
            entity.Numero = id.Numero;
            entity.FornecedorId = id.FornecedorId;
            entity.Parcela = id.Parcela;

            this.ContaPagarService.Update(entity);
            return Ok();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("({modelo}:{serie}:{numero}:{fornecedorId}:{parcela})")]
        public virtual IActionResult Delete([FromRoute] ContaPagarId id)
        {
            this.DAO.VerifyRelationshipDependence(id);
            this.DAO.Delete(id);
            return Ok();
        }

        //DELETE: api/ApiWithActions/5
        [HttpPut("cancelar/({modelo}:{serie}:{numero}:{fornecedorId}:{parcela})")]
        public virtual IActionResult Cancelar([FromRoute] ContaPagarId id, CancelarContaPagar cancelarContaPagar)
        {
            cancelarContaPagar.Modelo = id.Modelo;
            cancelarContaPagar.Serie = id.Serie;
            cancelarContaPagar.Numero = id.Numero;
            cancelarContaPagar.FornecedorId = id.FornecedorId;
            cancelarContaPagar.Parcela = id.Parcela;

            this.ContaPagarService.Cancelar(cancelarContaPagar);

            return Ok();
        }

        [HttpPost("list")]
        public new IActionResult GetListPagined(PaginationQuery filter)
        {
            return Ok(this.DAO.GetPagined(filter));
        }
    }
}
