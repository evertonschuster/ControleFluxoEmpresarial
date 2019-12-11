using ControleFluxoEmpresarial.DAOs.Cidades;
using FluentValidation;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Models.Cidades
{
    public class Cidade : BaseEntity
    {
        public string Nome { get; set; }

        public string DDD { get; set; }

        [JsonIgnore]
        public Estado Estado { get; set; }

        public int EstadoId { get; set; }
    }


    public class CidadeValidator : AbstractValidator<Cidade>
    {
        public CidadeDAO CidadeDAO { get; set; }

        public CidadeValidator(CidadeDAO cidadeDAO)
        {
            this.CidadeDAO = cidadeDAO;

            RuleFor(e => e.Nome)
                .NotEmpty().WithMessage("[Nome] da Cidade não pode ser vaziu.")
                .MaximumLength(50).WithMessage("O campo [Nome] não deve possuir mais de 50 caracteres.");

            RuleFor(e => e.DDD)
                .NotEmpty().WithMessage("[DDD] da Cidade não pode ser vaziu.")
                .MaximumLength(5).WithMessage("O campo [DDD] não deve possuir mais de 5 caracteres.");

            RuleFor(e => e.EstadoId)
                .NotEmpty().WithMessage("[EstadoId] da Cidade não pode ser vaziu.");

            RuleFor(e => e.Nome).Must(NameIsAllow).When(e => e.Id == 0).WithMessage("Cidade já cadastrado.");

            RuleFor(e => e.Id).Must(ExistsPais).When(e => e.Id > 0).WithMessage("Cidade não cadastrado.");
        }

        private bool NameIsAllow(string nome)
        {
            return this.CidadeDAO.GetByNome(nome) == null;
        }

        private bool ExistsPais(int id)
        {
            return this.CidadeDAO.GetByID(id) != null;
        }
    }
}
