﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ControleFluxoEmpresarial.DAOs;
using ControleFluxoEmpresarial.DAOs.Cidades;
using ControleFluxoEmpresarial.Filters.ModelView;
using ControleFluxoEmpresarial.Models.Cidades;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ControleFluxoEmpresarial.Controllers.Cidades
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstadoController : ControllerBase<Estado>
    {
        public EstadoController(EstadoDAO dAO) : base(dAO)
        {
        }

        [HttpGet("list")]
        public new IActionResult GetListPagined([FromQuery] PaginationQuery filter)
        {
            return Ok(this.DAO.GetPagined(filter));
        }
    }
}
