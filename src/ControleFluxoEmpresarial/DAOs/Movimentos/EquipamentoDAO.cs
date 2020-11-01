using ControleFluxoEmpresarial.Architectures.Exceptions;
using ControleFluxoEmpresarial.DAOs.simple;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.Models.Movimentos;

namespace ControleFluxoEmpresarial.DAOs.Movimentos
{
    public class EquipamentoDAO : DAO<Equipamento>
    {
        public EquipamentoDAO(DataBaseConnection context) : base(context, "Equipamentos")
        {
        }


        public override void VerifyRelationshipDependence(int id)
        {
            var sql = @"SELECT 1 FROM OrdensServico
                            WHERE EquipamentoId = @id ";

            if (this.ExecuteExist(sql, new { id }))
            {
                throw new BusinessRelationshipException(null, "Equipamento não pode ser excluida!");
            }
        }

        internal Equipamento GetByNome(string nome)
        {

            var sql = $@"SELECT *
                            FROM Equipamentos
                         WHERE nome = @nome";

            return base.ExecuteGetFirstOrDefault(sql, new { nome });
        }
    }
}
