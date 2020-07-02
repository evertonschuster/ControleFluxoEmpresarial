using ControleFluxoEmpresarial.DAOs.Entities;
using ControleFluxoEmpresarial.DAOs.simple;
using ControleFluxoEmpresarial.Entities;
using ControleFluxoEmpresarial.Models.Pessoas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using ControleFluxoEmpresarial.DAOs.Movimentos;
using ControleFluxoEmpresarial.Architectures.Exceptions;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.Models.Movimentos;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Architectures.Helper;

namespace ControleFluxoEmpresarial.DAOs.Pessoas
{
    public class FuncionarioDAO : DAO<Funcionario>
    {
        public IServiceProvider ServiceProvider { get; set; }
        public FuncionarioServicoDAO FuncionarioServicoDAO { get { return this.ServiceProvider.GetService<FuncionarioServicoDAO>(); } }
        public ServicoDAO ServicoDAO { get { return this.ServiceProvider.GetService<ServicoDAO>(); } }

        public FuncionarioDAO(DataBaseConnection context, IServiceProvider serviceProvider) : base(context, "funcionarios")
        {
            this.ServiceProvider = serviceProvider;
        }

        public override void VerifyRelationshipDependence(int id)
        {
            var sql = @"SELECT 1 FROM FuncionarioServicos
                            WHERE FuncionarioServicos.funcionarioId = @id ";

            if (this.ExecuteExist(sql, new { id }))
            {
                throw new BusinessException(null, "Funcionário não pode ser excluido!");
            }
        }

        internal List<Funcionario> GetInServico(int servicoId)
        {
            var sql = @"SELECT funcionarios.Id, funcionarios.EstadoCivil, funcionarios.Sexo, funcionarios.Nacionalidade, funcionarios.IsBrasileiro, funcionarios.DataNascimento, 
	                    funcionarios.Cnh, funcionarios.DataValidadeCNH, funcionarios.FuncaoFuncionarioId, funcionarios.Salario, funcionarios.DataAdmissao, 
	                    funcionarios.DataDemissao, funcionarios.CidadeId, funcionarios.Apelido, funcionarios.Bairro, funcionarios.Cep, funcionarios.Complemento, 
	                    funcionarios.CPFCPNJ, funcionarios.Email, funcionarios.Endereco, funcionarios.Nome, funcionarios.Numero, funcionarios.Observacao, 
	                    funcionarios.RgInscricaoEstadual, funcionarios.Telefone, funcionarios.DataCriacao, funcionarios.DataAtualizacao,
	
	                    funcaofuncionarios.id as ""FuncaoFuncionario.id"", funcaofuncionarios.nome as ""FuncaoFuncionario.nome"", 
	                    funcaofuncionarios.cargahoraria as ""FuncaoFuncionario.cargahoraria"", funcaofuncionarios.requercnh as ""FuncaoFuncionario.requercnh"", 
	                    funcaofuncionarios.descricao as ""FuncaoFuncionario.descricao"", funcaofuncionarios.observacao as ""FuncaoFuncionario.observacao"", 
	                    funcaofuncionarios.datacriacao as ""FuncaoFuncionario.datacriacao"", funcaofuncionarios.dataatualizacao as ""FuncaoFuncionario.dataatualizacao""
                        FROM Funcionarios
	                        INNER JOIN FuncionarioServicos ON FuncionarioServicos.funcionarioid = Funcionarios.id
                            INNER JOIN funcaofuncionarios ON funcaofuncionarios.id = funcionarios.FuncaoFuncionarioId
                        WHERE FuncionarioServicos.servicoid = @servicoId";

            return this.ExecuteGetAll(sql, new { servicoId });
        }

        internal Funcionario GetByCPFCNPJ(string cpfcpnj)
        {
            var sql = "SELECT * FROM funcionarios WHERE cpfcpnj = @cpfcpnj";

            return this.ExecuteGetFirstOrDefault(sql, new { cpfcpnj });
        }

        public override void Update(Funcionario entity, bool commit = true)
        {
            base.Update(entity, false);
            this.FuncionarioServicoDAO.Transaction = this.Transaction;
            this.ServicoDAO.Transaction = this.Transaction;

            var dbServicoIds = this.ServicoDAO.GetInFuncionario(entity.Id)?.Select(e => e.Id).ToList() ?? Enumerable.Empty<int>();
            var servicoIds = entity.Servicos?.Select(e => e.Id).ToList() ?? Enumerable.Empty<int>();

            var removeServicoIds = dbServicoIds.Except(servicoIds).ToList();
            var insertServicoId = servicoIds.Except(dbServicoIds).ToList();

            foreach (var servicoId in removeServicoIds)
            {
                this.FuncionarioServicoDAO.Delete(new { FuncionarioId = entity.Id, ServicoId = servicoId }, false);
            }

            foreach (var servicoId in insertServicoId)
            {
                this.FuncionarioServicoDAO.Insert(new FuncionarioServico() { FuncionarioId = entity.Id, ServicoId = servicoId }, false);
            }

            try
            {
                this.Transaction.Commit();
            }
            catch
            {
                this.Transaction?.Rollback();
                throw;
            }
        }

        public override Funcionario GetByID(int id)
        {
            var funcionario = base.GetByID(id);
            funcionario.Servicos = this.ServicoDAO.GetInFuncionario(id);

            return funcionario;
        }

        public override int Insert(Funcionario entity, bool commit = true)
        {
            var id = base.Insert(entity, false);
            this.FuncionarioServicoDAO.Transaction = this.Transaction;

            for (int i = 0; i < (entity.Servicos ?? Enumerable.Empty<Servico>()).Count(); i++)
            {
                var funcinarioServico = new FuncionarioServico()
                {
                    FuncionarioId = id,
                    ServicoId = entity.Servicos[i].Id
                };

                this.FuncionarioServicoDAO.Insert(funcinarioServico, false);
            }

            try
            {
                this.Transaction.Commit();
            }
            catch
            {
                this.Transaction?.Rollback();
                throw;
            }

            return id;
        }

        public override (string query, object @params) GetQueryListPagined(PaginationQuery filter)
        {
            var sql = $@" SELECT funcionarios.Id, funcionarios.EstadoCivil, funcionarios.Sexo, funcionarios.Nacionalidade, funcionarios.IsBrasileiro, funcionarios.DataNascimento, 
	                        funcionarios.Cnh, funcionarios.DataValidadeCNH, funcionarios.FuncaoFuncionarioId, funcionarios.Salario, funcionarios.DataAdmissao, 
	                        funcionarios.DataDemissao, funcionarios.CidadeId, funcionarios.Apelido, funcionarios.Bairro, funcionarios.Cep, funcionarios.Complemento, 
	                        funcionarios.CPFCPNJ, funcionarios.Email, funcionarios.Endereco, funcionarios.Nome, funcionarios.Numero, funcionarios.Observacao, 
	                        funcionarios.RgInscricaoEstadual, funcionarios.Telefone, funcionarios.DataCriacao, funcionarios.DataAtualizacao, funcionarios.Situacao,
	
	                        funcaofuncionarios.id as ""FuncaoFuncionario.id"", funcaofuncionarios.nome as ""FuncaoFuncionario.nome"", 
	                        funcaofuncionarios.cargahoraria as ""FuncaoFuncionario.cargahoraria"", funcaofuncionarios.requercnh as ""FuncaoFuncionario.requercnh"", 
	                        funcaofuncionarios.descricao as ""FuncaoFuncionario.descricao"", funcaofuncionarios.observacao as ""FuncaoFuncionario.observacao"", 
	                        funcaofuncionarios.datacriacao as ""FuncaoFuncionario.datacriacao"", funcaofuncionarios.dataatualizacao as ""FuncaoFuncionario.dataatualizacao""
                        FROM funcionarios
                            INNER JOIN funcaofuncionarios ON funcaofuncionarios.id = funcionarios.FuncaoFuncionarioId";

            int? byId = default;
            if (!string.IsNullOrEmpty(filter.Filter))
            {
                var sqlId = "";
                byId = filter.Filter.ConvertValue<int>();

                if (byId != null)
                {
                    sqlId += $" OR {this.TableName}.id = @id ";
                }

                filter.Filter = $"%{filter.Filter.Replace(" ", "%")}%";
                sql += $" WHERE {this.TableName}.Nome ilike @Filter {sqlId} ";
            }

            return (sql, new { id = byId, filter.Filter });
        }
    }

}
