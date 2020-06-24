using ControleFluxoEmpresarial.DAOs;
using ControleFluxoEmpresarial.DAOs.CondicaoPagamentos;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.CondicaoPagamentos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Controllers.CondicaoPagamentos
{
    [Route("api/forma-pagamento")]
    [ApiController]
    public class FormaPagamentoController : ControllerBase<FormaPagamento, PaginationQuery>
    {
        public FormaPagamentoController(FormaPagamentoDAO dAO) : base(dAO)
        {
        }

    }
}
