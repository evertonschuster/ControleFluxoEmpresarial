using ControleFluxoEmpresarial.Models.Movimentos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs.Movimentos
{
    public class MarcaDAO : DAOReflection<Marca>
    {
        public MarcaDAO(ApplicationContext context) : base(context, "Marcas")
        {
        }

        internal Marca GetByNome(string nome)
        {

            var sql = $@"SELECT *
                            FROM Marcas
                         WHERE nome = @nome";

            return base.ExecuteGetFirstOrDefault(sql, new { nome });
        }
    }
}
