using ControleFluxoEmpresarial.DAOs.compose;
using ControleFluxoEmpresarial.DAOs.Pessoas;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.Entities;
using ControleFluxoEmpresarial.Models.Movimentos;
using ControleFluxoEmpresarial.Models.Pessoas;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs.Entities
{
    public class FuncionarioServicoDAO : DAO<FuncionarioServico>
    {

        public FuncionarioServicoDAO(ApplicationContext context) : base(context, "FuncionarioServicos", new string[] { "ServicoId", "FuncionarioId" })
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
