using ControleFluxoEmpresarial.Architectures.Exceptions;
using ControleFluxoEmpresarial.Architectures.Helper;
using ControleFluxoEmpresarial.Filters.ModelView;
using ControleFluxoEmpresarial.Models.Cidades;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs.Cidades
{
    public class EstadoDAOReflection : DAOReflection<Estado>
    {

        public PaisDAOReflection PaisDAO { get; set; }

        protected override string SqlListPagined { get; set; } = @"SELECT Estados.Id, Estados.Nome, Estados.UF, Estados.PaisId, 
                                                                    Paises.Id as ""Pais.Id"", Paises.Nome as ""Pais.Nome"", Paises.Sigla as ""Pais.Sigla"", Paises.DDI as ""Pais.DDI""
                                                                        FROM Estados 
                                                                        INNER JOIN Paises ON Paises.id = Estados.paisId";


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

        public override void VerifyRelationshipDependence(int id)
        {
            var sql = @"SELECT 1 FROM Cidades
                        WHERE estadoId = @id ";

            if (this.ExecuteExist(sql, new { id }))
            {
                throw new BusinessException(null, "Estado não pode ser excluido!");
            }
        }
    }
}
