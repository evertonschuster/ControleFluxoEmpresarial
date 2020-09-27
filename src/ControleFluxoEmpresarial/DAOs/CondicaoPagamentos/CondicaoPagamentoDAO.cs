using ControleFluxoEmpresarial.Architectures.Exceptions;
using ControleFluxoEmpresarial.DAOs.CondicaoPagamentoParcelas;
using ControleFluxoEmpresarial.DAOs.simple;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.DTO.Filters;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.CondicaoPagamentos;
using System;
using System.Data;
using System.Data.Common;
using System.Linq;

namespace ControleFluxoEmpresarial.DAOs.CondicaoPagamentos
{
    public class CondicaoPagamentoDAO : DAO<CondicaoPagamento, int>
    {
        public CondicaoPagamentoDAO(CondicaoPagamentoParcelaDAO condicaoPagamentoParcelaDAO, DataBaseConnection context) : base(context, "CondicaoPagamentos")
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
            entity.DataAtualizacao = reader.IsDBNull("DataAtualizacao") ? null as DateTime? : reader.GetDateTime("DataAtualizacao");
            entity.DataCriacao = reader.GetDateTime("DataCriacao");
            entity.Situacao = reader.IsDBNull("Situacao") ? null as DateTime? : reader.GetDateTime("Situacao");
            entity.UserCriacao = reader.GetString("UserCriacao");
            entity.UserAtualizacao = reader.IsDBNull("UserAtualizacao") ? null : reader.GetString("UserAtualizacao");

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
            var sql = $@"SELECT *
                          FROM CondicaoPagamentos
                        WHERE Id = @id";

            var entity = base.ExecuteGetFirstOrDefault(sql, new { id });
            if (entity != null)
            {
                this.CondicaoPagamentoParcelaDAO.Transaction = this.Transaction;
                entity.Parcela = this.CondicaoPagamentoParcelaDAO.GetByCondicaoPagamentoId(id);
            }
            else
            {
                this.Connection.Close();
            }

            return entity;
        }


        public override int Insert(CondicaoPagamento entity, bool commit = true)
        {
            try
            {
                var sql = $@"INSERT INTO CondicaoPagamentos (Nome, Juro, Multa, Desconto, DataAtualizacao, DataCriacao, Situacao, UserCriacao)
                         VALUES (@Nome, @Juro, @Multa, @Desconto, @DataAtualizacao, @DataCriacao, @Situacao, @UserCriacao)";

                entity.DataCriacao = DateTime.Now;
                entity.UserCriacao = this.Context.UserRequest.Id.ToString();

                var id = base.ExecuteScriptInsert(sql, entity, false);

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
            var sql = $@"SELECT *
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
                        Situacao = @Situacao ,
                        DataAtualizacao= @DataAtualizacao,
                        UserAtualizacao = @UserAtualizacao

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
            entity.DataAtualizacao = DateTime.Now;
            entity.UserAtualizacao = this.Context.UserRequest.Id.ToString();

            base.ExecuteScript(sql, entity);

        }

        public override PaginationResult<CondicaoPagamento> GetPagined(IPaginationQuery filter)
        {
            var sql = $@"SELECT *
                          FROM CondicaoPagamentos 
                        WHERE 1=1 ";

            int id = 0;
            if (!string.IsNullOrEmpty(filter.Filter))
            {
                var sqlId = "";
                if (Int32.TryParse(filter.Filter, out id))
                {
                    sqlId += $" OR id = @id ";
                }
                filter.Filter = "%" + filter.Filter + "%";
                sql += $" AND nome ilike @Filter {sqlId} ";
            }

            if ((filter as PaginationQuery<SituacaoType?>).Situacao == DTO.Filters.SituacaoType.Habilitado)
            {
                sql += " AND CondicaoPagamentos.situacao is null";
            }
            if ((filter as PaginationQuery<SituacaoType?>).Situacao == DTO.Filters.SituacaoType.Desabilitado)
            {
                sql += " AND CondicaoPagamentos.situacao is not null";
            }

            return base.ExecuteGetPaginated(sql, "SELECT  COUNT(*) AS TotalItem FROM CondicaoPagamentos", new { id, filter.Filter }, filter);
        }

        public override void VerifyRelationshipDependence(int id)
        {
            var sql = @"SELECT 1 FROM Clientes
                            WHERE condicaopagamentoid = @id 
                        union
                        SELECT 1 FROM Fornecedores
	                        WHERE condicaopagamentoid = @id";

            if (this.ExecuteExist(sql, new { id }))
            {
                throw new BusinessRelationshipException(null, "Condição de Pagamento não pode ser excluida!");
            }
        }
    }
}
