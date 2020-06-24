using ControleFluxoEmpresarial.DAOs.compose;
using ControleFluxoEmpresarial.Entities;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs.Entities
{
    public class FuncionarioServicoDAO : DAO<FuncionarioServico>
    {
        public FuncionarioServicoDAO(ApplicationContext context, string tableName, params string[] propertiesIds) : base(context, tableName, propertiesIds)
        {
        }

        public override void VerifyRelationshipDependence(params object[] id)
        {
        }
    }
}
