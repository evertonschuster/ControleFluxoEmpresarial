using ControleFluxoEmpresarial.Architectures.Exceptions;
using ControleFluxoEmpresarial.DAOs.simple;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.Models.Movimentos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs.Movimentos
{
    public class UnidadeMedidaDAO : DAO<UnidadeMedida, string>
    {
        public UnidadeMedidaDAO(DataBaseConnection context) : base(context, "UnidadesMedida", "Id","Nome", false)
        {
        }

        public override void Update(UnidadeMedida entity, bool commit = true)
        {
            var unidade = this.GetByID(entity.Id);
            if (unidade == null)
            {
                throw new BusinessRelationshipException(new { Id = "Código da Unidade de medida é inválido!" });
            }

            base.Update(entity, commit);
        }

        public override void VerifyRelationshipDependence(string id)
        {
            var sql = @"SELECT 1 FROM Produtos
                            WHERE UnidadeMedidaId = @id ";

            if (this.ExecuteExist(sql, new { id }))
            {
                throw new BusinessException(null, "Unidade de Medida não pode ser excluida!");
            }
        }

        internal UnidadeMedida GetByNome(string nome)
        {

            var sql = $@"SELECT *
                            FROM UnidadesMedida
                         WHERE nome = @nome";

            return base.ExecuteGetFirstOrDefault(sql, new { nome });
        }
    }
}
