using ControleFluxoEmpresarial.DAOs.compose;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.Models.Vendas;
using System;

namespace ControleFluxoEmpresarial.DAOs.Vendas
{
    public class VendaDAO : DAO<Venda, (string numero, string serie, string modelo)>
    {
        public VendaDAO(DataBaseConnection context) : base(context, "Vendas", new string[] { "numero", "serie", "modelo" })
        {
        }

        public override void VerifyRelationshipDependence(object ids)
        {
            throw new NotImplementedException();
        }
    }
}
