using ControleFluxoEmpresarial.Filters.ModelView;
using ControleFluxoEmpresarial.Models.Cidades;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs.Cidades
{
    public class CidadeDAO : DAO<Cidade>
    {
        public CidadeDAO(ApplicationContext context, EstadoDAO estadoDAO) : base(context)
        {
            this.EstadoDAO = estadoDAO;
        }

        public EstadoDAO EstadoDAO { get; set; }


        protected override Cidade MapEntity(DbDataReader reader)
        {
            var entity = base.MapEntity(reader);

            entity.Id = reader.GetInt32("Id");
            entity.Nome = reader.GetString("Nome");
            entity.DDD = reader.GetString("DDD") ?? null;
            entity.EstadoId = reader.GetInt32("EstadoId");

            return entity;
        }

        public override void Delete(int id, bool commit = true)
        {
            var sql = $@"DELETE FROM Cidades
                        WHERE Id = {id}";

            this.ExecuteScript(sql);
        }

        public override Cidade GetByID(int id)
        {
            var sql = $@"SELECT *
                            FROM Cidades
                         WHERE ID = {id}";

            var entity = base.ExecuteGetFirstOrDefault(sql);
            if (entity != null)
            {
                this.EstadoDAO.CreateTransaction(this.Transaction);
                entity.Estado = this.EstadoDAO.GetByID(entity.EstadoId);
            }

            return entity;
        }

        public override PaginationResult<Cidade> GetPagined(PaginationQuery filter)
        {
            var sql = $@"SELECT *
                          FROM Cidades";

            if (!string.IsNullOrEmpty(filter.Filter))
            {
                var sqlId = "";
                int cidadeId;
                if (Int32.TryParse(filter.Filter, out cidadeId))
                {
                    sqlId += $" OR id = {cidadeId} ";
                }
                sql += $" WHERE nome like '%{filter.Filter}%' {sqlId} ";
            }

            return base.ExecuteGetPaginated(sql, filter);
        }

        internal Cidade GetByNome(string nome)
        {
            var sql = $@"SELECT *
                            FROM Cidades
                         WHERE nome = '{nome}'";

            var entity = base.ExecuteGetFirstOrDefault(sql);
            if (entity != null)
            {
                this.EstadoDAO.CreateTransaction(this.Transaction);
                entity.Estado = this.EstadoDAO.GetByID(entity.EstadoId);
            }

            return entity;
        }

        public override int Insert(Cidade entity, bool commit = true)
        {
            var sql = $@"INSERT INTO Cidades(Nome, DDD, EstadoId)
                            VALUES('{entity.Nome}', '{entity.DDD}', {entity.EstadoId})";

            return base.ExecuteScriptInsert(sql);
        }

        public override void Update(Cidade entity, bool commit = true)
        {
            var sql = $@" UPDATE Cidades
                        SET Nome = '{entity.Nome}',
                            DDD = '{entity.DDD}',
		                    EstadoId = {entity.EstadoId}
                        WHERE ID = {entity.Id} ";

            base.ExecuteScript(sql);
        }
    }
}
