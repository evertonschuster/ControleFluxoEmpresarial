using ControleFluxoEmpresarial.DAOs.Movimentos;
using ControleFluxoEmpresarial.DTO.Filters;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Movimentos;
using Microsoft.AspNetCore.Mvc;

namespace ControleFluxoEmpresarial.Controllers.Movimentos
{
    [Route("api/equipamentos")]
    [ApiController]
    public class EquipamentoController : ControllerBase<Equipamento, PaginationQuery<SituacaoType?>>
    {
        public EquipamentoController(EquipamentoDAO dAO) : base(dAO)
        {
        }
    }
}
