using ControleFluxoEmpresarial.DAOs.compose;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.Models.Vendas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs.Vendas
{
    public class VendaDAO : DAO<Venda>
    {
        public VendaDAO(DataBaseConnection context, string tableName, params string[] propertiesIds) : base(context, tableName, propertiesIds)
        {
        }

        public override void VerifyRelationshipDependence(object ids)
        {
            throw new NotImplementedException();
        }
    }
}
