using ControleFluxoEmpresarial.Filters.ModelView;
using ControleFluxoEmpresarial.Models.CondicaoPagamentos;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs.CondicaoPagamentos
{
    public class FormaPagamentoDAO : DAO<FormaPagamento>
    {
        public FormaPagamentoDAO(ApplicationContext context) : base(context)
        {
        }

        protected override FormaPagamento MapEntity(DbDataReader reader)
        {
            var entity = base.MapEntity(reader);

            entity.Id = reader.GetInt32("Id");
            entity.Nome = reader.GetString("Nome");

            return entity;
        }

        public override void Delete(int id, bool commit = true)
        {
            var sql = $@"DELETE FROM FormaPagamentos 
                        WHERE Id = {id.ToString()}";

            base.ExecuteScript(sql);
        }

        public override FormaPagamento GetByID(int id)
        {
            var sql = $@"SELECT Id, Nome
                          FROM FormaPagamentos
                        WHERE Id = {id.ToString()}";

            return base.ExecuteGetFirstOrDefault(sql);
        }


        public override int Insert(FormaPagamento entity, bool commit = true)
        {
            try
            {
                var sql = $@"INSERT INTO FormaPagamentos (Nome)
                         VALUES ('{entity.Nome}')";

                return base.ExecuteScriptInsert(sql, commit);
            }
            finally
            {
                this.Connection.Close();
            }
        }

        public FormaPagamento GetByNome(string nome)
        {
            var sql = $@"SELECT Id, Nome
                          FROM FormaPagamentos
                        WHERE Nome = '{nome}' ";

            return base.ExecuteGetFirstOrDefault(sql);
        }

        public override void Update(FormaPagamento entity, bool commit = true)
        {
            var sql = $@"UPDATE FormaPagamentos 
                        SET Nome = '{entity.Nome}'
                        WHERE Id = {entity.Id.ToString()}";

            base.ExecuteScript(sql);
        }

        public override PaginationResult<FormaPagamento> GetPagined(PaginationQuery filter)
        {
            var sql = $@"SELECT Id, Nome
                          FROM FormaPagamentos ";

            if (!string.IsNullOrEmpty(filter.Filter))
            {
                var sqlId = "";
                int formaPagamentoId;
                if (Int32.TryParse(filter.Filter, out formaPagamentoId))
                {
                    sqlId += $" OR id = {formaPagamentoId} ";
                }
                sql += $" WHERE nome like '%{filter.Filter}%' {sqlId} ";
            }

            return base.ExecuteGetPaginated(sql, filter);
        }
    }
}
