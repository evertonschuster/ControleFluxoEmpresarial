using ControleFluxoEmpresarial.Filters.ModelView;
using ControleFluxoEmpresarial.Models.Cidades;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs.Cidades
{



    public class PaisDAO : DAO<Pais>
    {
        public PaisDAO(ApplicationContext context) : base(context)
        {
        }

        protected override Pais MapEntity(DbDataReader reader)
        {
            var entity = base.MapEntity(reader);

            entity.Id = reader.GetInt32("Id");
            entity.Nome = reader.GetString("Nome");
            entity.DDI = reader.GetString("DDI") ?? null;
            entity.Sigla = reader.GetString("Sigla");

            return entity;
        }

        public override void Delete(int id, bool commit = true)
        {
            var sql = $@"DELETE FROM paises 
                        WHERE Id = {id.ToString()}";

            base.ExecuteScript(sql);
        }

        public override Pais GetByID(int id)
        {
            var sql = $@"SELECT Id, Nome, Sigla, DDI
                          FROM Paises
                        WHERE Id = {id.ToString()}
                    
                        ";

            return base.ExecuteGetFirstOrDefault(sql);
        }


        public override int Insert(Pais entity, bool commit = true)
        {
            try
            {
                var sql = $@"INSERT INTO Paises (Nome, Sigla, DDI)
                         VALUES ('{entity.Nome}','{entity.Sigla}','{entity.DDI}')";

                return base.ExecuteScriptInsert(sql);
            }
            finally
            {
                this.Connection.Close();
            }
        }

        public Pais GetByNome(string nome)
        {
            var sql = $@"SELECT Id, Nome, Sigla, DDI
                          FROM Paises
                        WHERE Nome = '{nome}' 
                        
                        limit 1";

            return base.ExecuteGetFirstOrDefault(sql);
        }

        public override void Update(Pais entity, bool commit = true)
        {
            var sql = $@"UPDATE paises 
                        SET Nome = '{entity.Nome}',
                            Sigla = '{entity.Sigla}',
                            DDI = '{entity.DDI}'
                        WHERE Id = {entity.Id.ToString()}";

            base.ExecuteScript(sql);
        }

        public override PaginationResult<Pais> GetPagined(PaginationQuery filter)
        {
            var sql = $@"SELECT Id, Nome, Sigla, DDI
                          FROM Paises";

            if (!string.IsNullOrEmpty(filter.Filter))
            {
                var sqlId = "";
                int paisId;
                if (Int32.TryParse(filter.Filter, out paisId))
                {
                    sqlId += $" OR id = {paisId} ";
                }
                sql += $" WHERE nome like '%{filter.Filter}%' {sqlId} ";
            }

            return base.ExecuteGetPaginated(sql, filter);
        }
    }
}
