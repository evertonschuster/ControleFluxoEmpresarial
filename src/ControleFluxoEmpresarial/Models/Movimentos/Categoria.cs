﻿using ControleFluxoEmpresarial.DAOs.Movimentos;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Models.Movimentos
{
    public class Categoria : BaseModelSituacao
    {
        public string Nome { get; set; }
    }


    public class CategoriaValidator : AbstractValidator<Categoria>
    {
        public CategoriaDAO CategoriaDAO { get; }

        public CategoriaValidator(CategoriaDAO CategoriaDAO)
        {
            this.CategoriaDAO = CategoriaDAO;

            RuleFor(e => e.Nome)
                .NotEmpty().WithMessage("Categoria não pode ser vazio.")
                .MaximumLength(50).WithMessage("Categoria não deve possuir mais de 50 caracteres.");

            RuleFor(e => e.Nome).Must(NameIsAllow).WithMessage("Categoria já cadastrado.");

        }

        private bool NameIsAllow(Categoria Categoria, string nome)
        {
            var findCategoria = this.CategoriaDAO.GetByNome(nome);
            return findCategoria == null || findCategoria?.Id == Categoria.Id;
        }

    }
}
