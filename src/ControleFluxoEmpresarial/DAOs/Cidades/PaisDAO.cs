//using ControleFluxoEmpresarial.Filters.ModelView;
//using ControleFluxoEmpresarial.Models.Cidades;
//using Microsoft.Data.SqlClient;
//using Microsoft.EntityFrameworkCore;
//using System;
//using System.Collections.Generic;
//using System.Data;
//using System.Data.Common;
//using System.Linq;
//using System.Threading.Tasks;

//namespace ControleFluxoEmpresarial.DAOs.Cidades
//{



//    public class PaisDAO : DAO<Pais>
//    {
//        public PaisDAO(ApplicationContext context) : base(context)
//        {
//        }

//        protected override Pais MapEntity(DbDataReader reader)
//        {
//            var entity = base.MapEntity(reader);

//            entity.Id = reader.GetInt32("Id");
//            entity.Nome = reader.GetString("Nome");
//            entity.DDI = reader.GetString("DDI") ?? null;
//            entity.Sigla = reader.GetString("Sigla");

//            return entity;
//        }

//        public override void Delete(int id, bool commit = true)
//        {
//            var sql = $@"DELETE FROM paises 
//                        WHERE Id = @id";

//            base.ExecuteScript(sql, new { id });
//        }

//        public override Pais GetByID(int id)
//        {
//            var sql = $@"SELECT Id, Nome, Sigla, DDI
//                          FROM Paises
//                        WHERE Id = @id";

//            return base.ExecuteGetFirstOrDefault(sql, parameters: new { id });
//        }


//        public override int Insert(Pais entity, bool commit = true)
//        {
//            try
//            {
//                var sql = $@"INSERT INTO Paises (Nome, Sigla, DDI)
//                         VALUES (@Nome, @Sigla, @DDI)";

//                return base.ExecuteScriptInsert(sql, new { entity.Nome, entity.Sigla, entity.DDI });
//            }
//            finally
//            {
//                this.Connection.Close();
//            }
//        }

//        public Pais GetByNome(string nome)
//        {

//            var sql = $@"SELECT Id, Nome, Sigla, DDI
//                          FROM Paises
//                        WHERE Nome = @nome ";

//            return base.ExecuteGetFirstOrDefault(sql, new { nome });
//        }

//        public override void Update(Pais entity, bool commit = true)
//        {
//            var sql = $@"UPDATE paises 
//                        SET Nome = @Nome ,
//                            Sigla = @Sigla ,
//                            DDI = @DDI
//                        WHERE Id = @Id";

//            base.ExecuteScript(sql, new { entity.Nome, entity.Sigla, entity.DDI, entity.Id });
//        }

//        public override PaginationResult<Pais> GetPagined(PaginationQuery filter)
//        {
//            var sql = $@"SELECT Id, Nome, Sigla, DDI
//                          FROM Paises";

//            int paisId = 0;
//            if (!string.IsNullOrEmpty(filter.Filter))
//            {
//                var sqlId = "";
//                if (Int32.TryParse(filter.Filter, out paisId))
//                {
//                    sqlId += $" OR id = @id ";
//                }
//                filter.Filter = $"%{filter.Filter}%";
//                sql += $" WHERE nome like @Filter {sqlId} ";
//            }

//            return base.ExecuteGetPaginated(sql, new { id = paisId, filter.Filter }, filter);
//        }
//    }
//}
