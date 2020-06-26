using ControleFluxoEmpresarial.DAOs.Movimentos;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Models.Movimentos
{
    public class UnidadeMedida : IBaseModel<string>
    {
        public string Id { get; set; }

        public string Nome { get; set; }

        public DateTime DataCriacao { get; set; }

        public DateTime DataAtualizacao { get; set; }
    }

    public class UnidadeMedidaValidator : AbstractValidator<UnidadeMedida>
    {
        public UnidadeMedidaDAO UnidadeMedidaDAO { get; }

        public UnidadeMedidaValidator(UnidadeMedidaDAO unidadeMedidaDAO)
        {
            this.UnidadeMedidaDAO = unidadeMedidaDAO;

            RuleFor(e => e.Nome)
                .NotEmpty().WithMessage("[Nome] da Unidade Medida  não pode ser vaziu.")
                .MaximumLength(50).WithMessage("O campo [Nome] não deve possuir mais de 50 caracteres.");

            RuleFor(e => e.Id)
                .Transform(e => e.Trim())
                .MaximumLength(3).WithMessage("O Codígo não deve possuir mais de 3 caracteres.")
                .MinimumLength(1).WithMessage("O Codígo deve possuir mais de 1 caracter.");

            RuleFor(e => e.Nome).Must(NameIsAllow).WithMessage("Unidade Medida já cadastrado.");
            RuleFor(e => e.Id).Must(IdIsAllow).WithMessage("Unidade Medida já cadastrado.");
        }

        private bool IdIsAllow(UnidadeMedida unidadeMedida, string id)
        {
            var findUnidadeMedida = this.UnidadeMedidaDAO.GetByID(id);
            return findUnidadeMedida == null || findUnidadeMedida?.Id == id;
        }

        private bool NameIsAllow(UnidadeMedida unidadeMedida, string nome)
        {
            var findUnidadeMedida = this.UnidadeMedidaDAO.GetByNome(nome);
            return findUnidadeMedida == null || findUnidadeMedida?.Id == unidadeMedida.Id;
        }
    }
}
