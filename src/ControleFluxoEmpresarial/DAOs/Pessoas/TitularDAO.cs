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
    public class TitularDAO : DAO<Titular, int>
    {
        public AssociadoDAO AssociadoDAO { get; set; }

        public TitularDAO(ApplicationContext context, AssociadoDAO associadoDAO) : base(context)
        {
            this.AssociadoDAO = associadoDAO;
        }

        protected override Titular MapEntity(DbDataReader reader)
        {
            var entity = base.MapEntity(reader);

            entity.Id = reader.GetInt32("Id");
            entity.CPF = reader.GetString("CPF");
            entity.Email = reader.GetString("Email");
            entity.CEP = reader.GetString("CEP");
            entity.Bairro = reader.GetString("Bairro");
            entity.Endereco = reader.GetString("Endereco");
            entity.Numero = reader.GetString("Numero");

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

            base.ExecuteScript(sql);
        }

        public override Titular GetByID(int id)
        {
            var sql = $@"Select Associados.*, Titulares.CPF, Titulares.Email, Titulares.CEP, Titulares.Bairro, Titulares.Endereco, Titulares.Numero
	                        from Titulares
	                        INNER JOIN Associados ON Associados.id = Titulares.id
                    WHERE Titulares.Id = {id.ToString()}";

            var titular = base.ExecuteGetFirstOrDefault(sql, false);

            this.AssociadoDAO.Transaction = this.Transaction;
            titular.Dependentes = this.AssociadoDAO.GetDependentesById(id);

            return titular;
        }

        public override int Insert(Titular entity, bool commit = true)
        {
            try
            {
                int id = this.AssociadoDAO.Insert(entity, false);
                this.Transaction = this.AssociadoDAO.Transaction;

                foreach (var dependente in entity.Dependentes)
                {
                    this.AssociadoDAO.Insert(dependente, false, id);
                }

                var sql = $@"INSERT INTO Titulares (Id, CPF, Email, CEP, Bairro, Endereco, Numero)
                     VALUES ('{id}','{entity.CPF}','{entity.Email}','{entity.CEP}','{entity.Bairro}','{entity.Email}','{entity.Numero}')";

                return base.ExecuteScriptInsert(sql);
            }
            catch (Exception e)
            {
                base.Transaction.Rollback();
                throw new Exception("Errou", e);
            }
            finally
            {
                this.Connection.Close();
            }
        }

        public override void Update(Titular entity, bool commit = true)
        {
            var dependentesDbIds = this.AssociadoDAO.GetDependentesById(entity.Id)?.Select(e => e.Id).ToList();
            var dependentesNewIds = entity.Dependentes?.Select(e => e.Id).ToList();

            var sql = $@"UPDATE Titulares 
                    SET CPF = '{entity.CPF}',
                        Email = '{entity.Email}',
                        CEP = '{entity.CEP}',
                        Bairro = '{entity.Bairro}',
                        Endereco = '{entity.Endereco}',
                        Numero = '{entity.Numero}'
                    WHERE Id = {entity.Id.ToString()}";

            this.AssociadoDAO.Update(entity, false);

            //update e insert
            foreach (var dependente in entity.Dependentes ?? Enumerable.Empty<Associado>())
            {
                if (dependente.Id == 0)
                    this.AssociadoDAO.Insert(dependente, false, entity.Id);
                else
                    this.AssociadoDAO.Update(dependente, false);
            }

            //remove 
            var removeIds = dependentesDbIds?.Except(dependentesNewIds).ToList();
            foreach (var id in removeIds ?? Enumerable.Empty<int>())
            {
                this.AssociadoDAO.Delete(id, false);
            }

            this.Transaction = this.AssociadoDAO.Transaction;
            base.ExecuteScript(sql);
        }

        public override PaginationResult<Titular> GetPagined(PaginationQuery filter)
        {
            var sql = $@"Select Associados.*, Titulares.CPF, Titulares.Email, Titulares.CEP, Titulares.Bairro, Titulares.Endereco, Titulares.Numero
	                        from Titulares
	                        INNER JOIN Associados ON Associados.id = Titulares.id";

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
