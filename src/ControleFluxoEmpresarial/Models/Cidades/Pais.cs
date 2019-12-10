using ControleFluxoEmpresarial.DAOs.Cidades;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Models.Cidades
{
    public class Pais : BaseEntity
    {
        public string Nome { get; set; }

        public string Sigla { get; set; }

        public string DDI { get; set; }
    }

    public class PaisValidator : AbstractValidator<Pais>
    {
        public PaisDAO PaisDAO { get; set; }

        public PaisValidator(PaisDAO paisDao)
        {
            this.PaisDAO = paisDao;

            RuleFor(e => e.Nome)
                .NotEmpty().WithMessage("[Nome] do pais não pode ser vaziu.")
                .MaximumLength(50).WithMessage("O campo [Nome] não deve possuir mais de 50 caracteres.");

            RuleFor(e => e.Sigla)
                .NotEmpty().WithMessage("[Sigla] do pais não pode ser vaziu.")
                .MaximumLength(5).WithMessage("O campo [Sigla] não deve possuir mais de 5 caracteres.");

            RuleFor(e => e.DDI)
                .NotEmpty().WithMessage("[DDI] do pais não pode ser vaziu.")
                .MaximumLength(5).WithMessage("O campo [DDI] não deve possuir mais de 5 caracteres.");

            RuleFor(e => e.Nome).Must(NameIsAllow).When(e => e.Id == 0).WithMessage("Pais já cadastrado.");

            RuleFor(e => e.Id).Must(ExistsPais).When(e => e.Id > 0).WithMessage("Pais não cadastrado.");
        }

        private bool NameIsAllow(string nome)
        {
            return this.PaisDAO.GetByNome(nome) == null;
        }

        private bool ExistsPais(int id)
        {
            return this.PaisDAO.GetByID(id) != null;
        }
    }
}
