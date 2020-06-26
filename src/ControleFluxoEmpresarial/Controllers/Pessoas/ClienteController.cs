using ControleFluxoEmpresarial.DAOs;
using ControleFluxoEmpresarial.DAOs.Pessoas;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Pessoas;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
