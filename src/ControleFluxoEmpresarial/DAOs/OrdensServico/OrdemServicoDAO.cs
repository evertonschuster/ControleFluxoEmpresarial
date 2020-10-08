using ControleFluxoEmpresarial.DAOs.simple;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.OrdensServico;

namespace ControleFluxoEmpresarial.DAOs.OrdensServico
{
    public class OrdemServicoDAO : DAO<OrdemServico>
    {
        public OrdemServicoDAO(DataBaseConnection context) : base(context, "OrdensServico", "Id")
        {
        }

        public override OrdemServico GetByID(int id)
        {
            var sql = @"SELECT OrdensServico.Id, OrdensServico.ClienteId, OrdensServico.Telefone, OrdensServico.Contato, OrdensServico.DescricaoEquipamento, 
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

        public override PaginationResult<OrdemServico> GetPagined(IPaginationQuery filter)
        {
            var sql = @"SELECT OrdensServico.Id, OrdensServico.ClienteId, OrdensServico.Telefone, OrdensServico.Contato, OrdensServico.DescricaoEquipamento, 
                            OrdensServico.DescricaoProblemaRelatado, OrdensServico.DescricaoAcessorio, OrdensServico.DescricaoObservacao, OrdensServico.DescricaoTecnico, 
                            OrdensServico.DescricaoObservacaoTecnico, OrdensServico.NumeroSerie, OrdensServico.DataAbertura, OrdensServico.DataExecucao, 
                            OrdensServico.DataDevolucaoCliente, OrdensServico.DataCriacao, OrdensServico.UserCriacao, OrdensServico.DataAtualizacao, OrdensServico.UserAtualizacao,

                            clientes.id as ""cliente.id"", clientes.nome as ""cliente.nome"", clientes.apelido as ""cliente.apelido"", 
                            clientes.bairro as ""cliente.bairro"", clientes.cep as ""cliente.cep"", clientes.cidadeid as ""cliente.cidadeid"", 
                            clientes.complemento as ""cliente.complemento"", clientes.condicaopagamentoid as ""cliente.condicaopagamentoid""

                          FROM OrdensServico
                            INNER JOIN clientes ON clientes.id = OrdensServico.clienteid
                        WHERE 1 = 1 ";

            return base.ExecuteGetPaginated(sql, $"SELECT  COUNT(*) AS TotalItem FROM OrdensServico", filter, filter);
        }

        public override void VerifyRelationshipDependence(int id)
        {
        }
    }
}
