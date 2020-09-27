using ControleFluxoEmpresarial.DAOs.Movimentos;
using ControleFluxoEmpresarial.DTO.Filters;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Movimentos;
using Microsoft.AspNetCore.Mvc;

namespace ControleFluxoEmpresarial.Controllers.Movimentos
{
    [Route("api/servicos")]
    [ApiController]
    public class ServicoController : ControllerBase<Servico, PaginationQuery<SituacaoType?>>
    {
        public ServicoController(ServicoDAO dAO) : base(dAO)
        {
        }
    }
}
