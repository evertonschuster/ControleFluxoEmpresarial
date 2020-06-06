using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ControleFluxoEmpresarial.DAOs.Pessoas;
using ControleFluxoEmpresarial.Filters.ModelView;
using ControleFluxoEmpresarial.Models.Pessoas;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ControleFluxoEmpresarial.Controllers.Associados
{
    [Route("api/associados")]
    [ApiController]
    public class AssociadoController : ControllerBase
    {
        public AssociadoController(TitularDAO dAO)
        {
            DAO = dAO ?? throw new ArgumentNullException(nameof(dAO));
        }

        public TitularDAO DAO { get; set; }

        [HttpGet("{id}")]
        public virtual IActionResult GetTitular(int id)
        {
            return Ok(this.DAO.GetByID(id));
        }

        // POST: api/Default
        [HttpPost]
        public IActionResult PostTitular([FromBody] Titular entity)
        {
            return Ok(this.DAO.Insert(entity));
        }

        // PUT: api/Default/5
        [HttpPut]
        public IActionResult PutTitular([FromBody] Titular entity)
        {
            this.DAO.Update(entity);
            return Ok();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult DeleteTitular(int id)
        {
            this.DAO.Delete(id);
            return Ok();
        }

        [HttpPost("list")]
        [AllowAnonymous]
        public new IActionResult GetListPagined(PaginationQuery filter)
        {
            return Ok(this.DAO.GetPagined(filter));
        }
    }
}