using ControleFluxoEmpresarial.DAOs.Cidades;
using ControleFluxoEmpresarial.DTO.Filters;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Cidades;
using Microsoft.AspNetCore.Mvc;

namespace ControleFluxoEmpresarial.Controllers.Cidades
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstadoController : ControllerBase<Estado, PaginationQuery<SituacaoType?>>
    {
        public EstadoController(EstadoDAO dAO) : base(dAO)
        {
        }

    }
}
