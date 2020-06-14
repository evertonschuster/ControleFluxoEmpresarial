using ControleFluxoEmpresarial.Filters.ModelView;
using ControleFluxoEmpresarial.Models.Pessoas;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs.Pessoas
{
    public class AssociadoDAO : DAO<Associado, int>
    {
        public AssociadoDAO(ApplicationContext context) : base(context)
        {
        }

        protected override Associado MapEntity(DbDataReader reader)
        {
            var entity = base.MapEntity(reader);

            entity.Id = reader.GetInt32("Id");
            entity.Nome = reader.GetString("Nome");
            entity.RG = reader.GetString("RG");
            entity.Telefone = reader.GetString("Telefone");
            entity.DataNascimento = reader.GetDateTime("DataNascimento");

            return entity;
        }

        public override void Delete(int id, bool commit = true)
        {
            var sql = $@"DELETE FROM Associados 
                        WHERE Id = @id";

            base.ExecuteScript(sql, new { id }, commit);
        }

        public override Associado GetByID(int id)
        {
            var sql = $@"SELECT Id, Nome, RG, Telefone, DataNascimento
                          FROM Associados
                        WHERE Id = @id";

            return base.ExecuteGetFirstOrDefault(sql, new { id });
        }

        public List<Associado> GetDependentesById(int id, bool closeConnection = true)
        {
            var sql = $@"SELECT Id, Nome, RG, Telefone, DataNascimento
                          FROM Associados
                        WHERE TitularId = @id";

            return base.ExecuteGetAll(sql, new { id }, closeConnection);
        }

        public int Insert(Associado entity, bool commit = true, int? titularId = null)
        {
            try
            {
                var sql = $@"INSERT INTO Associados (Nome, RG, Telefone, DataNascimento, TitularId)
                         VALUES (@Nome, @RG, @Telefone, @DataNascimento, @titularId)";

                return base.ExecuteScriptInsert(sql, new { entity.Nome, entity.RG, entity.Telefone, entity.DataNascimento, titularId }, commit);
            }
            finally
            {
                if (commit)
                {
                    this.Connection.Close();
                }
            }
        }

        public override void Update(Associado entity, bool commit = true)
        {
            var sql = $@"UPDATE Associados 
                        SET Nome = @Nome,
                            RG = @RG,
                            Telefone = @Telefone,
                            DataNascimento = @DataNascimento
                        WHERE Id = @Id";

            base.ExecuteScript(sql, new { entity.Nome, entity.RG, entity.Telefone, entity.DataNascimento, entity.Id }, commit);
        }

        public override PaginationResult<Associado> GetPagined(PaginationQuery filter)
        {
            var sql = $@"SELECT Id, Nome, RG, Telefone, DataNascimento
                          FROM Associados";

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

            return base.ExecuteGetPaginated(sql, null, filter);
        }

        public override void VerifyRelationshipDependence(int id)
        {
            throw new NotImplementedException();
        }
    }
}
