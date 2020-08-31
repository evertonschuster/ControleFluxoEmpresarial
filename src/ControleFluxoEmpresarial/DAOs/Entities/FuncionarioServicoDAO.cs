using ControleFluxoEmpresarial.DAOs.compose;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.Entities;
using System.Collections.Generic;

namespace ControleFluxoEmpresarial.DAOs.Entities
{
    public class FuncionarioServicoDAO : DAO<FuncionarioServico, (int servicoId, int funcionarioId)>
    {

        public FuncionarioServicoDAO(DataBaseConnection context) : base(context, "FuncionarioServicos", new string[] { "ServicoId", "FuncionarioId" })
        {
        }

        public override void VerifyRelationshipDependence(object ids)
        {
        }

        internal List<FuncionarioServico> GetInServico(int servicoid)
        {
            var sql = @"
                        SELECT FuncionarioServicos.* 
                        FROM FuncionarioServicos
                        WHERE FuncionarioServicos.servicoid = @servicoid";

            return this.ExecuteGetAll(sql, new { servicoid });
        }

    }
}
