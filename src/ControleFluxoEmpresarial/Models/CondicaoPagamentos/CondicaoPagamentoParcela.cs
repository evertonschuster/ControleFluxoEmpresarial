namespace ControleFluxoEmpresarial.Models.CondicaoPagamentos
{
    public class CondicaoPagamentoParcela : BaseModel
    {
        public FormaPagamento FormaPagamento { get; set; }
        public int FormaPagamentoId { get; set; }

        public int NumeroDias { get; set; }

        public decimal Percentual { get; set; }
    }

}
