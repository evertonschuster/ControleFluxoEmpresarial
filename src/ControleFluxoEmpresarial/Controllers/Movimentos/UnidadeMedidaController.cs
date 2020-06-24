using ControleFluxoEmpresarial.DAOs;
using ControleFluxoEmpresarial.DAOs.Movimentos;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Movimentos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Controllers.Movimentos
{
    [Route("api/unidades-medida")]
    [ApiController]
    public class UnidadeMedidaController : ControllerBase<UnidadeMedida, PaginationQuery, string>
    {
        public UnidadeMedidaController(UnidadeMedidaDAO dAO) : base(dAO)
        {
        }
    }
}
