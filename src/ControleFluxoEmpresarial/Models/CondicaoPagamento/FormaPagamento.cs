using ControleFluxoEmpresarial.DAOs.CondicaoPagamento;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Models.CondicaoPagamento
{
    public class FormaPagamento : BaseEntity
    {
        public string Nome { get; set; }

    }

    public class FormaPagamentoValidator : AbstractValidator<FormaPagamento>
    {
        public FormaPagamentoDAO FormaPagamentoDAO { get; }

        public FormaPagamentoValidator(FormaPagamentoDAO formaPagamentoDAO)
        {
            this.FormaPagamentoDAO = formaPagamentoDAO;

            RuleFor(e => e.Nome)
                .NotEmpty().WithMessage("Nome da Forma de Pagamento não pode ser vaziu.")
                .MaximumLength(50).WithMessage("O campo Nome não deve possuir mais de 50 caracteres.");


            RuleFor(e => e.Nome).Must(NameIsAllow).WithMessage("Forma de Pagamento já cadastrado.");

            RuleFor(e => e.Id).Must(ExistsCidade).When(e => e.Id > 0).WithMessage("Forma de Pagamento não cadastrado.");
        }

        private bool NameIsAllow(FormaPagamento formaPagamento, string nome)
        {
            var findCidade = this.FormaPagamentoDAO.GetByNome(nome);
            return findCidade == null || findCidade?.Id == formaPagamento.Id;
        }

        private bool ExistsCidade(int id)
        {
            return this.FormaPagamentoDAO.GetByID(id) != null;
        }
    }
}
