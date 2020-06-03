using ControleFluxoEmpresarial.Filters.ModelView;
using ControleFluxoEmpresarial.Models.Cidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs.Cidades
{
    public class CidadeDAOReflection : DAOReflection<Cidade>
    {
        public EstadoDAOReflection EstadoDAO { get; set; }

        public CidadeDAOReflection(ApplicationContext context, EstadoDAOReflection estadoDAO) : base(context, "Cidades")
        {
            this.EstadoDAO = estadoDAO;
        }


        internal Cidade GetByNome(string nome)
        {
            var sql = $@"SELECT *
                            FROM Cidades
                         WHERE nome = '{nome}'";

            var entity = base.ExecuteGetFirstOrDefault(sql);
            if (entity != null)
            {
                this.EstadoDAO.CreateTransaction(this.Transaction);
                entity.Estado = this.EstadoDAO.GetByID(entity.EstadoId);
            }

            return entity;
        }
    }
}
