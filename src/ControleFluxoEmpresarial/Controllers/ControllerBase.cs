using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ControleFluxoEmpresarial.DAOs;
using ControleFluxoEmpresarial.Filters.ModelView;
using ControleFluxoEmpresarial.Models;
using ControleFluxoEmpresarial.ModelView.Filters.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ControleFluxoEmpresarial.Controllers
{
    [AllowAnonymous]
    public abstract class ControllerBase<TEntity> : ControllerBase where TEntity : IBaseEntity
    {
        protected ControllerBase(IDAO<TEntity> dAO)
        {
            DAO = dAO ?? throw new ArgumentNullException(nameof(dAO));
        }

        public IDAO<TEntity> DAO { get; set; }

        // GET: api/Default/5
        [HttpGet("{id}")]
        public virtual IActionResult Get(int id)
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
        public virtual IActionResult Post([FromBody] TEntity entity)
        {
            var id = this.DAO.Insert(entity);
            return Ok(new CreateResult(id));
        }

        // PUT: api/Default/5
        [HttpPut]
        public virtual IActionResult Put([FromBody] TEntity entity)
        {
            this.DAO.Update(entity);
            return Ok();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public virtual IActionResult Delete(int id)
        {
            this.DAO.Delete(id);
            return Ok();
        }

    }
}
