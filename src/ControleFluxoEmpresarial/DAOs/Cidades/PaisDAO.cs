using ControleFluxoEmpresarial.Architectures.Exceptions;
using ControleFluxoEmpresarial.DAOs.simple;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.Models.Cidades;

namespace ControleFluxoEmpresarial.DAOs.Cidades
{
    public class PaisDAO : DAO<Pais>
    {
        public PaisDAO(DataBaseConnection context) : base(context, "paises")
        {
        }

        public Pais GetByNome(string nome)
        {
            var sql = $@"SELECT Id, Nome, Sigla, DDI
                          FROM Paises
                        WHERE Nome = @nome ";

            return base.ExecuteGetFirstOrDefault(sql, new { nome });
        }

        public override void VerifyRelationshipDependence(int id)
        {
            var sql = @"SELECT 1 FROM estados
                        WHERE paisId = @id ";

            if (this.ExecuteExist(sql, new { id }))
            {
                throw new BusinessRelationshipException(null, "Pais não pode ser excluido");
            }
        }
    }
}
