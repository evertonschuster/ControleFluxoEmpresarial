using ControleFluxoEmpresarial.DAOs.Movimentos;
using FluentValidation;

namespace ControleFluxoEmpresarial.DTO.Movimentos
{
    public class CancelarContaReceber
    {
        public string Modelo { get; set; }
        public string Serie { get; set; }
        public string Numero { get; set; }
        public int Parcela { get; set; }

        public string Justificativa { get; set; }

        public string Senha { get; set; }

        public ContaReceberId GetId()
        {
            return new ContaReceberId()
            {
                Modelo = this.Modelo,
                Numero = this.Numero,
                Parcela = this.Parcela,
                Serie = this.Serie
            };
        }
    }

    public class CancelarContaReceberValidator : AbstractValidator<CancelarContaReceber>
    {
        public ContaReceberDAO ContaReceberDAO { get; set; }

        public CancelarContaReceberValidator(ContaReceberDAO contaReceberDAO)
        {
            this.ContaReceberDAO = contaReceberDAO;

            RuleFor(e => e.Modelo)
                    .NotEmpty().WithMessage("Informe o modelo.")
                    .MaximumLength(2).WithMessage("Modelo só pode ter 2 caracteres.");

            RuleFor(e => e.Serie)
                    .NotEmpty().WithMessage("Informe a série.")
                    .MaximumLength(2).WithMessage("Série só pode ter 2 caracteres.");

            RuleFor(e => e.Numero)
                    .NotEmpty().WithMessage("Informe o número.")
                    .Must(ExistCondicaoPagamento).WithMessage("Conta a pagar não cadastrada.")
                    .MaximumLength(20).WithMessage("Número só pode ter 2 caracteres.");

            RuleFor(e => e.Parcela)
                    .GreaterThan(0).WithMessage("Parcela deve ser superior a 0.")
                    .NotEmpty().WithMessage("Informe a parcela.");
        }

        private bool ExistCondicaoPagamento(CancelarContaReceber contaReceber, string numero)
        {
            var contaReceberDB = this.ContaReceberDAO.GetByID(contaReceber.GetId());
            return contaReceberDB != null;
        }
      
    }

}