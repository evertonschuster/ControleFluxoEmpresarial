using ControleFluxoEmpresarial.Models.Movimentos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs.Movimentos
{
    public class ProdutoDAO : DAOReflection<Produto>
    {
        public ProdutoDAO(ApplicationContext context) : base(context, "Produtos")
        {
        }

        public override void VerifyRelationshipDependence(int id)
        {
        }
    }
}
