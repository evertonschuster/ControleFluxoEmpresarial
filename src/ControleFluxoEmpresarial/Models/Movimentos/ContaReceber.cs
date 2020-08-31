using ControleFluxoEmpresarial.Models.CondicaoPagamentos;
using System;

namespace ControleFluxoEmpresarial.Models.Movimentos
{
    public class ContaReceber : BaseModelSituacao
    {
        public decimal Valor { get; set; }

        public string Observacao { get; set; }

        public int FormaPagamentoId { get; set; }
        public FormaPagamento FormaPagamento { get; set; }

        public int ClienteId { get; set; }

        public DateTime DataLancamento { get; set; }

        public DateTime DataVencimento { get; set; }
    }
}
