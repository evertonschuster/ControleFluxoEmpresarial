using ControleFluxoEmpresarial.Architectures.Exceptions;
using ControleFluxoEmpresarial.Architectures.Helper;
using ControleFluxoEmpresarial.DAOs.simple;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.DTO.Filters;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Movimentos;

namespace ControleFluxoEmpresarial.DAOs.Movimentos
{
    public class EquipamentoDAO : DAO<Equipamento>
    {
        public EquipamentoDAO(DataBaseConnection context) : base(context, "Equipamentos")
        {
        }

        //@" SELECT Id, Nome, MarcaId, Situacao, DataCriacao, UserCriacao, DataAtualizacao, UserAtualizacao
        //                  FROM Equipamentos"
        public override (string query, object @params) GetQueryListPagined(IPaginationQuery filter)
        {
            var sql = $@"SELECT {this.TableName}.{this.PropertyId}, 
                            {this.Property.FormatProperty(e => $"{this.TableName}.{e}")},
                            marcas.id AS ""marca.id"", marcas.nome AS ""marca.nome""

                        FROM {this.TableName} 
                            INNER JOIN marcas ON marcas.id = equipamentos.marcaid
                        WHERE 1 = 1 ";

            int byId = default;
            if (!string.IsNullOrEmpty(filter.Filter))
            {
                var sqlId = "";
                byId = filter.Filter.ConvertValue<int>();

                if (byId != null)
                {
                    sqlId += $" OR {this.TableName}.id = @id ";
                }

                filter.Filter = $"%{filter.Filter.Replace(" ", "%")}%";
                sql += $" AND ({this.TableName}.nome ilike @Filter {sqlId}) ";
            }

            if ((filter as PaginationQuery<SituacaoType?>).Situacao == DTO.Filters.SituacaoType.Habilitado)
            {
                sql += $" AND {this.TableName}.situacao is null";
            }
            if ((filter as PaginationQuery<SituacaoType?>).Situacao == DTO.Filters.SituacaoType.Desabilitado)
            {
                sql += $" AND {this.TableName}.situacao is not null";
            }

            return (sql, new { id = byId, filter.Filter });
        }

        public override void VerifyRelationshipDependence(int id)
        {
            var sql = @"SELECT 1 FROM OrdensServico
                            WHERE EquipamentoId = @id ";

            if (this.ExecuteExist(sql, new { id }))
            {
                throw new BusinessRelationshipException(null, "Equipamento não pode ser excluida!");
            }
        }

        internal Equipamento GetByNome(string nome)
        {

            var sql = $@"SELECT *
                            FROM Equipamentos
                         WHERE nome = @nome";

            return base.ExecuteGetFirstOrDefault(sql, new { nome });
        }
    }
}
