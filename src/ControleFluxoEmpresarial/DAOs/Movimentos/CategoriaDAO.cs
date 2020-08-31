using ControleFluxoEmpresarial.Architectures.Exceptions;
using ControleFluxoEmpresarial.DAOs.simple;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.Models.Movimentos;

namespace ControleFluxoEmpresarial.DAOs.Movimentos
{
    public class CategoriaDAO : DAO<Categoria>
    {
        public CategoriaDAO(DataBaseConnection context) : base(context, "Categorias")
        {
        }

        public override void VerifyRelationshipDependence(int id)
        {
            var sql = @"SELECT 1 FROM Produtos
                            WHERE CategoriaId = @id 
                        union
                        SELECT 1 FROM Servicos
                            WHERE CategoriaId = @id 
";

            if (this.ExecuteExist(sql, new { id }))
            {
                throw new BusinessRelationshipException(null, "Categoria não pode ser excluida!");
            }
        }

        internal Categoria GetByNome(string nome)
        {
            var sql = $@"SELECT *
                            FROM Categorias
                         WHERE Nome = @nome";

            return base.ExecuteGetFirstOrDefault(sql, new { nome });
        }
    }
}
