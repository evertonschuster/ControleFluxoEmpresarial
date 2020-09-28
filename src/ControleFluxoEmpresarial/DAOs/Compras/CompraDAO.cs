using ControleFluxoEmpresarial.DAOs.compose;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.DTO.Compras;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Compras;
using System;
using System.Globalization;
using System.Linq;

namespace ControleFluxoEmpresarial.DAOs.Compras
{
    public class CompraDAO : DAO<Compra, CompraId>
    {
        public CompraDAO(DataBaseConnection context) : base(context, "Compras", new[] { "Modelo", "Serie", "Numero", "FornecedorId" })
        {
        }

        private string BuildGenericsFilter(CompraPaginationQuery filter)
        {

            var sql = "";
            string AddCondition(string condition)
            {
                if (sql.Length == 0)
                {
                    return condition;
                }
                return $" {sql} OR {condition} ";
            }

            if (filter.Situacao?.Count > 0)
            {
                if (filter.Situacao.Contains(SituacaoCompraType.ATIVAS))
                {
                    sql = AddCondition("compras.datacancelamento is NULL");
                }

                if (filter.Situacao.Contains(SituacaoCompraType.CANCELADA))
                {
                    sql = AddCondition("compras.datacancelamento is NOT NULL");
                }

                if (filter.Situacao.Contains(SituacaoCompraType.CANCELADA_RECENTEMENTE))
                {
                    sql = AddCondition($"to_char(compras.datacancelamento, 'DD/MM/YYYY') > '{DateTime.Now.AddDays(-8).ToString("dd/MM/yyyy")}'");
                }

                if (filter.Situacao.Contains(SituacaoCompraType.LANCADA_RECENTEMENTE))
                {
                    sql = AddCondition($"to_char(compras.dataemissao" +
                        $", 'DD/MM/YYYY') > '{DateTime.Now.AddDays(-8).ToString("dd/MM/yyyy")}'");
                }

                sql = $" AND ({sql}) ";
            }
            else
            {
                sql = $" AND (compras.datacancelamento is NULL) ";
            }


            if (!string.IsNullOrEmpty(filter.Filter))
            {
                if (DateTime.TryParse(filter.Filter, new CultureInfo("pt-BR"), DateTimeStyles.None, out var data))
                {
                    return sql + $"AND (to_char(compras.dataemissao, 'DD/MM/YYYY') = '{data.ToString("dd/MM/yyyy")}' OR to_char(compras.datachegada, 'DD/MM/YYYY') = '{data.ToString("dd/MM/yyyy")}')";
                }

                var sqlFornecedor = "";
                if (int.TryParse(filter.Filter, out var fornecedorId))
                {
                    sqlFornecedor = $" OR compras.fornecedorid = {fornecedorId}";
                }

                return sql + $"AND (compras.numero = @Filter OR compras.modelo = @Filter OR compras.serie = @Filter {sqlFornecedor}) ";
            }

            return sql;
        }

        private string BuildAdvancedFilter(CompraPaginationQuery filter)
        {
            var sql = "";

            if (!string.IsNullOrEmpty(filter.Modelo))
            {
                sql += " AND compras.modelo = @Modelo";
            }

            if (!string.IsNullOrEmpty(filter.Serie))
            {
                sql += " AND compras.Serie = @Serie";
            }

            if (!string.IsNullOrEmpty(filter.Numero))
            {
                sql += " AND compras.Numero = @Numero";
            }

            if (filter.FornecedorId != null)
            {
                sql += " AND compras.FornecedorId = @FornecedorId";
            }

            if (filter.DataCompraInicio != null)
            {
                sql += $" AND to_char(compras.dataemissao, 'DD/MM/YYYY') >= '{filter.DataCompraInicio?.ToString("dd/MM/yyyy")}' ";
            }

            if (filter.DataCompraFim != null)
            {
                sql += $" AND to_char(compras.dataemissao, 'DD/MM/YYYY') <= '{filter.DataCompraFim?.ToString("dd/MM/yyyy")}' ";
            }

            if (filter.ProdutosId?.Count > 0)
            {
                sql += $" AND EXISTS(SELECT 1 FROM compraprodutos " +
                    $" WHERE compraprodutos.numero = compras.numero AND compraprodutos.modelo = compras.modelo " +
                    $" AND compraprodutos.serie = compras.serie AND compraprodutos.fornecedorid = compras.fornecedorid " +
                    $" AND compraprodutos.produtoid IN ({filter.ProdutosId.Aggregate("", (e, a) => $"{e} {a},")}{filter.ProdutosId.FirstOrDefault()}) LIMIT 1) ";
            }

            return sql;
        }

        public override PaginationResult<Compra> GetPagined(IPaginationQuery filter)
        {
            var filterSql = this.BuildGenericsFilter((CompraPaginationQuery)filter) + this.BuildAdvancedFilter(filter as CompraPaginationQuery);

            var sql = $@"SELECT compras.numero, compras.modelo, compras.serie, compras.fornecedorid, compras.dataemissao, compras.datachegada, compras.frete, compras.seguro, 
		                    compras.outrasdespesas, compras.observacoes, compras.datacancelamento, compras.usercancelamento, compras.justificativacancelamento, 
	                        compras.datacriacao, compras.dataatualizacao, compras.usercriacao, compras.useratualizacao,
		
	                        fornecedores.id as ""fornecedor.id"", fornecedores.nome as ""fornecedor.nome"", fornecedores.apelido as ""fornecedor.apelido"", 
                            fornecedores.bairro as ""fornecedor.bairro"", fornecedores.cep as ""fornecedor.cep"", fornecedores.cidadeid as ""fornecedor.cidadeid"", 
	                        fornecedores.complemento as ""fornecedor.complemento"", fornecedores.contato as ""fornecedor.contato"", 
	                        fornecedores.condicaopagamentoid as ""fornecedor.condicaopagamentoid"", fornecedores.cpfcpnj as ""fornecedor.cpfcpnj"", 
	                        fornecedores.email as ""fornecedor.email"", fornecedores.endereco as ""fornecedor.endereco"", fornecedores.numero as ""fornecedor.numero"", 
	                        fornecedores.rginscricaoestadual as ""fornecedor.rginscricaoestadual"", fornecedores.telefone as ""fornecedor.telefone"", 
	                        fornecedores.tipo as ""fornecedor.tipo"", fornecedores.limitecredito as ""fornecedor.limitecredito"", fornecedores.observacao as ""fornecedor.observacao"", 
	                        fornecedores.situacao as ""fornecedor.situacao"" , fornecedores.datacriacao as ""fornecedor.datacriacao"", 
	                        fornecedores.dataatualizacao as ""fornecedor.dataatualizacao"", fornecedores.usercriacao as ""fornecedor.usercriacao"", 
	                        fornecedores.useratualizacao as ""fornecedor.useratualizacao""


                    FROM compras
                        INNER JOIN fornecedores ON fornecedores.id = compras.fornecedorid
                    WHERE 1 = 1 {filterSql}";



            return this.ExecuteGetPaginated(sql, $"SELECT  COUNT(*) AS TotalItem FROM compras WHERE 1 = 1 {filterSql}", filter, filter);
        }

        public override void VerifyRelationshipDependence(object ids)
        {

        }
    }
}
