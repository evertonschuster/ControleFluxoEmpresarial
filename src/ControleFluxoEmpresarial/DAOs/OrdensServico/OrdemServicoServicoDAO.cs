using ControleFluxoEmpresarial.DAOs.compose;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.OrdensServico;
using System;
using System.Collections.Generic;

namespace ControleFluxoEmpresarial.DAOs.OrdensServico
{
    public class OrdemServicoServicoId
    {
        public int ServicoId { get; set; }
        public int OrdemServicoId { get; set; }
    }

    public class OrdemServicoServicoDAO : DAO<OrdemServicoServico, OrdemServicoServicoId>
    {
        public OrdemServicoServicoDAO(DataBaseConnection context) : base(context, "OrdemServicoServicos", new[] { "ServicoId", "OrdemServicoId" })
        {
        }

        public override PaginationResult<OrdemServicoServico> GetPagined(IPaginationQuery filter)
        {
            throw new NotImplementedException();
        }

        public override void VerifyRelationshipDependence(object ids)
        {
            throw new NotImplementedException();
        }

        internal List<OrdemServicoServico> GetInOrdemServico(int id)
        {
            var sql = @"SELECT ordemservicoservicos.ordemservicoid, ordemservicoservicos.servicoid, ordemservicoservicos.funcionarioid, ordemservicoservicos.quantidade, ordemservicoservicos.valor,
                            ordemservicoservicos.datacriacao, ordemservicoservicos.dataatualizacao, ordemservicoservicos.usercriacao, ordemservicoservicos.useratualizacao, 

	                        servicos.id as ""servico.id"", servicos.nome as ""servico.nome"", servicos.categoriaid as ""servico.categoriaid"", 
                            servicos.valor as ""servico.valor"", servicos.observacao as ""servico.observacao"", servicos.descricao as ""servico.descricao"",
	                        
	                        funcionarios.id as ""funcionario.id"", funcionarios.nome as ""funcionario.nome"", funcionarios.apelido as ""funcionario.apelido"", 
	                        funcionarios.cpfcpnj as ""funcionario.cpfcpnj"", funcionarios.rginscricaoestadual as ""funcionario.rginscricaoestadual""

                        FROM public.ordemservicoservicos
                            INNER JOIN servicos ON servicos.id = ordemservicoservicos.servicoid
	                        INNER JOIN funcionarios ON funcionarios.id = ordemservicoservicos.funcionarioid
                        WHERE ordemservicoid= @id";

            return ExecuteGetAll(sql, new { id });
        }
    }
}
