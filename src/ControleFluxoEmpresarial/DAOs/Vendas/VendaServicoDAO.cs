using ControleFluxoEmpresarial.DAOs.compose;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Vendas;

namespace ControleFluxoEmpresarial.DAOs.Vendas
{
    public class VendaServicoId
    {
        public string Numero { get; set; }
        public string Serie { get; set; }
        public string Modelo { get; set; }
        public int ServicoId { get; set; }
    }

    public class VendaServicoDAO : DAO<VendaServico, VendaServicoId>
    {
        public VendaServicoDAO(DataBaseConnection context) : base(context, "VendaServicos", new string[] { "Numero", "Serie", "Modelo", "ServicoId" })
        {
        }

        public override PaginationResult<VendaServico> GetPagined(IPaginationQuery filter)
        {
            return null;
        }

        public override void VerifyRelationshipDependence(object ids)
        {
        }
    }
}
