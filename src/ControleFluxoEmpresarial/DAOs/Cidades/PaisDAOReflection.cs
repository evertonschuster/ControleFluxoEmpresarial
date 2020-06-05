using ControleFluxoEmpresarial.DAOs;
using ControleFluxoEmpresarial.Filters.ModelView;
using ControleFluxoEmpresarial.Models.Cidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs.Cidades
{
    public class PaisDAOReflection : DAOReflection<Pais>
    {
        public PaisDAOReflection(ApplicationContext context) : base(context, "paises")
        {
        }

        public Pais GetByNome(string nome)
        {
            var sql = $@"SELECT Id, Nome, Sigla, DDI
                          FROM Paises
                        WHERE Nome = @nome ";

            return base.ExecuteGetFirstOrDefault(sql, new { nome });
        }
    }
}
