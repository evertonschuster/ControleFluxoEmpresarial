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
    [Route("api/produtos")]
    [ApiController]
    public class ProdutoController : ControllerBase<Produto, PaginationQuery>
    {
        public ProdutoController(ProdutoDAO dAO) : base(dAO)
        {
        }
    }
}
