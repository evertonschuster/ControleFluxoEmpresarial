using ControleFluxoEmpresarial.Models.Pessoas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs.Pessoas
{
    public class FornecedorDAO : DAO<Fornecedor>
    {
        public FornecedorDAO(ApplicationContext context) : base(context, "Fornecedores")
        {
        }

        public override void VerifyRelationshipDependence(int id)
        {
        }

        internal Fornecedor GetByCPFCNPJ(string cpf)
        {
            return null;
        }
    }
}
