using ControleFluxoEmpresarial.DAOs.Vendas;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DTO.Vendas
{
    public class CancelarVenda
    {
        public string Modelo { get; set; }
        public string Serie { get; set; }
        public string Numero { get; set; }

        public string Justificativa { get; set; }

        public string Senha { get; set; }
    }

    public class VendaValidator : AbstractValidator<CancelarVenda>
    {
        public VendaDAO VendaDAO { get; set; }

        public VendaValidator(VendaDAO VendaDAO)
        {

            this.VendaDAO = VendaDAO;

            RuleFor(e => e.Modelo)
                 .NotEmpty().WithMessage("Informe o modelo.")
                 .MaximumLength(2).WithMessage("Modelo só pode ter 2 caracteres.");

            RuleFor(e => e.Serie)
                .NotEmpty().WithMessage("Informe a série.")
                .MaximumLength(2).WithMessage("Série só pode ter 2 caracteres.");

            RuleFor(e => e.Numero)
                .NotEmpty().WithMessage("Informe o número.")
                .MaximumLength(6).WithMessage("Número só pode ter 6 caracteres.")
                .Must(VerifyId).WithMessage("Venda já cadastrada.");


            RuleFor(e => e.Justificativa)
                .NotEmpty().WithMessage("Informe a justificatica.")
                .MinimumLength(10).WithMessage("A justificatica deve ter mais de 10 caracteres.")
                .MaximumLength(255).WithMessage("A justificatica deve ter no máximo 255 caracteres.");

            RuleFor(e => e.Senha)
                .NotEmpty().WithMessage("Informe a senha");
        }

        private bool VerifyId(CancelarVenda Venda, string numero)
        {
            return this.VendaDAO.GetByID(new VendaId()
            {
                Modelo = Venda.Modelo,
                Numero = Venda.Numero,
                Serie = Venda.Serie
            }) != null;
        }

      
    }
}
