using ControleFluxoEmpresarial.Filters.ModelView;
using ControleFluxoEmpresarial.Models.Associados;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DAOs.Associados
{
    public class AssociadoDAO : DAO<Associado>
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
                        WHERE Id = {id.ToString()}";

            base.ExecuteScript(sql, commit);
        }

        public override Associado GetByID(int id)
        {
            var sql = $@"SELECT Id, Nome, RG, Telefone, DataNascimento
                          FROM Associados
                        WHERE Id = {id.ToString()}";

            return base.ExecuteGetFirstOrDefault(sql);
        }

        public List<Associado> GetDependentesById(int id, bool closeConnection = true)
        {
            var sql = $@"SELECT Id, Nome, RG, Telefone, DataNascimento
                          FROM Associados
                        WHERE TitularId = {id.ToString()}";

            return base.ExecuteGetAll(sql, closeConnection);
        }

        public int Insert(Associado entity, bool commit = true, int? titularId = null)
        {
            try
            {
                var sql = $@"INSERT INTO Associados (Nome, RG, Telefone, DataNascimento, TitularId)
                         VALUES ('{entity.Nome}','{entity.RG}','{entity.Telefone}','{entity.DataNascimento.ToString()}', {titularId?.ToString() ?? "NULL"})";

                return base.ExecuteScriptInsert(sql, commit);
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
                        SET Nome = '{entity.Nome}',
                            RG = '{entity.RG}',
                            Telefone = '{entity.Telefone}',
                            DataNascimento = '{entity.DataNascimento}'
                        WHERE Id = {entity.Id.ToString()}";

            base.ExecuteScript(sql, commit);
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

            return base.ExecuteGetPaginated(sql, filter);
        }
    }
}
