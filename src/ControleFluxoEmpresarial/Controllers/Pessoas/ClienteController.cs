using ControleFluxoEmpresarial.DAOs.Pessoas;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Pessoas;
using Microsoft.AspNetCore.Mvc;

namespace ControleFluxoEmpresarial.Controllers.Clients
{
    [Route("api/clientes")]
    [ApiController]
    public class ClienteController : ControllerBase<Cliente, PaginationQuery>
    {
        public ClienteController(ClienteDAO dAO) : base(dAO)
        {
        }
    }
}
