﻿using ControleFluxoEmpresarial.DAOs.Cidades;
using FluentValidation;

namespace ControleFluxoEmpresarial.Models.Cidades
{
    public class Pais : BaseModelSituacao
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
                .NotEmpty().WithMessage("[Nome] do país não pode ser vazio.")
                .MaximumLength(50).WithMessage("O campo [Nome] não deve possuir mais de 50 caracteres.");

            RuleFor(e => e.Sigla)
                .NotEmpty().WithMessage("[Sigla] do país não pode ser vazio.")
                .MaximumLength(5).WithMessage("O campo [Sigla] não deve possuir mais de 5 caracteres.");

            RuleFor(e => e.DDI)
                .NotEmpty().WithMessage("[DDI] do país não pode ser vazio.")
                .MaximumLength(5).WithMessage("O campo [DDI] não deve possuir mais de 5 caracteres.");

            RuleFor(e => e.Nome).Must(NameIsAllow).WithMessage("País já cadastrado.");

            RuleFor(e => e.Id).Must(ExistsPais).When(e => e.Id > 0).WithMessage("País não cadastrado.");
        }

        private bool NameIsAllow(Pais pais, string nome)
        {
            var findPais = this.PaisDAO.GetByNome(nome);
            return findPais == null || findPais?.Id == pais.Id;
        }

        private bool ExistsPais(int id)
        {
            return this.PaisDAO.GetByID(id) != null;
        }
    }
}
