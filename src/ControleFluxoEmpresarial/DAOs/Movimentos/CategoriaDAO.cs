using ControleFluxoEmpresarial.Models.Movimentos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs.Movimentos
{
    public class CategoriaDAO : DAOReflection<Categoria>
    {
        public CategoriaDAO(ApplicationContext context) : base(context, "Categorias")
        {
        }
    }
}
