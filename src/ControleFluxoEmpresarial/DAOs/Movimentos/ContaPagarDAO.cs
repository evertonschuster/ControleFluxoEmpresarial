using ControleFluxoEmpresarial.Architectures.Helper;
using ControleFluxoEmpresarial.DAOs.compose;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.DTO.Compras;
using ControleFluxoEmpresarial.DTO.Filters;
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
    public class ContaPagarDAO : DAO<ContaPagar, ContaPagarId>
    {
        public ContaPagarDAO(DataBaseConnection context) : base(context, "ContasPagar", new[] { "Modelo", "Serie", "Numero", "FornecedorId", "Parcela" })
        {
        }

        public override PaginationResult<ContaPagar> GetPagined(IPaginationQuery genericsFilter)
        {
            var filter = genericsFilter as PaginationQuery<List<SituacaoContaPagarType>>;

            var sql = @$"SELECT {this.Property.FormatProperty(e => $"ContasPagar.{e}")}, 
                            {typeof(Fornecedor).Property().FormatProperty(e => $"Fornecedores.{e} as \"Fornecedor.{e}\"")},
                            {typeof(FormaPagamento).Property().FormatProperty(e => $"formapagamentos.{e} as \"FormaPagamento.{e}\"")}
                          FROM ContasPagar 
                            INNER JOIN Fornecedores ON Fornecedores.id =  ContasPagar.FornecedorId
                            INNER JOIN formapagamentos ON formapagamentos.id =  ContasPagar.FormaPagamentoId
                        WHERE 1 = 1";

            var orderby = " ORDER BY  ContasPagar.dataVencimento, ContasPagar.Numero::int, ContasPagar.Modelo, ContasPagar.Serie, ContasPagar.Parcela, ContasPagar.FornecedorId";
            var sqlWhereSituacao = "";
            var sqlWhere = "";

            if (filter.Situacao.Contains(SituacaoContaPagarType.CANCELADA))
            {
                sqlWhereSituacao += " OR ContasPagar.DataCancelamento is not null";
            }
            if (filter.Situacao.Contains(SituacaoContaPagarType.PAGA))
            {
                sqlWhereSituacao += " OR ContasPagar.datapagamento is not null";
            }
            if (filter.Situacao.Contains(SituacaoContaPagarType.PENDENTE))
            {
                sqlWhereSituacao += " OR ContasPagar.datapagamento is null" +
                                    " AND ContasPagar.DataCancelamento is null";
            }


            if (filter.Situacao.Contains(SituacaoContaPagarType.VENCIDA))
            {
                sqlWhereSituacao += " OR (to_char(ContasPagar.datavencimento, 'YYYY/MM/DD') <=  to_char(now(), 'YYYY/MM/DD') " +
                                            " AND ContasPagar.DataCancelamento is null" +
                                            " AND  ContasPagar.datapagamento is null )";
            }

            var byInt = filter.Filter.ConvertValue<int?>();
            if (byInt != null)
            {
                if (filter.Filter.Length > 2)
                {
                    sqlWhere += " AND ContasPagar.Numero = @Filter";
                }
                else
                {
                    sqlWhere += " AND (ContasPagar.Numero = @Filter OR ContasPagar.Modelo = @Filter OR ContasPagar.Serie = @Filter OR ContasPagar.Parcela = @byInt)";
                }
            }

            if (DateTime.TryParse(filter.Filter, new CultureInfo("pt-BR"), DateTimeStyles.None, out var byData))
            {
                sqlWhere += " AND (to_char(ContasPagar.DataEmissao, 'DD/MM/YYYY') = @filter OR to_char(ContasPagar.DataVencimento, 'DD/MM/YYYY') = @filter )";
            }

            if (!string.IsNullOrEmpty(sqlWhereSituacao))
            {
                sqlWhere = $" AND (1<>1 {sqlWhereSituacao}) " + sqlWhere;
            }
            return this.ExecuteGetPaginated(sql + sqlWhere + orderby, "SELECT  COUNT(*) AS TotalItem FROM ContasPagar WHERE 1=1 " + sqlWhere, new { filter.Filter, byInt, byData }, filter);
        }

        public List<ContaPagar> ListByCompraId(CompraId compraId)
        {
            var sql = $@"SELECT contaspagar.numero, contaspagar.modelo, contaspagar.serie, contaspagar.fornecedorid, contaspagar.parcela, contaspagar.valor, 
			                    contaspagar.desconto, contaspagar.multa, contaspagar.juro, contaspagar.valorbaixa, contaspagar.formapagamentoid, 
			                    contaspagar.datavencimento, contaspagar.dataemissao, contaspagar.descricao, contaspagar.databaixa, contaspagar.datapagamento, 
			                    contaspagar.userbaixa, contaspagar.datacancelamento, contaspagar.usercancelamento, contaspagar.justificativacancelamento, 
			                    contaspagar.datacriacao, contaspagar.dataatualizacao, contaspagar.usercriacao, contaspagar.useratualizacao,

			                    formapagamentos.id as ""formapagamento.id"", formapagamentos.nome as ""formapagamento.nome"", formapagamentos.situacao as ""formapagamento.situacao"", 
                                formapagamentos.datacriacao as ""formapagamento.datacriacao"", formapagamentos.dataatualizacao as ""formapagamento.dataatualizacao"", 
			                    formapagamentos.usercriacao as ""formapagamento.usercriacao"", formapagamentos.useratualizacao as ""formapagamento.useratualizacao""


                        FROM public.contaspagar
                            INNER JOIN public.formapagamentos ON formapagamentos.id = contaspagar.formapagamentoid
                        WHERE Modelo = @Modelo and Serie = @Serie and Numero = @Numero and FornecedorId = @FornecedorId";

            return this.ExecuteGetAll(sql, compraId);
        }

        public override void VerifyRelationshipDependence(object ids)
        {
            throw new NotImplementedException();
        }
    }
}
