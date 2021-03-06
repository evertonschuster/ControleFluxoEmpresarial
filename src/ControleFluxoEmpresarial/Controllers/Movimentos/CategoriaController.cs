﻿using ControleFluxoEmpresarial.DAOs.Movimentos;
using ControleFluxoEmpresarial.DTO.Filters;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Movimentos;
using Microsoft.AspNetCore.Mvc;

namespace ControleFluxoEmpresarial.Controllers.Movimentos
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriaController : ControllerBase<Categoria, PaginationQuery<SituacaoType?>>
    {
        public CategoriaController(CategoriaDAO dAO) : base(dAO)
        {
        }
    }
}
