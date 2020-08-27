using ControleFluxoEmpresarial.Models.Movimentos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Models.Vendas
{
    public class VendaProdutos : IBaseAuditoria
    {
        public Venda Venda { get; set; }

        public int VendaNumero { get; set; }

        public int VendaSerie { get; set; }

        public int VendaModelo { get; set; }

        public Produto Produto { get; set; }
        public int ProdutoId { get; set; }

        public int Quantidade { get; set; }

        public decimal Valor { get; set; }

        public decimal Desconto { get; set; }

        public decimal Acrescimo { get; set; }


        public DateTime DataCriacao { get; set; }
        public DateTime? DataAtualizacao { get; set; }
        public string UserCriacao { get; set; }
        public string? UserAtualizacao { get; set; }
    }
}
