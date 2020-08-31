using ControleFluxoEmpresarial.Architectures.Exceptions;
using ControleFluxoEmpresarial.DAOs.simple;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.Models.Pessoas;

namespace ControleFluxoEmpresarial.DAOs.Pessoas
{
    public class FuncaoFuncionarioDAO : DAO<FuncaoFuncionario>
    {
        public FuncaoFuncionarioDAO(DataBaseConnection context) : base(context, "FuncaoFuncionarios")
        {
        }

        public override void VerifyRelationshipDependence(int id)
        {
            var sql = @"SELECT 1 FROM funcionarios
                            WHERE FuncaoFuncionarioId = @id ";

            if (this.ExecuteExist(sql, new { id }))
            {
                throw new BusinessRelationshipException(null, "Função Funcionário não pode ser excluida!");
            }
        }

        internal FuncaoFuncionario GetByNome(string nome)
        {

            var sql = $@"SELECT *
                            FROM FuncaoFuncionarios
                         WHERE nome = @nome";

            return base.ExecuteGetFirstOrDefault(sql, new { nome });
        }
    }
}
