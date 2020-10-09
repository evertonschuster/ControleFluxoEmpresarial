using ControleFluxoEmpresarial.Entities;
using ControleFluxoEmpresarial.Models.CondicaoPagamentos;
using System;

namespace ControleFluxoEmpresarial.Models.Movimentos
{
    public class ContaReceber : IBaseAuditoria, IBaseEntity
    {
        public string Modelo { get; set; }
        public string Serie { get; set; }
        public string Numero { get; set; }
        public int Parcela { get; set; }
        public int ClienteId { get; set; }

        public decimal Valor { get; set; }
        public decimal? Desconto { get; set; }
        public decimal? Multa { get; set; }
        public decimal? Juro { get; set; }


        public string Descricao { get; set; }

        public int FormaPagamentoId { get; set; }
        public FormaPagamento FormaPagamento { get; set; }


        public DateTime DataVencimento { get; set; }
        public DateTime DataEmissao { get; set; }

        public DateTime? DataCancelamento { get; set; }
        public string UserCancelamento { get; set; }
        public string JustificativaCancelamento { get; set; }

        public DateTime? DataCancelamentoBaixa { get; set; }
        public string UserCancelamentoBaixa { get; set; }
        public string JustificativaCancelamentoBaixa { get; set; }

        public DateTime? DataBaixa { get; set; }
        public DateTime? DataPagamento { get; set; }
        public string UserBaixa { get; set; }
        public decimal? ValorBaixa { get; set; }

        public DateTime DataCriacao { get; set; }
        public string UserCriacao { get; set; }
        public DateTime? DataAtualizacao { get; set; }
        public string UserAtualizacao { get; set; }
    }
}
