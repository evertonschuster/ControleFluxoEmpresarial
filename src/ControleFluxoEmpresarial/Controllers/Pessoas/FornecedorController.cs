using ControleFluxoEmpresarial.DAOs;
using ControleFluxoEmpresarial.DAOs.Pessoas;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Pessoas;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Controllers.Pessoas
{
    [Route("api/fornecedores")]
    [ApiController]
    public class FornecedorController : ControllerBase<Fornecedor, PaginationQuery>
    {
        public FornecedorController(FornecedorDAO dAO) : base(dAO)
        {
        }
    }
}
