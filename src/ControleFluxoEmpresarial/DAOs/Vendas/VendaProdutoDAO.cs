
using ControleFluxoEmpresarial.DAOs.compose;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Vendas;
using System;
using System.Collections.Generic;

namespace ControleFluxoEmpresarial.DAOs.Vendas
{
    public class VendaProdutoId
    {
        public string Numero { get; set; }
        public string Serie { get; set; }
        public string Modelo { get; set; }
        public int ProdutoId { get; set; }
    }

    public class VendaProdutoDAO : DAO<VendaProduto, VendaProdutoId>
    {
        public VendaProdutoDAO(DataBaseConnection context) : base(context, "VendaProdutos", new string[] { "VendaNumero", "VendaSerie", "VendaModelo", "ProdutoId" })
        {
        }

        public override PaginationResult<VendaProduto> GetPagined(IPaginationQuery filter)
        {
            throw new NotImplementedException();
        }

        public override void VerifyRelationshipDependence(object ids)
        {
            throw new NotImplementedException();
        }

        public List<VendaProduto> GetInVenda(VendaId vendaId)
        {
            var sql = @$"SELECT * 
                            FROM VendaProdutos 
                        WHERE 
                            VendaNumero= @Numero AND VendaSerie= @Serie AND VendaModelo= @Serie ";

            return base.ExecuteGetAll(sql, vendaId);
        }
    }
}
