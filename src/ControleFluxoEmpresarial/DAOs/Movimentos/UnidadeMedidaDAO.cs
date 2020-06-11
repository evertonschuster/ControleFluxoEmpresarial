using ControleFluxoEmpresarial.Architectures.Exceptions;
using ControleFluxoEmpresarial.Models.Movimentos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs.Movimentos
{
    public class UnidadeMedidaDAO : DAOReflection<UnidadeMedida, string>
    {
        public UnidadeMedidaDAO(ApplicationContext context) : base(context, "UnidadesMedida", "Id", false)
        {
        }

        public override void Update(UnidadeMedida entity, bool commit = true)
        {
            var unidade = this.GetByID(entity.Id);
            if (unidade == null)
            {
                throw new BusinessException(new { Id = "Código da Unidade de medida é inválido!" });
            }

            base.Update(entity, commit);
        }

        public override void VerifyRelationshipDependence(string id)
        {
            throw new NotImplementedException();
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
