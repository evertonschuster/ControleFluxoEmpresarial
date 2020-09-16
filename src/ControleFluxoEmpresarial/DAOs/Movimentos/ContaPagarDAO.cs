using ControleFluxoEmpresarial.Architectures.Helper;
using ControleFluxoEmpresarial.DAOs.compose;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.DTO.Compras;
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

        public override PaginationResult<ContaPagar> GetPagined(PaginationQuery filter)
        {
            var sql = @$"SELECT {this.Property.FormatProperty(e => $"ContasPagar.{e}")}, 
                            {typeof(Fornecedor).Property().FormatProperty(e => $"Fornecedores.{e} as \"Fornecedor.{e}\"")},
                            {typeof(FormaPagamento).Property().FormatProperty(e => $"formapagamentos.{e} as \"FormaPagamento.{e}\"")}
                          FROM ContasPagar 
                            INNER JOIN Fornecedores ON Fornecedores.id =  ContasPagar.FornecedorId
                            INNER JOIN formapagamentos ON formapagamentos.id =  ContasPagar.FormaPagamentoId
                        WHERE 1 = 1";

            if (filter.Situacao == DTO.Filters.SituacaoType.Habilitado)
            {
                sql += " AND ContasPagar.DataCancelamento is null";
            }
            if (filter.Situacao == DTO.Filters.SituacaoType.Desabilitado)
            {
                sql += " AND ContasPagar.DataCancelamento is not null";
            }

            var byInt = filter.Filter.ConvertValue<int?>();
            if (byInt != null)
            {
                if (filter.Filter.Length > 2)
                {
                    sql += " AND ContasPagar.Numero = @Filter";
                }
                else
                {
                    sql += " AND (ContasPagar.Numero = @Filter OR ContasPagar.Modelo = @Filter OR ContasPagar.Serie = @Filter OR ContasPagar.Parcela = @byInt)";
                }
            }

            if (DateTime.TryParse(filter.Filter, new CultureInfo("pt-BR"), DateTimeStyles.None, out var byData))
            {
                sql += " AND (to_char(ContasPagar.DataEmissao, 'DD/MM/YYYY') = @filter OR to_char(ContasPagar.DataVencimento, 'DD/MM/YYYY') = @filter )";
            }


            return this.ExecuteGetPaginated(sql, "SELECT  COUNT(*) AS TotalItem FROM ContasPagar", new { filter.Filter, byInt, byData }, filter);
        }

        public List<ContaPagar> GetByCompraId(CompraId compraId)
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
