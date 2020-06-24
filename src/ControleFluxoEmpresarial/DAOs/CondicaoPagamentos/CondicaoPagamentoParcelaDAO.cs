using ControleFluxoEmpresarial.Architectures.Exceptions;
using ControleFluxoEmpresarial.DAOs.simple;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.CondicaoPagamentos;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs.CondicaoPagamentoParcelas
{
    public class CondicaoPagamentoParcelaDAO : DAO<CondicaoPagamentoParcela, int>
    {
        public CondicaoPagamentoParcelaDAO(ApplicationContext context) : base(context, "CondicaoPagamentoParcelas")
        {
        }
        protected override CondicaoPagamentoParcela MapEntity(DbDataReader reader)
        {
            var entity = base.MapEntity(reader);

            entity.Id = reader.GetInt32("Id");
            entity.NumeroDias = reader.GetInt32("NumeroDias");
            entity.Percentual = reader.GetDecimal("Percentual");
            entity.FormaPagamento = new FormaPagamento()
            {
                Id = reader.GetInt32("FormaPagamentoId"),
                Nome = reader.GetString("formapagamentos.nome")
            };

            return entity;
        }

        public override void Delete(int id, bool commit = true)
        {
            var sql = $@"DELETE FROM CondicaoPagamentoParcelas 
                        WHERE Id = @id";

            base.ExecuteScript(sql, new { id });
        }

        public override CondicaoPagamentoParcela GetByID(int id)
        {
            var sql = $@"SELECT CondicaoPagamentoParcelas.*,  formapagamentos.nome as ""formapagamentos.nome""
                        FROM CondicaoPagamentoParcelas
                            INNER JOIN formapagamentos ON formapagamentos.id = CondicaoPagamentoParcelas.formapagamentoid
                        WHERE CondicaoPagamentoParcelas.Id = @id";

            return base.ExecuteGetFirstOrDefault(sql, new { id });
        }


        public int Insert(CondicaoPagamentoParcela entity, int condicaoPagamentoId, bool commit = true)
        {
            try
            {
                var sql = $@"INSERT INTO CondicaoPagamentoParcelas ( NumeroDias, Percentual, CondicaoPagamentosId, FormaPagamentoId)
                         VALUES (@NumeroDias, @Percentual, @condicaoPagamentoId, @formaPagamentoId)";

                return base.ExecuteScriptInsert(sql, new { entity.NumeroDias, entity.Percentual, condicaoPagamentoId, formaPagamentoId = entity.FormaPagamento.Id }, commit);
            }
            finally
            {
                if (commit)
                {
                    this.Connection.Close();
                }
            }
        }

        internal List<CondicaoPagamentoParcela> GetByCondicaoPagamentoId(int id, bool closeConnection = true)
        {
            var sql = @$"SELECT CondicaoPagamentoParcelas.*,  formapagamentos.nome as ""formapagamentos.nome""
                        FROM CondicaoPagamentoParcelas
                            INNER JOIN formapagamentos ON formapagamentos.id = CondicaoPagamentoParcelas.formapagamentoid
                        WHERE condicaopagamentosid = @id";

            return base.ExecuteGetAll(sql, new { id }, closeConnection);
        }

        public override void Update(CondicaoPagamentoParcela entity, bool commit = true)
        {
            var sql = $@"UPDATE CondicaoPagamentoParcelas 
                        SET NumeroDias = @NumeroDias,
                        Percentual = @Percentual,
                        FormaPagamentoId = @formaPagamentoId
                        WHERE Id = @Id";

            base.ExecuteScript(sql, new { entity.NumeroDias, entity.Percentual, formaPagamentoId = entity.FormaPagamento.Id, entity.Id }, commit);
        }

        public override PaginationResult<CondicaoPagamentoParcela> GetPagined(PaginationQuery filter)
        {
            var sql = $@"SELECT CondicaoPagamentoParcelas.*,  formapagamentos.nome as ""formapagamentos.nome""
                        FROM CondicaoPagamentoParcelas
                            INNER JOIN formapagamentos ON formapagamentos.id = CondicaoPagamentoParcelas.formapagamentoid ";

            int id = 0;
            if (!string.IsNullOrEmpty(filter.Filter))
            {
                var sqlId = "";
                if (Int32.TryParse(filter.Filter, out id))
                {
                    sqlId += $" OR CondicaoPagamentoParcelas.id = @id ";
                }
                filter.Filter = "%" + filter.Filter + "%";
                sql += $" WHERE CondicaoPagamentoParcelas.nome ilike @Filter {sqlId} ";
            }

            return base.ExecuteGetPaginated(sql, "SELECT  COUNT(*) AS TotalItem FROM CondicaoPagamentoParcelas", new { id, filter.Filter }, filter);
        }

        public override void VerifyRelationshipDependence(int id)
        {
            var sql = @"SELECT 1 FROM clientes
                        WHERE condicaoPagamentoId = @id ";

            if (this.ExecuteExist(sql, new { id }))
            {
                throw new BusinessException(null, "Confição de Pagamento não pode ser excluida!");
            }
        }
    }
}
