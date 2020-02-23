using ControleFluxoEmpresarial.Filters.ModelView;
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
    public class CondicaoPagamentoParcelaDAO : DAO<CondicaoPagamentoParcela>
    {
        public CondicaoPagamentoParcelaDAO(ApplicationContext context) : base(context)
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
                        WHERE Id = {id.ToString()}";

            base.ExecuteScript(sql);
        }

        public override CondicaoPagamentoParcela GetByID(int id)
        {
            var sql = $@"SELECT CondicaoPagamentoParcelas.*,  formapagamentos.nome as ""formapagamentos.nome""
                        FROM CondicaoPagamentoParcelas
                            INNER JOIN formapagamentos ON formapagamentos.id = CondicaoPagamentoParcelas.formapagamentoid
                        WHERE CondicaoPagamentoParcelas.Id = {id.ToString()}";

            return base.ExecuteGetFirstOrDefault(sql);
        }


        public int Insert(CondicaoPagamentoParcela entity, int condicaoPagamentoId, bool commit = true)
        {
            try
            {
                var sql = $@"INSERT INTO CondicaoPagamentoParcelas ( NumeroDias, Percentual, CondicaoPagamentosId, FormaPagamentoId)
                         VALUES ({entity.NumeroDias}, {entity.Percentual.ToString(CultureInfo.CreateSpecificCulture("en-US"))}, {condicaoPagamentoId}, {entity.FormaPagamento.Id})";

                return base.ExecuteScriptInsert(sql, commit);
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
                        WHERE condicaopagamentosid = {id}";

            return base.ExecuteGetAll(sql, closeConnection);
        }

        public override void Update(CondicaoPagamentoParcela entity, bool commit = true)
        {
            var sql = $@"UPDATE CondicaoPagamentoParcelas 
                        SET NumeroDias = {entity.NumeroDias},
                        Percentual = {entity.Percentual.ToString(CultureInfo.CreateSpecificCulture("en-US"))},
                        FormaPagamentoId = {entity.FormaPagamento.Id}
                        WHERE Id = {entity.Id.ToString()}";

            base.ExecuteScript(sql, commit);
        }

        public override PaginationResult<CondicaoPagamentoParcela> GetPagined(PaginationQuery filter)
        {
            var sql = $@"SELECT CondicaoPagamentoParcelas.*,  formapagamentos.nome as ""formapagamentos.nome""
                        FROM CondicaoPagamentoParcelas
                            INNER JOIN formapagamentos ON formapagamentos.id = CondicaoPagamentoParcelas.formapagamentoid ";

            if (!string.IsNullOrEmpty(filter.Filter))
            {
                var sqlId = "";
                int formaPagamentoId;
                if (Int32.TryParse(filter.Filter, out formaPagamentoId))
                {
                    sqlId += $" OR CondicaoPagamentoParcelas.id = {formaPagamentoId} ";
                }
                sql += $" WHERE CondicaoPagamentoParcelas.nome like '%{filter.Filter}%' {sqlId} ";
            }

            return base.ExecuteGetPaginated(sql, filter);
        }
    }
}
