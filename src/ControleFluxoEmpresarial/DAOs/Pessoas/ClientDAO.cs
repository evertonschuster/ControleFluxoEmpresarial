using ControleFluxoEmpresarial.DAOs.Cidades;
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
    public class ClientDAO : DAO<Client>
    {
        public CidadeDAOReflection CidadeDAO { get; set; }

        public ClientDAO(ApplicationContext context, CidadeDAOReflection cidadeDAO) : base(context)
        {
            this.CidadeDAO = cidadeDAO;
        }

        protected override Client MapEntity(DbDataReader reader)
        {
            var entity = base.MapEntity(reader);

            entity.Id = reader.GetInt32("Id");
            entity.Nome = reader.GetString("Nome");
            entity.CPF = reader.GetString("CPF");
            entity.Telephone = reader.GetString("Telephone");
            entity.CellPhone = reader.GetString("CellPhone");
            entity.Email = reader.GetString("Email");
            entity.CidadeId = reader.GetInt32("CidadeId");
            //entity.Id = reader.GetString("Id");

            return entity;
        }

        public override void Delete(int id, bool commit = true)
        {
            var sql = $@"DELETE Clients 
                        WHERE Id = {id.ToString()}";

            base.ExecuteScript(sql);
        }

        public override Client GetByID(int id)
        {
            var sql = $@"SELECT *
                          FROM Clients
                        WHERE Id = {id.ToString()}";

            var client = base.ExecuteGetFirstOrDefault(sql);
            client.Cidade = CidadeDAO.GetByID(client.CidadeId);

            return client;
        }


        public override int Insert(Client entity, bool commit = true)
        {
            try
            {
                var sql = $@"INSERT INTO Clients ( Nome, CPF, Telephone, CellPhone, Email, CidadeId)
                         VALUES ('{entity.Nome}','{entity.CPF}','{entity.Telephone}','{entity.CellPhone}','{entity.Email}',{entity.CidadeId})";

                return base.ExecuteScriptInsert(sql);
            }
            finally
            {
                this.Connection.Close();
            }
        }

        public Client GetByNome(string nome)
        {
            var sql = $@"SELECT *
                          FROM Clients
                        WHERE Nome = '{nome}' ";

            return base.ExecuteGetFirstOrDefault(sql);
        }

        public override void Update(Client entity, bool commit = true)
        {
            var sql = $@"UPDATE FROM clients 
                        SET Nome = '{entity.Nome}',
                            CPF = '{entity.CPF}',
                            Telephone = '{entity.Telephone}',
                            CellPhone = '{entity.CellPhone}',
                            Email = '{entity.Email}',
                            CidadeId = {entity.CidadeId}
                        WHERE Id = {entity.Id.ToString()}";

            base.ExecuteScript(sql);

        }

        public override PaginationResult<Client> GetPagined(PaginationQuery filter)
        {
            var sql = $@"SELECT *
                          FROM Clients";

            if (!string.IsNullOrEmpty(filter.Filter))
            {
                var sqlId = "";
                int clientId;
                if (Int32.TryParse(filter.Filter, out clientId))
                {
                    sqlId += $" OR id = {clientId} ";
                }
                sql += $" WHERE nome like '%{filter.Filter}%' {sqlId} ";
            }

            return base.ExecuteGetPaginated(sql, filter);
        }
    }
}
