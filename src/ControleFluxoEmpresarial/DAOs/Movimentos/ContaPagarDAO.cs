using ControleFluxoEmpresarial.Architectures.Helper;
using ControleFluxoEmpresarial.DAOs.compose;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.DTO.Movimentos;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.CondicaoPagamentos;
using ControleFluxoEmpresarial.Models.Movimentos;
using ControleFluxoEmpresarial.Models.Pessoas;
using System;
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

        public override void VerifyRelationshipDependence(object ids)
        {
            throw new NotImplementedException();
        }
    }
}
