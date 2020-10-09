using ControleFluxoEmpresarial.Architectures.Helper;
using ControleFluxoEmpresarial.DAOs.compose;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.DTO.Movimentos;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Movimentos;
using System;
using System.Collections.Generic;

namespace ControleFluxoEmpresarial.DAOs.Movimentos
{
    public class ContasReceberDAO : DAO<ContaReceber, ContaReceberId>
    {
        public ContasReceberDAO(DataBaseConnection context) : base(context, "ContasReceber", new[] { "Modelo", "Serie", "Numero", "Parcela" })
        {
        }

        public override PaginationResult<ContaReceber> GetPagined(IPaginationQuery filter)
        {
            throw new NotImplementedException();
        }

        public override void VerifyRelationshipDependence(object ids)
        {
            throw new NotImplementedException();
        }

        public List<ContaReceber> GetByOSID(int id)
        {
            var sql = $@"SELECT {this.Property.FormatProperty(e => $"ContasReceber.{e}")},
                            formapagamentos.id as ""formapagamento.id"", formapagamentos.nome as ""formapagamento.nome""

                        FROM contasreceber
	                        INNER JOIN vendas ON vendas.Modelo = contasreceber.Modelo AND vendas.Serie = contasreceber.Serie AND vendas.Numero = contasreceber.Numero
                            INNER JOIN formapagamentos ON formapagamentos.id = contasreceber.formapagamentoid

                        WHERE vendas.ordemservicoid = @id";

            return base.ExecuteGetAll(sql, new { id });
        }
    }
}
