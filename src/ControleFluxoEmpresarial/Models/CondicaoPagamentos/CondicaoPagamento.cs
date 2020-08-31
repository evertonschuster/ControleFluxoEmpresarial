using ControleFluxoEmpresarial.DAOs.CondicaoPagamentoParcelas;
using ControleFluxoEmpresarial.DAOs.CondicaoPagamentos;
using FluentValidation;
using System.Collections.Generic;
using System.Linq;

namespace ControleFluxoEmpresarial.Models.CondicaoPagamentos
{
    public class CondicaoPagamento : BaseModelSituacao
    {
        public string Nome { get; set; }

        public decimal Juro { get; set; }

        public decimal Multa { get; set; }

        public decimal Desconto { get; set; }

        public List<CondicaoPagamentoParcela> Parcela { get; set; }
    }

    public class CondicaoPagamentoValidator : AbstractValidator<CondicaoPagamento>
    {
        public CondicaoPagamentoParcelaDAO CondicaoPagamentoParcelaDAO { get; }
        public CondicaoPagamentoDAO CondicaoPagamentoDAO { get; }
        public FormaPagamentoDAO FormaPagamentoDAO { get; }

        public CondicaoPagamentoValidator(CondicaoPagamentoDAO condicaoPagamentoDAO, FormaPagamentoDAO formaPagamentoDAO, CondicaoPagamentoParcelaDAO condicaoPagamentoParcelaDAO)
        {
            this.CondicaoPagamentoParcelaDAO = condicaoPagamentoParcelaDAO;
            this.CondicaoPagamentoDAO = condicaoPagamentoDAO;
            this.FormaPagamentoDAO = formaPagamentoDAO;

            RuleFor(e => e.Nome)
                .NotEmpty().WithMessage("Nome da Condição de Pagamento não pode ser vazio.")
                .MaximumLength(50).WithMessage("O campo Nome não deve possuir mais de 50 caracteres.");


            RuleFor(e => e.Nome).Must(NameIsAllow).WithMessage("Condição de Pagamento já cadastrada.");
            RuleFor(e => e.Multa)
                .Must(e => e >= 0).WithMessage("Valor da multa não pode ser negativo")
                .Must(e => e <= 100).WithMessage("Valor da multa não pode ser maior que 100%");

            RuleFor(e => e.Juro)
                .Must(e => e >= 0).WithMessage("Valor do juro não pode ser negativo")
                .Must(e => e <= 100).WithMessage("Valor do juro não pode ser maior que 100%");

            RuleFor(e => e.Desconto)
                .Must(e => e >= 0).WithMessage("Valor do desconto não pode ser negativo")
                .Must(e => e <= 100).WithMessage("Valor do desconto não pode ser maior que 100%");

            RuleFor(e => e.Id).Must(ExistsCondicaoPagamento).When(e => e.Id > 0).WithMessage("Forma de Pagamento não cadastrada.");

            RuleFor(e => e.Parcela)
                .Must(e => e.All(a => a.Percentual > 0 && a.Percentual <= 100))
                .WithMessage("Valor percentual da parcela é inválido.")
                .Must(e => e.Sum(a => a.Percentual) == 100)
                .WithMessage((e) => $"Percentual total de parcelas não corresponde a 100% ({e.Parcela.Sum(a => a.Percentual)}).")
                .Must(e =>
                {
                    var dia = 0;
                    return e.All(e =>
                    {
                        var valid = e.NumeroDias >= dia;
                        dia = e.NumeroDias;
                        return valid;
                    });
                }).WithMessage("Os dias devem ser sequenciais.")
                .Must(ee =>
                {
                    return ee.Where(a => a.Id > 0).All(a => ExistsParcela(a.Id));
                }).WithMessage("Parcela não cadastrada.")
                .Must(ee =>
                {
                    return ee.All(a => ExistsFormaPagamento(a, a.FormaPagamentoId));
                }).WithMessage("Forma de Pagamento não cadastrada.")
                .Must(ee => ee.Select(a => a.NumeroDias).Distinct().Count() == ee.Count()).WithMessage("Número de dias repetidos.");

            //dias repetidos

        }

        private bool NameIsAllow(CondicaoPagamento formaPagamento, string nome)
        {
            var findCondicaoPagamento = this.CondicaoPagamentoDAO.GetByNome(nome);
            return findCondicaoPagamento == null || findCondicaoPagamento?.Id == formaPagamento.Id;
        }

        private bool ExistsCondicaoPagamento(int id)
        {
            return this.CondicaoPagamentoDAO.GetByID(id) != null;
        }

        private bool ExistsParcela(int id)
        {
            return this.CondicaoPagamentoParcelaDAO.GetByID(id) != null;
        }

        private bool ExistsFormaPagamento(CondicaoPagamentoParcela parcela, int id)
        {
            var formaDb = this.FormaPagamentoDAO.GetByID(id);
            var parcelaDb = this.CondicaoPagamentoParcelaDAO.GetByID(parcela.Id);
            if (parcela.Id > 0 && formaDb != null && parcela.FormaPagamento.Id == parcelaDb.FormaPagamento.Id)
            {
                return true;
            }

            return formaDb != null && formaDb.Situacao == null;
        }
    }
}
