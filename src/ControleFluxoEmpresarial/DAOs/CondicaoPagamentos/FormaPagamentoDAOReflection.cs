using ControleFluxoEmpresarial.Models.CondicaoPagamentos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs.CondicaoPagamentos
{
    public class FormaPagamentoDAOReflection : DAOReflection<FormaPagamento>
    {
        public FormaPagamentoDAOReflection(ApplicationContext context) : base(context, "FormaPagamentos")
        {
        }

        public FormaPagamento GetByNome(string nome)
        {
            var sql = $@"SELECT Id, Nome
                          FROM FormaPagamentos
                        WHERE Nome = @nome ";

            return base.ExecuteGetFirstOrDefault(sql, new { nome });
        }
    }
}
