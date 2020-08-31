using ControleFluxoEmpresarial.Architectures.Exceptions;
using ControleFluxoEmpresarial.Architectures.Helper;
using ControleFluxoEmpresarial.DAOs.simple;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Cidades;

namespace ControleFluxoEmpresarial.DAOs.Cidades
{
    public class CidadeDAO : DAO<Cidade>
    {
        public EstadoDAO EstadoDAO { get; set; }

        public CidadeDAO(DataBaseConnection context, EstadoDAO estadoDAO) : base(context, "Cidades")
        {
            this.EstadoDAO = estadoDAO;
        }


        internal Cidade GetByNome(string nome)
        {
            var sql = $@"SELECT *
                            FROM Cidades
                         WHERE nome = @nome";

            var entity = base.ExecuteGetFirstOrDefault(sql, new { nome });
            if (entity != null)
            {
                entity.Estado = this.EstadoDAO.GetByID(entity.EstadoId);
            }

            return entity;
        }

        public override void VerifyRelationshipDependence(int id)
        {
            var sql = @"SELECT 1 FROM Clientes
                            WHERE cidadeId = @id 
                        union
                        SELECT 1 FROM Fornecedores
	                        WHERE cidadeId = @id
                        union
                        SELECT 1 FROM Funcionarios

                            WHERE cidadeId = @id";

            if (this.ExecuteExist(sql, new { id }))
            {
                throw new BusinessRelationshipException(null, "Cidade não pode ser excluida!");
            }
        }

        public override (string query, object @params) GetQueryListPagined(PaginationQuery filter)
        {
            var sql = $@"SELECT Cidades.Id, Cidades.Nome, Cidades.DDD, Cidades.EstadoId, Cidades.Situacao,
				        Estados.Id as ""Estado.Id"", Estados.Nome as ""Estado.Nome"", Estados.UF as ""Estado.UF"", Estados.Situacao as ""Estado.Situacao""
                                    FROM Cidades
                        INNER JOIN Estados ON Cidades.EstadoID = Estados.Id
                        WHERE 1=1";

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
                sql += " AND Cidades.situacao is null";
            }
            if (filter.Situacao == DTO.Filters.SituacaoType.Desabilitado)
            {
                sql += " AND Cidades.situacao is not null";
            }

            return (sql, new { id = byId, filter.Filter });
        }
    }
}
