using ControleFluxoEmpresarial.DAOs.Pessoas;
using ControleFluxoEmpresarial.DTO.Filters;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Pessoas;
using Microsoft.AspNetCore.Mvc;

namespace ControleFluxoEmpresarial.Controllers.Clients
{
    [Route("api/clientes")]
    [ApiController]
    public class ClienteController : ControllerBase<Cliente, PaginationQuery<SituacaoType?>>
    {
        public ClienteController(ClienteDAO dAO) : base(dAO)
        {
        }
    }
}
