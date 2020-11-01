using ControleFluxoEmpresarial.DAOs.Movimentos;
using ControleFluxoEmpresarial.DTO.Filters;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Movimentos;
using Microsoft.AspNetCore.Mvc;

namespace ControleFluxoEmpresarial.Controllers.Movimentos
{
    [Route("api/problemas-relatado")]
    [ApiController]
    public class ProblemaRelatadoController : ControllerBase<ProblemaRelatado, PaginationQuery<SituacaoType?>>
    {
        public ProblemaRelatadoController(ProblemaRelatadoDAO dAO) : base(dAO)
        {
        }
    }
}
