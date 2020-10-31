using ControleFluxoEmpresarial.Architectures.Helper;
using ControleFluxoEmpresarial.DAOs.compose;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.DTO.Compras;
using ControleFluxoEmpresarial.DTO.Vendas;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Vendas;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace ControleFluxoEmpresarial.DAOs.Vendas
{
    public class VendaId
    {
        public string Numero { get; set; }
        public string Serie { get; set; }
        public string Modelo { get; set; }
    }

    public class VendaDAO : DAO<Venda, VendaId>
    {
        public VendaDAO(DataBaseConnection context) : base(context, "Vendas", new string[] { "Numero", "Serie", "Modelo" })
        {
        }

        private string BuildGenericsFilter(VendaPaginationQuery filter)
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
                if (filter.Situacao.Contains(SituacaoVendaType.ATIVAS))
                {
                    sql = AddCondition("vendas.datacancelamento is NULL");
                }

                if (filter.Situacao.Contains(SituacaoVendaType.CANCELADA))
                {
                    sql = AddCondition("vendas.datacancelamento is NOT NULL");
                }

                if (filter.Situacao.Contains(SituacaoVendaType.CANCELADA_RECENTEMENTE))
                {
                    sql = AddCondition($"to_char(vendas.datacancelamento, 'DD/MM/YYYY') > '{DateTime.Now.AddDays(-8).ToString("dd/MM/yyyy")}'");
                }

                if (filter.Situacao.Contains(SituacaoVendaType.LANCADA_RECENTEMENTE))
                {
                    sql = AddCondition($"to_char(vendas.dataemissao" +
                        $", 'DD/MM/YYYY') > '{DateTime.Now.AddDays(-8).ToString("dd/MM/yyyy")}'");
                }

                sql = $" AND ({sql}) ";
            }
            else
            {
                sql = $" AND (vendas.datacancelamento is NULL) ";
            }


            if (!string.IsNullOrEmpty(filter.Filter))
            {
                if (DateTime.TryParse(filter.Filter, new CultureInfo("pt-BR"), DateTimeStyles.None, out var data))
                {
                    return sql + $"AND (to_char(vendas.dataemissao, 'DD/MM/YYYY') = '{data.ToString("dd/MM/yyyy")}' OR to_char(vendas.datachegada, 'DD/MM/YYYY') = '{data.ToString("dd/MM/yyyy")}')";
                }

                var sqlFornecedor = "";
                if (int.TryParse(filter.Filter, out var fornecedorId))
                {
                    sqlFornecedor = $" OR vendas.clienteId = {fornecedorId}";
                }

                return sql + $"AND (vendas.numero = @Filter OR vendas.modelo = @Filter OR vendas.serie = @Filter {sqlFornecedor}) ";
            }

            return sql;
        }

        private string BuildAdvancedFilter(VendaPaginationQuery filter)
        {
            var sql = "";

            if (!string.IsNullOrEmpty(filter.Modelo))
            {
                sql += " AND vendas.modelo = @Modelo";
            }

            if (!string.IsNullOrEmpty(filter.Serie))
            {
                sql += " AND vendas.Serie = @Serie";
            }

            if (!string.IsNullOrEmpty(filter.Numero))
            {
                sql += " AND vendas.Numero = @Numero";
            }

            if (filter.ClienteId != null)
            {
                sql += " AND vendas.ClienteId = @clienteId";
            }

            if (filter.DataVendaInicio != null)
            {
                sql += $" AND to_char(vendas.dataemissao, 'YYYY/MM/DD') >= '{filter.DataVendaInicio?.ToString("yyyy/MM/dd")}' ";
            }

            if (filter.DataVendaFim != null)
            {
                sql += $" AND to_char(vendas.dataemissao, 'YYYY/MM/DD') <= '{filter.DataVendaFim?.ToString("yyyy/MM/dd")}' ";
            }

            if (filter.ProdutosId?.Count > 0)
            {
                sql += $" AND EXISTS(SELECT 1 FROM vendaprodutos " +
                    $" WHERE vendaprodutos.vendanumero = vendas.numero AND vendaprodutos.vendamodelo = vendas.modelo " +
                    $" AND vendaprodutos.produtoid IN ({filter.ProdutosId.Aggregate("", (e, a) => $"{e} {a},")}{filter.ProdutosId.FirstOrDefault()}) LIMIT 1) ";
            }

            return sql;
        }

        public override PaginationResult<Venda> GetPagined(IPaginationQuery filter)
        {
            var filterSql = this.BuildGenericsFilter(filter as VendaPaginationQuery) + this.BuildAdvancedFilter(filter as VendaPaginationQuery);

            var orderby = " ORDER BY Vendas.Numero::int DESC, Vendas.Serie";
            var sql = @$"SELECT {this.Property.FormatProperty(e => $"Vendas.{e}")} ,
                            clientes.id AS ""cliente.id"", clientes.nome AS ""cliente.nome"", clientes.apelido AS ""cliente.apelido""

                        FROM Vendas
                            INNER JOIN public.clientes ON clientes.id = vendas.clienteid 
                        WHERE 1=1 {filterSql}";

            var sqlPagination = $"SELECT  COUNT(*) AS TotalItem FROM Vendas WHERE 1 = 1 {filterSql}";

            return base.ExecuteGetPaginated(sql + orderby, sqlPagination, filter, filter);
        }

        public override void VerifyRelationshipDependence(object ids)
        {
            throw new NotImplementedException();
        }

        public string GetNumeroByOS(int OSId)
        {
            var sql = @"SELECT * 
                        FROM Vendas
                        WHERE ordemservicoid = @OSId";

            return this.ExecuteGetFirstOrDefault(sql, new { OSId })?.Numero;
        }

        public string GetNewNumero()
        {
            var sql = @"SELECT *
                        FROM Vendas
                        ORDER BY Numero::int DESC";

            var entity = this.ExecuteGetFirstOrDefault(sql);
            var numero = Int64.Parse(entity?.Numero ?? "0") + 1;


            //Precisa ver se não existe uma conta a receber com este numero lançada manualmente
            var sqlContaReceber = @"SELECT 1 FROM contasreceber
                                    WHERE	contasreceber.numero = @numero";

            while (this.ExecuteExist(sqlContaReceber, new { numero = numero.ToString() }))
            {
                numero++;
            }

            return numero.ToString();
        }

        public List<Venda> GetByOSID(int OSId)
        {
            var sql = @"SELECT * 
                        FROM Vendas
                        WHERE ordemservicoid = @OSId";

            return base.ExecuteGetAll(sql, new { OSId });
        }
    }
}
