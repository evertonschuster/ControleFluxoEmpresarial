using ControleFluxoEmpresarial.Architectures.Exceptions;
using ControleFluxoEmpresarial.Architectures.Helper;
using ControleFluxoEmpresarial.DAOs.simple;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Cidades;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs.Cidades
{
    public class EstadoDAO : DAO<Estado>
    {

        public PaisDAO PaisDAO { get; set; }

        public EstadoDAO(DataBaseConnection context, PaisDAO paisDAO) : base(context, "Estados")
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
                throw new BusinessRelationshipException(null, "Estado não pode ser excluido!");
            }
        }

        public override (string query, object @params) GetQueryListPagined(PaginationQuery filter)
        {
            var sql = @"SELECT Estados.Id, Estados.Nome, Estados.UF, Estados.PaisId, Estados.Situacao,
                        Paises.Id as ""Pais.Id"", Paises.Nome as ""Pais.Nome"", Paises.Sigla as ""Pais.Sigla"", Paises.DDI as ""Pais.DDI""
                            FROM Estados 
                            INNER JOIN Paises ON Paises.id = Estados.paisId 
                        WHERE 1=1 ";

            int? byId = default;
            if (!string.IsNullOrEmpty(filter.Filter))
            {
                var sqlId = "";
                byId = filter.Filter.ConvertValue<int>();

                if (byId != null)
                {
                    sqlId += $" OR {this.TableName}.id = @id ";
                }

                filter.Filter = $"%{filter.Filter.Replace(" ", "%")}%";
                sql += $" AND ({this.TableName}.Nome ilike @Filter {sqlId}) ";
            }

            if (filter.Situacao == DTO.Filters.SituacaoType.Habilitado)
            {
                sql += " AND Estados.situacao is null";
            }
            if (filter.Situacao == DTO.Filters.SituacaoType.Desabilitado)
            {
                sql += " AND Estados.situacao is not null";
            }

            return (sql, new { id = byId, filter.Filter });
        }
    }
}
