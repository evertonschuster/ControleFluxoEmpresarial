using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ControleFluxoEmpresarial.DAOs;
using ControleFluxoEmpresarial.DAOs.Cidades;
using ControleFluxoEmpresarial.Filters.ModelView;
using ControleFluxoEmpresarial.Models.Cidades;
using ControleFluxoEmpresarial.ModelView.Filters.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ControleFluxoEmpresarial.Controllers.Cidades
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class PaisController : ControllerBase<Pais>
    {

        public PaisController(PaisDAOReflection dAO) : base(dAO)
        {
        }

        [HttpPost("list")]
        public new IActionResult GetListPagined(PaginationQuery filter)
        {
            return Ok(this.DAO.GetPagined(filter));
        }
    }
}
