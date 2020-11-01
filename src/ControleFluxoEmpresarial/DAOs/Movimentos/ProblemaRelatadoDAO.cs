using ControleFluxoEmpresarial.Architectures.Exceptions;
using ControleFluxoEmpresarial.DAOs.simple;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.Models.Movimentos;

namespace ControleFluxoEmpresarial.DAOs.Movimentos
{
    public class ProblemaRelatadoDAO : DAO<ProblemaRelatado>
    {
        public ProblemaRelatadoDAO(DataBaseConnection context) : base(context, "ProblemasRelatado")
        {
        }

        public override void VerifyRelationshipDependence(int id)
        {
            var sql = @"SELECT 1 FROM OrdensServico
                            WHERE ProblemaRelatadoId = @id ";

            if (this.ExecuteExist(sql, new { id }))
            {
                throw new BusinessRelationshipException(null, "Problema Relatado não pode ser excluida!");
            }
        }

        internal ProblemaRelatado GetByNome(string nome)
        {

            var sql = $@"SELECT *
                            FROM ProblemasRelatado
                         WHERE nome = @nome";

            return base.ExecuteGetFirstOrDefault(sql, new { nome });
        }
    }
}
