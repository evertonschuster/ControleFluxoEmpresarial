using ControleFluxoEmpresarial.Architectures.Exceptions;
using ControleFluxoEmpresarial.DAOs.simple;
using ControleFluxoEmpresarial.Models.CondicaoPagamentos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs.CondicaoPagamentos
{
    public class FormaPagamentoDAO : DAO<FormaPagamento>
    {
        public FormaPagamentoDAO(ApplicationContext context) : base(context, "FormaPagamentos")
        {
        }

        public FormaPagamento GetByNome(string nome)
        {
            var sql = $@"SELECT Id, Nome
                          FROM FormaPagamentos
                        WHERE Nome = @nome ";

            return base.ExecuteGetFirstOrDefault(sql, new { nome });
        }

        public override void VerifyRelationshipDependence(int id)
        {
            var sql = @"SELECT 1 FROM CondicaoPagamentoParcelas
                        WHERE FormaPagamentoId = @id ";

            if (this.ExecuteExist(sql, new { id }))
            {
                throw new BusinessException(null, "Forma de Pagamento não pode ser excluida!");
            }
        }
    }
}
