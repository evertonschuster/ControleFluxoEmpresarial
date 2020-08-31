using ControleFluxoEmpresarial.DAOs.CondicaoPagamentos;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.CondicaoPagamentos;
using Microsoft.AspNetCore.Mvc;

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
