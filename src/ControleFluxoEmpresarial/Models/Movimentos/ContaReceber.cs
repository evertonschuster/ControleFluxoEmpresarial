using ControleFluxoEmpresarial.Models.CondicaoPagamentos;
using ControleFluxoEmpresarial.Models.Vendas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
