using ControleFluxoEmpresarial.Architectures.Helper;
using ControleFluxoEmpresarial.DAOs.compose;
using ControleFluxoEmpresarial.DataBase;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Vendas;
using System;
using System.Collections.Generic;

namespace ControleFluxoEmpresarial.DAOs.Vendas
{
    public class VendaServicoId
    {
        public string Numero { get; set; }
        public string Serie { get; set; }
        public string Modelo { get; set; }
        public int ServicoId { get; set; }
    }

    public class VendaServicoDAO : DAO<VendaServico, VendaServicoId>
    {
        public VendaServicoDAO(DataBaseConnection context) : base(context, "VendaServicos", new string[] { "VendaNumero", "VendaSerie", "VendaModelo", "ServicoId" })
        {
        }

        public override PaginationResult<VendaServico> GetPagined(IPaginationQuery filter)
        {
            return null;
        }

        public override void VerifyRelationshipDependence(object ids)
        {
        }

        public List<VendaServico> GetInVenda(VendaId vendaId)
        {
            var sql = $@"SELECT {this.PropertiesIds.FormatProperty(e => $"VendaServicos.{e}")}, {this.Property.FormatProperty(e => $"VendaServicos.{e}")} ,
                            servicos.id AS ""servico.id"", servicos.nome AS ""servico.nome"",
                            funcionarios.Id AS ""funcionario.Id"", funcionarios.nome AS ""funcionario.nome""

                        FROM VendaServicos  
                            INNER JOIN public.servicos ON servicos.id = vendaservicos.servicoid
                            INNER JOIN public.funcionarios ON funcionarios.id = vendaservicos.funcionarioid

                        WHERE
                            VendaServicos.vendaNumero = @Numero AND VendaServicos.vendaSerie = @Serie AND VendaServicos.vendaModelo = @Modelo";

            return base.ExecuteGetAll(sql, vendaId);
        }
    }
}
