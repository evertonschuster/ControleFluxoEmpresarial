using ControleFluxoEmpresarial.DAOs;
using ControleFluxoEmpresarial.DAOs.Movimentos;
using ControleFluxoEmpresarial.Filters.ModelView;
using ControleFluxoEmpresarial.Models.Movimentos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Controllers.Movimentos
{
    [Route("api/marcas")]
    [ApiController]
    public class MarcaController : ControllerBase<Marca, PaginationQuery>
    {
        public MarcaController(MarcaDAO dAO) : base(dAO)
        {
        }
    }
}
