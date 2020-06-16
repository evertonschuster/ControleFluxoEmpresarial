using ControleFluxoEmpresarial.Models.Pessoas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs.Pessoas
{
    public class FuncionarioDAO : DAOReflection<Funcionario>
    {
        public FuncionarioDAO(ApplicationContext context) : base(context, "funcionarios")
        {
        }

        public override void VerifyRelationshipDependence(int id)
        {
        }

        internal Funcionario GetByCPFCNPJ(string cpf)
        {
            return null;
        }
    }
}
