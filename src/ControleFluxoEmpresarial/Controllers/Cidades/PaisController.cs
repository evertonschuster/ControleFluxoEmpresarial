using ControleFluxoEmpresarial.DAOs.Cidades;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Cidades;
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
