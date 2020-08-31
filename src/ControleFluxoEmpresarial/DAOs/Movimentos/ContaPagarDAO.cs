using ControleFluxoEmpresarial.Architectures.Helper;
using ControleFluxoEmpresarial.DAOs.compose;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.DTO.Movimentos;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Movimentos;
using ControleFluxoEmpresarial.Models.Pessoas;
using System;

namespace ControleFluxoEmpresarial.DAOs.Movimentos
{
    public class ContaPagarDAO : DAO<ContaPagar, ContaPagarId>
    {
        public ContaPagarDAO(DataBaseConnection context) : base(context, "ContasPagar", new[] { "Modelo", "Serie", "Numero", "FornecedorId", "Parcela" })
        {
        }

        public override PaginationResult<ContaPagar> GetPagined(PaginationQuery filter)
        {
            var sql = @$"SELECT {this.Property.FormatProperty(e => $"ContasPagar.{e}")}, 
                            {typeof(Fornecedor).Property().FormatProperty(e => $"Fornecedores.{e} as \"Fornecedor.{e}\"")}
                          FROM ContasPagar 
                            INNER JOIN Fornecedores ON Fornecedores.id =  ContasPagar.FornecedorId
                        WHERE 1 = 1";

            if (filter.Situacao == DTO.Filters.SituacaoType.Habilitado)
            {
                sql += " AND ContasPagar.DataCancelamento is null";
            }
            if (filter.Situacao == DTO.Filters.SituacaoType.Desabilitado)
            {
                sql += " AND ContasPagar.DataCancelamento is not null";
            }

            return this.ExecuteGetPaginated(sql, "SELECT  COUNT(*) AS TotalItem FROM ContasPagar", filter, filter);
        }

        public override void VerifyRelationshipDependence(object ids)
        {
            throw new NotImplementedException();
        }
    }
}
