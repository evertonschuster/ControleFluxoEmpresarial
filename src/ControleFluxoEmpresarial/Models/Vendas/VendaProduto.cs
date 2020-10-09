using ControleFluxoEmpresarial.Entities;
using ControleFluxoEmpresarial.Models.Movimentos;
using System;

namespace ControleFluxoEmpresarial.Models.Vendas
{
    public class VendaProduto : IBaseAuditoria, IBaseEntity
    {
        public string VendaNumero { get; set; }

        public string VendaSerie { get; set; }

        public string VendaModelo { get; set; }

        public Produto Produto { get; set; }
        public int ProdutoId { get; set; }

        public decimal Quantidade { get; set; }

        public decimal Valor { get; set; }


        public DateTime DataCriacao { get; set; }
        public DateTime? DataAtualizacao { get; set; }
        public string UserCriacao { get; set; }
        public string UserAtualizacao { get; set; }
    }
}
