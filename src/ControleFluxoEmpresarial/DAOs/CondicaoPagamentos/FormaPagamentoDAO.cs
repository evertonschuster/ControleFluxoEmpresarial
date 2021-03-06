﻿using ControleFluxoEmpresarial.Architectures.Exceptions;
using ControleFluxoEmpresarial.DAOs.simple;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.Models.CondicaoPagamentos;

namespace ControleFluxoEmpresarial.DAOs.CondicaoPagamentos
{
    public class FormaPagamentoDAO : DAO<FormaPagamento>
    {
        public FormaPagamentoDAO(DataBaseConnection context) : base(context, "FormaPagamentos")
        {
        }

        public FormaPagamento GetByNome(string nome)
        {
            var sql = $@"SELECT *
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
                throw new BusinessRelationshipException(null, "Forma de Pagamento não pode ser excluida!");
            }
        }
    }
}
