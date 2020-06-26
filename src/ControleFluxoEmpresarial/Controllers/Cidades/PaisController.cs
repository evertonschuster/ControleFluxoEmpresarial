using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ControleFluxoEmpresarial.DAOs;
using ControleFluxoEmpresarial.DAOs.Cidades;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Cidades;
using ControleFluxoEmpresarial.DTO.Filters.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ControleFluxoEmpresarial.Controllers.Cidades
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaisController : ControllerBase<Pais, PaginationQuery>
    {

        public PaisController(PaisDAO dAO) : base(dAO)
        {
        }
    }
}
