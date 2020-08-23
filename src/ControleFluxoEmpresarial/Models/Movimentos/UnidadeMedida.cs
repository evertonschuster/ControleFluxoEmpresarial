using ControleFluxoEmpresarial.DAOs.Movimentos;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Models.Movimentos
{
    public class UnidadeMedida : IBaseSituacao, IBaseModel<string>, IBaseAuditoria
    {
        public string Id { get; set; }

        public string Nome { get; set; }

        public DateTime DataCriacao { get; set; }

        public DateTime? DataAtualizacao { get; set; }

        public DateTime? Situacao { get; set; }

        public Guid UserCriacao { get; set; }

        public Guid? UserAtualizacao { get; set; }
    }

    public class UnidadeMedidaValidator : AbstractValidator<UnidadeMedida>
    {
        public UnidadeMedidaDAO UnidadeMedidaDAO { get; }

        public UnidadeMedidaValidator(UnidadeMedidaDAO unidadeMedidaDAO)
        {
            this.UnidadeMedidaDAO = unidadeMedidaDAO;

            RuleFor(e => e.Nome)
                .NotEmpty().WithMessage("[Nome] da Unidade Medida não pode ser vazio.")
                .MaximumLength(50).WithMessage("O campo [Nome] não deve possuir mais de 50 caracteres.");

            RuleFor(e => e.Id)
                .Transform(e => e.Trim())
                .MaximumLength(3).WithMessage("O Código não deve possuir mais de 3 caracteres.")
                .MinimumLength(1).WithMessage("O Código deve possuir mais de 1 caracter.");

            RuleFor(e => e.Nome).Must(NameIsAllow).WithMessage("Unidade Medida já cadastrada.");
            RuleFor(e => e.Id).Must(IdIsAllow).WithMessage("Unidade Medida já cadastrada.");
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
