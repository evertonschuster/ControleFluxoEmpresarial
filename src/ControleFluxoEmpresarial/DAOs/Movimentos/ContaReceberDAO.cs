using ControleFluxoEmpresarial.Architectures.Helper;
using ControleFluxoEmpresarial.DAOs.compose;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.DTO.Movimentos;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.CondicaoPagamentos;
using ControleFluxoEmpresarial.Models.Movimentos;
using ControleFluxoEmpresarial.Models.Pessoas;
using System;
using System.Collections.Generic;
using System.Globalization;

namespace ControleFluxoEmpresarial.DAOs.Movimentos
{
    public class ContaReceberDAO : DAO<ContaReceber, ContaReceberId>
    {
        public ContaReceberDAO(DataBaseConnection context) : base(context, "ContasReceber", new[] { "Modelo", "Serie", "Numero", "Parcela" })
        {
        }

        public override PaginationResult<ContaReceber> GetPagined(IPaginationQuery genericsFilter)
        {
            var filter = genericsFilter as PaginationQuery<List<SituacaoContaReceberType>>;

            var sql = @$"SELECT {this.Property.FormatProperty(e => $"ContasReceber.{e}")}, 
                            {typeof(Cliente).Property().FormatProperty(e => $"clientes.{e} as \"cliente.{e}\"")},
                            {typeof(FormaPagamento).Property().FormatProperty(e => $"formapagamentos.{e} as \"FormaPagamento.{e}\"")}
                          FROM ContasReceber
                            INNER JOIN clientes ON clientes.id =  ContasReceber.clienteId
                            INNER JOIN formapagamentos ON formapagamentos.id =  ContasReceber.FormaPagamentoId
                        WHERE 1 = 1";
            var sqlWhereSituacao = "";
            var sqlWhere = "";

            if (filter.Situacao.Contains(SituacaoContaReceberType.CANCELADA))
            {
                sqlWhereSituacao += " OR ContasReceber.DataCancelamento is not null";
            }
            if (filter.Situacao.Contains(SituacaoContaReceberType.PAGA))
            {
                sqlWhereSituacao += " OR ContasReceber.datapagamento is not null";
            }
            if (filter.Situacao.Contains(SituacaoContaReceberType.PENDENTE))
            {
                sqlWhereSituacao += " OR ContasReceber.datapagamento is null" +
                                    " AND ContasReceber.DataCancelamento is null";
            }


            if (filter.Situacao.Contains(SituacaoContaReceberType.VENCIDA))
            {
                sqlWhereSituacao += " OR (to_char(ContasReceber.datavencimento, 'DD/MM/YYYY') <=  to_char(now(), 'DD/MM/YYYY') " +
                                            " AND ContasReceber.DataCancelamento is null" +
                                            " AND  ContasReceber.datapagamento is null )";
            }

            var byInt = filter.Filter.ConvertValue<int?>();
            if (byInt != null)
            {
                if (filter.Filter.Length > 2)
                {
                    sqlWhere += " AND ContasReceber.Numero = @Filter";
                }
                else
                {
                    sqlWhere += " AND (ContasReceber.Numero = @Filter OR ContasReceber.Modelo = @Filter OR ContasReceber.Serie = @Filter OR ContasReceber.Parcela = @byInt)";
                }
            }

            if (DateTime.TryParse(filter.Filter, new CultureInfo("pt-BR"), DateTimeStyles.None, out var byData))
            {
                sqlWhere += " AND (to_char(ContasReceber.DataEmissao, 'DD/MM/YYYY') = @filter OR to_char(ContasReceber.DataVencimento, 'DD/MM/YYYY') = @filter )";
            }

            if (!string.IsNullOrEmpty(sqlWhereSituacao))
            {
                sqlWhere = $" AND (1<>1 {sqlWhereSituacao}) " + sqlWhere;
            }
            return this.ExecuteGetPaginated(sql + sqlWhere, "SELECT  COUNT(*) AS TotalItem FROM ContasReceber WHERE 1=1 " + sqlWhere, new { filter.Filter, byInt, byData }, filter);
        }

        public override void VerifyRelationshipDependence(object ids)
        {
            throw new NotImplementedException();
        }

        public List<ContaReceber> GetByOSID(int id)
        {
            var sql = $@"SELECT {this.Property.FormatProperty(e => $"ContasReceber.{e}")},
                            formapagamentos.id as ""formapagamento.id"", formapagamentos.nome as ""formapagamento.nome""

                        FROM contasreceber
	                        INNER JOIN vendas ON vendas.Modelo = contasreceber.Modelo AND vendas.Serie = contasreceber.Serie AND vendas.Numero = contasreceber.Numero
                            INNER JOIN formapagamentos ON formapagamentos.id = contasreceber.formapagamentoid

                        WHERE vendas.ordemservicoid = @id";

            return base.ExecuteGetAll(sql, new { id });
        }
    }
}
