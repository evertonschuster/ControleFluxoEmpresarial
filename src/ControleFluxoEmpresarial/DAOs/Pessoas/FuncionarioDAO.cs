using ControleFluxoEmpresarial.Models.Pessoas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs.Pessoas
{
    public class FuncionarioDAO : DAOReflection<Funcionario>
    {
        protected override string SqlListPagined { get; set; } = @"
                    SELECT funcionarios.Id, funcionarios.EstadoCivil, funcionarios.Sexo, funcionarios.Nacionalidade, funcionarios.IsBrasileiro, funcionarios.DataNascimento, 
	                    funcionarios.Cnh, funcionarios.DataValidadeCNH, funcionarios.FuncaoFuncionarioId, funcionarios.Salario, funcionarios.DataAdmissao, 
	                    funcionarios.DataDemissao, funcionarios.CidadeId, funcionarios.Apelido, funcionarios.Bairro, funcionarios.Cep, funcionarios.Complemento, 
	                    funcionarios.CPFCPNJ, funcionarios.Email, funcionarios.Endereco, funcionarios.Nome, funcionarios.Numero, funcionarios.Observacao, 
	                    funcionarios.RgInscricaoEstadual, funcionarios.Telefone, funcionarios.DataCriacao, funcionarios.DataAtualizacao,
	
	                    funcaofuncionarios.id as ""FuncaoFuncionario.id"", funcaofuncionarios.nome as ""FuncaoFuncionario.nome"", 
	                    funcaofuncionarios.cargahoraria as ""FuncaoFuncionario.cargahoraria"", funcaofuncionarios.requercnh as ""FuncaoFuncionario.requercnh"", 
	                    funcaofuncionarios.descricao as ""FuncaoFuncionario.descricao"", funcaofuncionarios.observacao as ""FuncaoFuncionario.observacao"", 
	                    funcaofuncionarios.datacriacao as ""FuncaoFuncionario.datacriacao"", funcaofuncionarios.dataatualizacao as ""FuncaoFuncionario.dataatualizacao""
                    FROM funcionarios
                        INNER JOIN funcaofuncionarios ON funcaofuncionarios.id = funcionarios.FuncaoFuncionarioId";

        public FuncionarioDAO(ApplicationContext context) : base(context, "funcionarios")
        {
        }

        public override void VerifyRelationshipDependence(int id)
        {
        }

        internal Funcionario GetByCPFCNPJ(string cpf)
        {
            return null;
        }
    }
}
