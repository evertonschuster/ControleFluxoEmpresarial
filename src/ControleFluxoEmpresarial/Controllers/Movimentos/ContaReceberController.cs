using ControleFluxoEmpresarial.DAOs.Movimentos;
using ControleFluxoEmpresarial.DTO.Filters.Queries;
using ControleFluxoEmpresarial.DTO.Movimentos;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Movimentos;
using ControleFluxoEmpresarial.Services.Movimentos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace ControleFluxoEmpresarial.Controllers.Movimentos
{
    [Route("api/contas-receber")]
    [ApiController]
    public class ContaReceberController : ControllerBase
    {
        public ContaReceberController(ContaReceberDAO dao, ContaReceberService contaReceberService)
        {
            this.DAO = dao;
            this.ContaReceberService = contaReceberService;
        }

        public ContaReceberDAO DAO { get; set; }
        public ContaReceberService ContaReceberService { get; set; }

        // GET: api/Default/5
        [HttpGet("({modelo}:{serie}:{numero}:{parcela})")]
        public virtual IActionResult Get([FromRoute] ContaReceberId id)
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
        public virtual IActionResult Post([FromBody] ContaReceber entity)
        {
            var id = this.ContaReceberService.Insert(entity);
            return Ok(new CreateResult(id));
        }

        // PUT: api/Default/5
        [HttpPut("({modelo}:{serie}:{numero}:{parcela})")]
        public IActionResult Put([FromRoute] ContaReceberId id, ContaReceber entity)
        {
            entity.Modelo = id.Modelo;
            entity.Serie = id.Serie;
            entity.Numero = id.Numero;
            entity.Parcela = id.Parcela;

            this.ContaReceberService.Update(entity);
            return Ok();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("({modelo}:{serie}:{numero}:{parcela})")]
        public virtual IActionResult Delete([FromRoute] ContaReceberId id)
        {
            this.DAO.VerifyRelationshipDependence(id);
            this.DAO.Delete(id);
            return Ok();
        }

        [HttpPut("ativar/({modelo}:{serie}:{numero}:{parcela})")]
        public virtual IActionResult Ativar([FromRoute] ContaReceberId id)
        {
            this.ContaReceberService.Ativar(id);

            return Ok();
        }

        [HttpPut("cancelar/({modelo}:{serie}:{numero}:{parcela})")]
        public virtual IActionResult Cancelar([FromRoute] ContaReceberId id, CancelarContaReceber cancelarContaReceber)
        {
            cancelarContaReceber.Modelo = id.Modelo;
            cancelarContaReceber.Serie = id.Serie;
            cancelarContaReceber.Numero = id.Numero;
            cancelarContaReceber.Parcela = id.Parcela;

            this.ContaReceberService.Cancelar(cancelarContaReceber);

            return Ok();
        }

        [HttpPut("cancelar-baixa/({modelo}:{serie}:{numero}:{parcela})")]
        public virtual IActionResult CancelarBaixa([FromRoute] ContaReceberId id, CancelarContaReceber cancelarContaReceber)
        {
            cancelarContaReceber.Modelo = id.Modelo;
            cancelarContaReceber.Serie = id.Serie;
            cancelarContaReceber.Numero = id.Numero;
            cancelarContaReceber.Parcela = id.Parcela;

            this.ContaReceberService.CancelarBaixa(cancelarContaReceber);

            return Ok();
        }

        [HttpPut("receber/({modelo}:{serie}:{numero}:{parcela})")]
        public virtual IActionResult Receber([FromRoute] ContaReceberId id, ReceberContaReceber contaReceber)
        {
            contaReceber.Modelo = id.Modelo;
            contaReceber.Serie = id.Serie;
            contaReceber.Numero = id.Numero;
            contaReceber.Parcela = id.Parcela;

            this.ContaReceberService.Receber(contaReceber);

            return Ok();
        }

        [HttpGet("calcular-valor-baixa/({modelo}:{serie}:{numero}:{parcela})")]
        public virtual IActionResult CalcularValorBaixa([FromRoute] ContaReceberId id, DateTime? dataBase = null, decimal? desconto = null, decimal? multa = null, decimal? juro = null)
        {
            var valor = this.ContaReceberService.CalcularValor(id);
            return Ok(valor);
        }

        [HttpPost("list")]
        public IActionResult GetListPagined(PaginationQuery<List<SituacaoContaReceberType>> filter)
       {
            return Ok(this.DAO.GetPagined(filter));
        }
    }
}
