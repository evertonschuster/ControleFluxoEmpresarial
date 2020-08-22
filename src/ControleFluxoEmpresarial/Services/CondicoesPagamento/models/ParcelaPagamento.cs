using ControleFluxoEmpresarial.Models.CondicaoPagamentos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Services.CondicoesPagamento.models
{
    public class ParcelaPagamento
    {
        public int NumeroParcela { get; set; }

        public decimal Valor { get; set; }
        public decimal Desconto { get; set; }
        public decimal ValorTotal { get; set; }

        public int FormaPagamentoId { get; set; }
        public FormaPagamento FormaPagamento { get; set; }

        public DateTime DataVencimento { get; set; }
    }
}
