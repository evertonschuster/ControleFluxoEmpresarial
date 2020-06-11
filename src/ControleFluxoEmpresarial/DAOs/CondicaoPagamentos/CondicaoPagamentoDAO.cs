using ControleFluxoEmpresarial.DAOs.CondicaoPagamentoParcelas;
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
    public class CondicaoPagamentoDAO : DAO<CondicaoPagamento, int>
    {
        public CondicaoPagamentoDAO(CondicaoPagamentoParcelaDAO condicaoPagamentoParcelaDAO, ApplicationContext context) : base(context)
        {
            CondicaoPagamentoParcelaDAO = condicaoPagamentoParcelaDAO ?? throw new ArgumentNullException(nameof(condicaoPagamentoParcelaDAO));
        }

        public CondicaoPagamentoParcelaDAO CondicaoPagamentoParcelaDAO { get; set; }

        protected override CondicaoPagamento MapEntity(DbDataReader reader)
        {
            var entity = base.MapEntity(reader);

            entity.Id = reader.GetInt32("Id");
            entity.Nome = reader.GetString("Nome");
            entity.Multa = reader.GetDecimal("Multa");
            entity.Juro = reader.GetDecimal("Juro");
            entity.Desconto = reader.GetDecimal("Desconto");
            entity.DataAtualizacao = reader.GetDateTime("DataAtualizacao");
            entity.DataCriacao = reader.GetDateTime("DataCriacao");

            return entity;
        }

        public override void Delete(int id, bool commit = true)
        {
            var sql = $@"DELETE FROM CondicaoPagamentos 
                        WHERE Id = @id";

            base.ExecuteScript(sql, new { id });
        }

        public override CondicaoPagamento GetByID(int id)
        {
            var sql = $@"SELECT Id, Nome, Juro, Multa, Desconto,DataAtualizacao, DataCriacao
                          FROM CondicaoPagamentos
                        WHERE Id = @id";

            var entity = base.ExecuteGetFirstOrDefault(sql, new { id }, false);
            this.CondicaoPagamentoParcelaDAO.Transaction = this.Transaction;
            entity.Parcela = this.CondicaoPagamentoParcelaDAO.GetByCondicaoPagamentoId(id, true);

            return entity;
        }


        public override int Insert(CondicaoPagamento entity, bool commit = true)
        {
            try
            {
                var sql = $@"INSERT INTO CondicaoPagamentos (Nome, Juro, Multa, Desconto, DataAtualizacao, DataCriacao)
                         VALUES (@Nome, @Juro, @Multa, @Desconto, @DataAtualizacao, @DataCriacao)";

                var id = base.ExecuteScriptInsert(sql, new { entity.Nome, entity.Juro, entity.Multa, entity.Desconto, DataAtualizacao = DateTime.Now, DataCriacao = DateTime.Now }, false);

                this.CondicaoPagamentoParcelaDAO.Transaction = this.Transaction;
                foreach (var parcela in entity.Parcela)
                {
                    this.CondicaoPagamentoParcelaDAO.Insert(parcela, id, false);
                }

                this.Transaction.Commit();

                return id;
            }
            finally
            {
                this.Connection.Close();
            }
        }

        public CondicaoPagamento GetByNome(string nome)
        {
            var sql = $@"SELECT Id, Nome, Juro, Multa, Desconto, DataAtualizacao, DataCriacao
                          FROM CondicaoPagamentos
                        WHERE Nome = @nome ";

            return base.ExecuteGetFirstOrDefault(sql, new { nome });
        }

        public override void Update(CondicaoPagamento entity, bool commit = true)
        {
            var parcelaNewIds = entity.Parcela.Select(e => e.Id).ToList();
            var parcelaDbIds = this.CondicaoPagamentoParcelaDAO.GetByCondicaoPagamentoId(entity.Id).Select(e => e.Id).ToList();

            var sql = $@"UPDATE CondicaoPagamentos 
                        SET Nome = @Nome,
                        Juro = @Juro,
                        Multa = @Multa,
                        Desconto = @Desconto,
                        DataAtualizacao= @DataAtualizacao
                        WHERE Id = @Id";


            //update e insert
            foreach (var parcela in entity.Parcela ?? Enumerable.Empty<CondicaoPagamentoParcela>())
            {
                if (parcela.Id == 0)
                    this.CondicaoPagamentoParcelaDAO.Insert(parcela, entity.Id, false);
                else
                    this.CondicaoPagamentoParcelaDAO.Update(parcela, false);
            }

            //remove 
            var removeIds = parcelaDbIds?.Except(parcelaNewIds).ToList();
            foreach (var id in removeIds ?? Enumerable.Empty<int>())
            {
                this.CondicaoPagamentoParcelaDAO.Delete(id, false);
            }


            this.Transaction = this.CondicaoPagamentoParcelaDAO.Transaction;
            base.ExecuteScript(sql, new { entity.Nome, entity.Juro, entity.Multa, entity.Desconto, entity.Id, DataAtualizacao = DateTime.Now });

        }

        public override PaginationResult<CondicaoPagamento> GetPagined(PaginationQuery filter)
        {
            var sql = $@"SELECT Id, Nome, Juro, Multa, Desconto, DataAtualizacao, DataCriacao
                          FROM CondicaoPagamentos ";

            int id = 0;
            if (!string.IsNullOrEmpty(filter.Filter))
            {
                var sqlId = "";
                if (Int32.TryParse(filter.Filter, out id))
                {
                    sqlId += $" OR id = @id ";
                }
                filter.Filter = "%" + filter.Filter + "%";
                sql += $" WHERE nome ilike @Filter {sqlId} ";
            }

            return base.ExecuteGetPaginated(sql, "SELECT  COUNT(*) AS TotalItem FROM CondicaoPagamentos", new { id, filter.Filter }, filter);
        }

        public override void VerifyRelationshipDependence(int id)
        {
            throw new NotImplementedException();
        }
    }
}
