using ControleFluxoEmpresarial.DAOs.compose;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Vendas;
using System;
using System.Collections.Generic;

namespace ControleFluxoEmpresarial.DAOs.Vendas
{
    public class VendaId
    {
        public string Numero { get; set; }
        public string Serie { get; set; }
        public string Modelo { get; set; }
    }

    public class VendaDAO : DAO<Venda, VendaId>
    {
        public VendaDAO(DataBaseConnection context) : base(context, "Vendas", new string[] { "Numero", "Serie", "Modelo" })
        {
        }

        public override PaginationResult<Venda> GetPagined(IPaginationQuery filter)
        {
            throw new NotImplementedException();
        }

        public override void VerifyRelationshipDependence(object ids)
        {
            throw new NotImplementedException();
        }

        public string GetNumeroByOS(int OSId)
        {
            var sql = @"SELECT * 
                        FROM Vendas
                        WHERE ordemservicoid = @OSId";

            return this.ExecuteGetFirstOrDefault(sql, new { OSId })?.Numero;
        }

        public string GetNewNumero()
        {
            var sql = @"SELECT *
                        FROM Vendas
                        ORDER BY Numero::int DESC";

            var entity = this.ExecuteGetFirstOrDefault(sql);
            var numero = Int64.Parse(entity?.Numero ?? "0") + 1;


            //Precisa ver se não existe uma conta a receber com este numero lançada manualmente
            var sqlContaReceber = @"SELECT 1 FROM contasreceber
                                    WHERE	contasreceber.numero = @numero
                                    LIMIT 1";

            while (this.ExecuteExist(sqlContaReceber, new { numero }))
            {
                numero++;
            }

            return numero.ToString();
        }

        public List<Venda> GetByOSID(int OSId)
        {
            var sql = @"SELECT * 
                        FROM Vendas
                        WHERE ordemservicoid = @OSId";

            return base.ExecuteGetAll(sql, new { OSId });
        }
    }
}
