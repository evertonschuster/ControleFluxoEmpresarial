﻿using ControleFluxoEmpresarial.Architectures.Exceptions;
using ControleFluxoEmpresarial.Architectures.Helper;
using ControleFluxoEmpresarial.DAOs.simple;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Cidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs.Cidades
{
    public class CidadeDAO : DAO<Cidade>
    {
        public EstadoDAO EstadoDAO { get; set; }

        public CidadeDAO(DataBaseConnection context, EstadoDAO estadoDAO) : base(context, "Cidades")
        {
            this.EstadoDAO = estadoDAO;
        }


        internal Cidade GetByNome(string nome)
        {
            var sql = $@"SELECT *
                            FROM Cidades
                         WHERE nome = @nome";

            var entity = base.ExecuteGetFirstOrDefault(sql, new { nome });
            if (entity != null)
            {
                entity.Estado = this.EstadoDAO.GetByID(entity.EstadoId);
            }

            return entity;
        }

        public override void VerifyRelationshipDependence(int id)
        {
            var sql = @"SELECT 1 FROM Clientes
                            WHERE cidadeId = @id 
                        union
                        SELECT 1 FROM Fornecedores
	                        WHERE cidadeId = @id
                        union
                        SELECT 1 FROM Funcionarios

                            WHERE cidadeId = @id";

            if (this.ExecuteExist(sql, new { id }))
            {
                throw new BusinessException(null, "Cidade não pode ser excluida!");
            }
        }

        public override (string query, object @params) GetQueryListPagined(PaginationQuery filter)
        {
            var sql = $@"SELECT Cidades.Id, Cidades.Nome, Cidades.DDD, Cidades.EstadoId,
				        Estados.Id as ""Estado.Id"", Estados.Nome as ""Estado.Nome"", Estados.UF as ""Estado.UF""
                                    FROM Cidades
                        INNER JOIN Estados ON Cidades.EstadoID = Estados.Id";

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
