using ControleFluxoEmpresarial.Models.Pessoas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs.Pessoas
{
    public class FuncaoFuncionarioDAO : DAOReflection<FuncaoFuncionario>
    {
        public FuncaoFuncionarioDAO(ApplicationContext context) : base(context, "FuncaoFuncionarios")
        {
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
