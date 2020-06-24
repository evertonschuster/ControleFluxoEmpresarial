using ControleFluxoEmpresarial.Architectures.Exceptions;
using ControleFluxoEmpresarial.DAOs.simple;
using ControleFluxoEmpresarial.Models.Movimentos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs.Movimentos
{
    public class MarcaDAO : DAO<Marca>
    {
        public MarcaDAO(ApplicationContext context) : base(context, "Marcas")
        {
        }

        public override void VerifyRelationshipDependence(int id)
        {
            var sql = @"SELECT 1 FROM Produtos
                            WHERE marcaId = @id ";

            if (this.ExecuteExist(sql, new { id }))
            {
                throw new BusinessException(null, "Marca não pode ser excluida!");
            }
        }

        internal Marca GetByNome(string nome)
        {

            var sql = $@"SELECT *
                            FROM Marcas
                         WHERE nome = @nome";

            return base.ExecuteGetFirstOrDefault(sql, new { nome });
        }
    }
}
