﻿using ControleFluxoEmpresarial.DAOs.Movimentos;
using ControleFluxoEmpresarial.DTO.Filters;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Movimentos;
using Microsoft.AspNetCore.Mvc;

namespace ControleFluxoEmpresarial.Controllers.Movimentos
{
    [Route("api/marcas")]
    [ApiController]
    public class MarcaController : ControllerBase<Marca, PaginationQuery<SituacaoType?>>
    {
        public MarcaController(MarcaDAO dAO) : base(dAO)
        {
        }
    }
}
