﻿using ControleFluxoEmpresarial.Architectures.Exceptions;
using ControleFluxoEmpresarial.Architectures.Helper;
using ControleFluxoEmpresarial.DAOs.Entities;
using ControleFluxoEmpresarial.DAOs.Pessoas;
using ControleFluxoEmpresarial.DAOs.simple;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.DTO.Filters;
using ControleFluxoEmpresarial.Entities;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Movimentos;
using ControleFluxoEmpresarial.Models.Pessoas;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ControleFluxoEmpresarial.DAOs.Movimentos
{
    public class ServicoDAO : DAO<Servico>
    {
        public IServiceProvider ServiceProvider { get; set; }
        public FuncionarioServicoDAO FuncionarioServicoDAO { get { return this.ServiceProvider.GetService<FuncionarioServicoDAO>(); } }

        public FuncionarioDAO FuncionarioDAO { get { return this.ServiceProvider.GetService<FuncionarioDAO>(); } }

        public ServicoDAO(DataBaseConnection context, IServiceProvider serviceProvider) : base(context, "Servicos")
        {
            this.ServiceProvider = serviceProvider;
        }

        public override void VerifyRelationshipDependence(int id)
        {
            var sql = @"SELECT 1 FROM FuncionarioServicos
                            WHERE FuncionarioServicos.servicoid = @id ";

            if (this.ExecuteExist(sql, new { id }))
            {
                throw new BusinessRelationshipException(null, "Serviço não pode ser excluido!");
            }
        }

        public override int Insert(Servico entity, bool commit = true)
        {
            var id = base.Insert(entity, false);
            this.FuncionarioServicoDAO.Transaction = this.Transaction;

            for (int i = 0; i < (entity.Funcionarios ?? Enumerable.Empty<Funcionario>()).Count(); i++)
            {
                var funcionarioServico = new FuncionarioServico()
                {
                    FuncionarioId = entity.Funcionarios[i].Id,
                    ServicoId = id
                };

                this.FuncionarioServicoDAO.Insert(funcionarioServico, false);
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

        public override void Update(Servico entity, bool commit = true)
        {
            base.Update(entity, false);
            this.FuncionarioServicoDAO.Transaction = this.Transaction;
            this.FuncionarioDAO.Transaction = this.Transaction;

            var dbFuncionarioIds = this.FuncionarioDAO.GetInServico(entity.Id)?.Select(e => e.Id).ToList() ?? new List<int>();
            var funcionariosIds = entity.Funcionarios?.Select(e => e.Id).ToList() ?? Enumerable.Empty<int>();

            var removeFuncionarioIds = dbFuncionarioIds.Except(funcionariosIds).ToList();
            var insertFuncionarioId = funcionariosIds.Except(dbFuncionarioIds).ToList();

            foreach (var funcionarioId in removeFuncionarioIds)
            {
                this.FuncionarioServicoDAO.Delete((entity.Id, funcionarioId), false);
            }

            foreach (var funcionarioId in insertFuncionarioId)
            {
                this.FuncionarioServicoDAO.Insert(new FuncionarioServico() { FuncionarioId = funcionarioId, ServicoId = entity.Id }, false);
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

        public override Servico GetByID(int id)
        {
            var servico = base.GetByID(id);
            if (servico != null)
            {
                servico.Funcionarios = this.FuncionarioDAO.GetInServico(id);
            }


            return servico;
        }

        internal List<Servico> GetInFuncionario(int funcionarioId)
        {
            var sql = @"SELECT Servicos.Id, Servicos.Nome, Servicos.Valor, Servicos.CategoriaId, Servicos.Descricao, 
                        Servicos.Observacao, Servicos.DataCriacao, Servicos.DataAtualizacao, Servicos.Situacao,
		                categorias.id AS ""categoria.id"", categorias.nome AS ""categoria.nome"", categorias.datacriacao AS ""categoria.datacriacao"", 
		                        categorias.dataatualizacao AS ""categorias.dataatualizacao"", categorias.Situacao AS ""categoria.Situacao""

                FROM Servicos
	                INNER JOIN categorias ON categorias.id = Servicos.CategoriaId
                    INNER JOIN funcionarioservicos ON funcionarioservicos.servicoid = Servicos.id
                WHERE funcionarioservicos.funcionarioid = @funcionarioId";

            return this.ExecuteGetAll(sql, new { funcionarioId });

        }

        public override (string query, object @params) GetQueryListPagined(IPaginationQuery filter)
        {
            var sql = $@" SELECT Servicos.Id, Servicos.Nome, Servicos.Valor, Servicos.CategoriaId, Servicos.Descricao, 
                        Servicos.Observacao, Servicos.DataCriacao, Servicos.DataAtualizacao, Servicos.Situacao,
		                categorias.id AS ""categoria.id"", categorias.nome AS ""categoria.nome"", categorias.datacriacao AS ""categoria.datacriacao"", 
		                        categorias.dataatualizacao AS ""categorias.dataatualizacao"", categorias.Situacao AS ""categoria.Situacao""

                FROM Servicos
	                INNER JOIN categorias ON categorias.id = Servicos.CategoriaId
                WHERE 1=1  ";

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
                sql += $" AND ({this.TableName}.Nome ilike @Filter {sqlId}) ";
            }


            if ((filter as PaginationQuery<SituacaoType?>).Situacao == DTO.Filters.SituacaoType.Habilitado)
            {
                sql += " AND Servicos.situacao is null";
            }
            if ((filter as PaginationQuery<SituacaoType?>).Situacao == DTO.Filters.SituacaoType.Desabilitado)
            {
                sql += " AND Servicos.situacao is not null";
            }

            return (sql, new { id = byId, filter.Filter });
        }
    }
}
