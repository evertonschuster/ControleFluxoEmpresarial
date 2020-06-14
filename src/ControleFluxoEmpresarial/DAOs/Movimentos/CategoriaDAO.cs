using ControleFluxoEmpresarial.Architectures.Exceptions;
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

        public override void VerifyRelationshipDependence(int id)
        {
            var sql = @"SELECT 1 FROM Produtos
                            WHERE CategoriaId = @id ";

            if (this.ExecuteExist(sql, new { id }))
            {
                throw new BusinessException(null, "Categoria não pode ser excluida!");
            }
        }
    }
}
