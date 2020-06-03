using ControleFluxoEmpresarial.Filters.ModelView;
using ControleFluxoEmpresarial.Models.Cidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs.Cidades
{
    public class EstadoDAOReflection : DAOReflection<Estado>
    {

        public PaisDAOReflection PaisDAO { get; set; }

        public EstadoDAOReflection(ApplicationContext context, PaisDAOReflection paisDAO) : base(context, "Estados")
        {
            this.PaisDAO = paisDAO;
        }

        internal Estado GetByNome(string nome)
        {
            var sql = $@"SELECT Id, Nome, UF, PaisId
                            FROM Estados
                         WHERE Nome = @nome";

            var entity = base.ExecuteGetFirstOrDefault(sql, new { nome });
            if (entity != null)
            {
                this.PaisDAO.CreateTransaction(this.Transaction);
                entity.Pais = this.PaisDAO.GetByID(entity.PaisId);
            }

            return entity;
        }
    }
}
