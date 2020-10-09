
using ControleFluxoEmpresarial.DAOs.compose;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Vendas;
using System;

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
        public VendaProdutoDAO(DataBaseConnection context) : base(context, "VendaProdutos", new string[] { "Numero", "Serie", "Modelo", "ProdutoId" })
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
    }
}
