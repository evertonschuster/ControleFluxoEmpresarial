﻿using ControleFluxoEmpresarial.DAOs.Movimentos;
using FluentValidation;

namespace ControleFluxoEmpresarial.Models.Movimentos
{
    public class Marca : BaseModelSituacao
    {
        public string Nome { get; set; }
    }



    public class MarcaValidator : AbstractValidator<Marca>
    {
        public MarcaDAO MarcaDAO { get; }

        public MarcaValidator(MarcaDAO marcaDAO)
        {
            this.MarcaDAO = marcaDAO;

            RuleFor(e => e.Nome)
                .NotEmpty().WithMessage("[Nome] da Marca não pode ser vazio.")
                .MaximumLength(50).WithMessage("O campo [Nome] não deve possuir mais de 50 caracteres.");

            RuleFor(e => e.Nome).Must(NameIsAllow).WithMessage("Marca já cadastrada.");

        }

        private bool NameIsAllow(Marca cidade, string nome)
        {
            var findMarca = this.MarcaDAO.GetByNome(nome);
            return findMarca == null || findMarca?.Id == cidade.Id;
        }
    }
}
