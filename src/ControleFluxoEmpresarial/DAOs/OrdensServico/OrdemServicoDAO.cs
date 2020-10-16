using ControleFluxoEmpresarial.DAOs.simple;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.DTO.OrdensServico;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.OrdensServico;
using System;
using System.Collections.Generic;
using System.Globalization;

namespace ControleFluxoEmpresarial.DAOs.OrdensServico
{
    public class OrdemServicoDAO : DAO<OrdemServico>
    {
        public OrdemServicoDAO(DataBaseConnection context) : base(context, "OrdensServico", "Id")
        {
        }

        public override OrdemServico GetByID(int id)
        {
            var sql = @"SELECT OrdensServico.Id, OrdensServico.ClienteId, OrdensServico.Telefone, OrdensServico.Contato, OrdensServico.DescricaoEquipamento, OrdensServico.dataCancelamento,
                            OrdensServico.DescricaoProblemaRelatado, OrdensServico.DescricaoAcessorio, OrdensServico.DescricaoObservacao, OrdensServico.DescricaoTecnico, 
                            OrdensServico.DescricaoObservacaoTecnico, OrdensServico.NumeroSerie, OrdensServico.DataAbertura, OrdensServico.DataExecucao, OrdensServico.condicaopagamentoid,
                            OrdensServico.DataDevolucaoCliente, OrdensServico.DataCriacao, OrdensServico.UserCriacao, OrdensServico.DataAtualizacao, OrdensServico.UserAtualizacao,

                            clientes.id as ""cliente.id"", clientes.nome as ""cliente.nome"", clientes.apelido as ""cliente.apelido"", 
                            clientes.bairro as ""cliente.bairro"", clientes.cep as ""cliente.cep"", clientes.cidadeid as ""cliente.cidadeid"", 
                            clientes.complemento as ""cliente.complemento"", clientes.condicaopagamentoid as ""cliente.condicaopagamentoid""

                          FROM OrdensServico
                            INNER JOIN clientes ON clientes.id = OrdensServico.clienteid
                        WHERE OrdensServico.Id = @Id ";

            return this.ExecuteGetFirstOrDefault(sql, new { Id = id });
        }

        public override PaginationResult<OrdemServico> GetPagined(IPaginationQuery genericsFilter)
        {
            var filter = genericsFilter as PaginationQuery<List<SituacaoOrdemServicoType>>;

            var sql = @"SELECT OrdensServico.Id, OrdensServico.ClienteId, OrdensServico.Telefone, OrdensServico.Contato, OrdensServico.DescricaoEquipamento, 
                            OrdensServico.DescricaoProblemaRelatado, OrdensServico.DescricaoAcessorio, OrdensServico.DescricaoObservacao, OrdensServico.DescricaoTecnico, 
                            OrdensServico.DescricaoObservacaoTecnico, OrdensServico.NumeroSerie, OrdensServico.DataAbertura, OrdensServico.DataExecucao, OrdensServico.dataCancelamento,
                            OrdensServico.DataDevolucaoCliente, OrdensServico.DataCriacao, OrdensServico.UserCriacao, OrdensServico.DataAtualizacao, OrdensServico.UserAtualizacao,

                            clientes.id as ""cliente.id"", clientes.nome as ""cliente.nome"", clientes.apelido as ""cliente.apelido"",  clientes.telefone as ""cliente.telefone"",
                            clientes.bairro as ""cliente.bairro"", clientes.cep as ""cliente.cep"", clientes.cidadeid as ""cliente.cidadeid"", 
                            clientes.complemento as ""cliente.complemento"", clientes.condicaopagamentoid as ""cliente.condicaopagamentoid""

                          FROM OrdensServico
                            INNER JOIN clientes ON clientes.id = OrdensServico.clienteid
                        WHERE 1 = 1 ";

            var whereSituacao = "";
            if (filter.Situacao.Contains(SituacaoOrdemServicoType.CANCELADA))
            {
                whereSituacao += " OR OrdensServico.DataCancelamento IS NOT NULL ";
            }
            if (filter.Situacao.Contains(SituacaoOrdemServicoType.DEVOLVIDO))
            {
                whereSituacao += " OR (OrdensServico.DataCancelamento IS NULL AND OrdensServico.DataDevolucaoCliente IS NOT NULL)";
            }
            if (filter.Situacao.Contains(SituacaoOrdemServicoType.PENDENTE))
            {
                whereSituacao += " OR (OrdensServico.DataCancelamento IS NULL AND OrdensServico.DataExecucao IS NULL)";
            }
            if (filter.Situacao.Contains(SituacaoOrdemServicoType.EM_EXECUCAO))
            {
                whereSituacao += " OR (OrdensServico.DataCancelamento IS NULL AND OrdensServico.DataExecucao IS NOT NULL  AND OrdensServico.DataDevolucaoCliente IS NULL)";
            }
            if (!string.IsNullOrEmpty(whereSituacao))
            {
                whereSituacao = $" AND ( 1=2 {whereSituacao} ) ";
            }

            var whereFilter = "";
            if (!string.IsNullOrEmpty(filter.Filter))
            {
                if (int.TryParse(filter.Filter, out var id))
                {
                    whereFilter += $" OR OrdensServico.Id = {id} ";
                }

                if (DateTime.TryParse(filter.Filter, new CultureInfo("pt-BR"), DateTimeStyles.None, out var dataAbertura))
                {
                    whereFilter += $" OR to_char(OrdensServico.DataAbertura, 'DD/MM/YYYY') = '{dataAbertura.ToString("dd/MM/yyyy")}' ";
                }

                if (filter.Filter.Length >= 10 && filter.Filter.Length <= 17)
                {
                    whereFilter += " OR replace(replace(clientes.CPFCPNJ, '.',''),'-','') = replace(replace(@Filter, '.',''),'-','') ";
                }

                whereFilter += "  OR OrdensServico.DescricaoEquipamento ILIKE '%' || replace(@Filter, ' ','%') || '%' " +
                                " OR OrdensServico.DescricaoEquipamento ILIKE '%' || replace(@Filter, ' ','%') || '%' " +
                                " OR clientes.nome ILIKE '%' || replace(@Filter, ' ','%') || '%' ";
            }
            if (!string.IsNullOrEmpty(whereFilter))
            {
                whereFilter = $" AND ( 1=2 {whereFilter} ) ";
            }

            whereFilter = whereSituacao + whereFilter;
            return base.ExecuteGetPaginated(sql + whereFilter, $"SELECT  COUNT(*) AS TotalItem FROM OrdensServico INNER JOIN clientes ON clientes.id = OrdensServico.clienteid WHERE 1=1" + whereFilter, filter, filter);
        }

        public override void VerifyRelationshipDependence(int id)
        {
        }
    }
}
