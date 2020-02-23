using ControleFluxoEmpresarial.DAOs.CondicaoPagamentoParcelas;
using ControleFluxoEmpresarial.DAOs.CondicaoPagamentos;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Models.CondicaoPagamentos
{
    public class CondicaoPagamento : BaseEntity
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
                .NotEmpty().WithMessage("Nome da Condição de Pagamento não pode ser vaziu.")
                .MaximumLength(50).WithMessage("O campo Nome não deve possuir mais de 50 caracteres.");


            RuleFor(e => e.Nome).Must(NameIsAllow).WithMessage("Condição de Pagamento já cadastrado.");
            RuleFor(e => e.Multa)
                .Must(e => e >= 0).WithMessage("Valor da multa não pode ser negativo")
                .Must(e => e <= 100).WithMessage("Valor da multa não pode ser maior que 100%");

            RuleFor(e => e.Juro)
                .Must(e => e >= 0).WithMessage("Valor do juro não pode ser negativo")
                .Must(e => e <= 100).WithMessage("Valor do juro não pode ser maior que 100%");

            RuleFor(e => e.Desconto)
                .Must(e => e >= 0).WithMessage("Valor do desconto não pode ser negativo")
                .Must(e => e <= 100).WithMessage("Valor do desconto não pode ser maior que 100%");

            RuleFor(e => e.Id).Must(ExistsCondicaoPagamento).When(e => e.Id > 0).WithMessage("Forma de Pagamento não cadastrado.");

            RuleFor(e => e.Parcela)
                .Must(e =>
                {
                    var total = e.Sum(a => a.Percentual);
                    return total >= 99.99m && total <= 100.1m;
                })
                .WithMessage((e) => $"Percentual total de parcelas não corresponde a 100% ({e.Parcela.Sum(a => a.Percentual)}).");

            RuleFor(e => e.Parcela)
                .Must(e =>
                {
                    var dia = 0;
                    return e.All(e =>
                    {
                        var valid = e.NumeroDias >= dia;
                        dia = e.NumeroDias;
                        return valid;
                    });
                }).WithMessage("Os dias devem ser sequênciais.");

            RuleFor(e => e.Parcela).Must(ee =>
            {
                return ee.Where(a => a.Id > 0).All(a => ExistsParcela(a.Id));
            }).WithMessage("Parcela não cadastrado.");

            RuleFor(e => e.Parcela).Must(ee =>
            {
                return ee.All(a => ExistsFormaPagamento(a.FormaPagamento.Id));
            }).WithMessage("Forma de Pagamento não cadastrado.");

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

        private bool ExistsFormaPagamento(int id)
        {
            return this.FormaPagamentoDAO.GetByID(id) != null;
        }
    }
}
