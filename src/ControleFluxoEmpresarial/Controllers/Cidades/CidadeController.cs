﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ControleFluxoEmpresarial.DAOs;
using ControleFluxoEmpresarial.DAOs.Cidades;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Cidades;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ControleFluxoEmpresarial.Controllers.Cidades
{
    [Route("api/[controller]")]
    [ApiController]
    public class CidadeController : ControllerBase<Cidade, PaginationQuery>
    {
        public CidadeController(CidadeDAO dAO) : base(dAO)
        {
        }

    }
}
