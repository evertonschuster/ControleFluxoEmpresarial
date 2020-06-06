using ControleFluxoEmpresarial.Models.Movimentos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs.Movimentos
{
    public class UnidadeMedidaDAO : DAOReflection<UnidadeMedida, string>
    {
        public UnidadeMedidaDAO(ApplicationContext context) : base(context, "UnidadesMedida")
        {
        }
    }
}
