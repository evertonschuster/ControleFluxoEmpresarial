﻿using ControleFluxoEmpresarial.DAOs.Cidades;
using FluentValidation;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Models.Cidades
{
    public class Cidade : BaseModel
    {
        public string Nome { get; set; }

        public string DDD { get; set; }

        [JsonIgnore]
        public Estado Estado { get; set; }

        public int EstadoId { get; set; }
    }


    public class CidadeValidator : AbstractValidator<Cidade>
    {
        public CidadeDAO CidadeDAO { get; }
        public EstadoDAO EstadoDAO { get; }

        public CidadeValidator(CidadeDAO cidadeDAO, EstadoDAO estadoDAO)
        {
            this.CidadeDAO = cidadeDAO;
            this.EstadoDAO = estadoDAO;

            RuleFor(e => e.Nome)
                .NotEmpty().WithMessage("[Nome] da Cidade não pode ser vazio.")
                .MaximumLength(50).WithMessage("O campo [Nome] não deve possuir mais de 50 caracteres.");

            RuleFor(e => e.DDD)
                .NotEmpty().WithMessage("[DDD] da Cidade não pode ser vazio.")
                .MaximumLength(5).WithMessage("O campo [DDD] não deve possuir mais de 5 caracteres.");

            RuleFor(e => e.EstadoId)
                .NotEmpty().WithMessage("[EstadoId] da Cidade não pode ser vazio.");

            RuleFor(e => e.Nome).Must(NameIsAllow).WithMessage("Cidade já cadastrado.");

            RuleFor(e => e.Id).Must(ExistsCidade).When(e => e.Id > 0).WithMessage("Cidade não cadastrado.");

            RuleFor(e => e.EstadoId).Must(ExistsEstado).WithMessage("Estado não cadastrado");
        }

        private bool NameIsAllow(Cidade cidade, string nome)
        {
            var findCidade = this.CidadeDAO.GetByNome(nome);
            return findCidade == null || findCidade?.Id == cidade.Id;
        }

        private bool ExistsCidade(int id)
        {
            return this.CidadeDAO.GetByID(id) != null;
        }

        private bool ExistsEstado(int id)
        {
            return this.EstadoDAO.GetByID(id) != null;
        }
    }
}
