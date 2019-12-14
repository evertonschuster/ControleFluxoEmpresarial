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
    public class EstadoDAO : DAO<Estado>
    {
        public EstadoDAO(ApplicationContext context, PaisDAO paisDAO) : base(context)
        {
            this.PaisDAO = paisDAO;
        }

        public PaisDAO PaisDAO { get; set; }

        protected override Estado MapEntity(DbDataReader reader)
        {
            var entity = base.MapEntity(reader);

            entity.Id = reader.GetInt32("Id");
            entity.Nome = reader.GetString("Nome");
            entity.UF = reader.GetString("UF") ?? null;
            entity.PaisId = reader.GetInt32("PaisId");

            return entity;
        }

        public override void Delete(int id)
        {
            var sql = $@"DELETE FROM Estados
                        WHERE Id = {id}";

            this.ExecuteScript(sql);
        }

        public override Estado GetByID(int id)
        {
            var sql = $@"SELECT TOP 1 Id, Nome, UF, PaisId
                            FROM Estados
                         WHERE ID = {id}";

            var entity = base.ExecuteGetFirstOrDefault(sql);
            if (entity != null)
            {
                PaisDAO.CreateTransaction(this.Transaction);
                entity.Pais = PaisDAO.GetByID(entity.PaisId);
            }

            return entity;
        }

        internal Estado GetByNome(string nome)
        {
            var sql = $@"SELECT TOP 1 Id, Nome, UF, PaisId
                            FROM Estados
                         WHERE Nome = '{nome}'";

            var entity = base.ExecuteGetFirstOrDefault(sql);
            if (entity != null)
            {
                PaisDAO.CreateTransaction(this.Transaction);
                entity.Pais = PaisDAO.GetByID(entity.PaisId);
            }

            return entity;
        }

        public override PaginationResult<Estado> GetPagined(PaginationQuery filter)
        {
            var sql = $@"SELECT *
                          FROM Estados ";


            if (!string.IsNullOrEmpty(filter.Filter))
            {
                var sqlId = "";
                int estadoId;
                if (Int32.TryParse(filter.Filter, out estadoId))
                {
                    sqlId += $" OR id = {estadoId} ";
                }

                sql += $" WHERE (nome LIKE '%{filter.Filter}%' {sqlId})";
            }

            return base.ExecuteGetPaginated(sql, filter);
        }

        public override int Insert(Estado entity)
        {
            var sql = $@"INSERT INTO Estados(Nome, UF, PaisId)
                            VALUES('{entity.Nome}', '{entity.UF}', {entity.PaisId})";

            return base.ExecuteScriptInsert(sql);
        }

        public override void Update(Estado entity)
        {
            var sql = $@" UPDATE Estados
                        SET Nome = '{entity.Nome}',
                            UF = '{entity.UF}',
		                    PaisId = {entity.PaisId}
                        WHERE ID = {entity.Id} ";

            base.ExecuteScript(sql);
        }
    }
}
