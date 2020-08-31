using ControleFluxoEmpresarial.DAOs.Vendas;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;

namespace ControleFluxoEmpresarial.Controllers.Vendas
{
    public class VendaController : ControllerBase
    {
        public VendaController(VendaDAO dAO)
        {
            DAO = dAO ?? throw new ArgumentNullException(nameof(dAO));
        }

        public VendaDAO DAO { get; set; }


        // GET: api/Default/5
        [AllowAnonymous]
        [HttpGet("({numero}:{serie}:{modelo})")]
        public virtual IActionResult Get(string numero, string serie, string modelo)
        {
            var entity = this.DAO.GetByID((numero, serie, modelo));

            return Ok(entity);
        }
    }
}
