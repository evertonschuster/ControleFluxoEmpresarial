using ControleFluxoEmpresarial.DAOs.Cidades;
using FluentValidation;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Models.Cidades
{
    public class Estado : BaseEntity
    {
        public string Nome { get; set; }

        public string UF { get; set; }

        [JsonIgnore]
        public Pais Pais { get; set; }

        public int PaisId { get; set; }
    }

    public class EstadoValidator : AbstractValidator<Estado>
    {
        public EstadoDAO EstadoDAO { get; set; }
        public PaisDAO PaisDAO { get; set; }

        public EstadoValidator(EstadoDAO estadoDAO, PaisDAO paisDAO)
        {
            this.EstadoDAO = estadoDAO;
            this.PaisDAO = paisDAO;

            RuleFor(e => e.Nome)
                .NotEmpty().WithMessage("[Nome] do Estado não pode ser vaziu.")
                .MaximumLength(50).WithMessage("O campo [Nome] não deve possuir mais de 50 caracteres.");

            RuleFor(e => e.UF)
                .NotEmpty().WithMessage("[UF] do Estado não pode ser vaziu.")
                .MaximumLength(5).WithMessage("O campo [UF] não deve possuir mais de 5 caracteres.");

            RuleFor(e => e.PaisId)
                .NotEmpty().WithMessage("[Pais] do Estado não pode ser vaziu.");

            RuleFor(e => e.Nome).Must(NameIsAllow).When(e => e.Id == 0).WithMessage("Estado já cadastrado.");

            RuleFor(e => e.Id).Must(ExistsEstado).When(e => e.Id > 0).WithMessage("Estado não cadastrado.");

            RuleFor(e => e.PaisId).Must(ExistsPais).WithMessage("Pais não cadastrado");
        }

        private bool NameIsAllow(string nome)
        {
            return this.EstadoDAO.GetByNome(nome) == null;
        }

        private bool ExistsEstado(int id)
        {
            return this.EstadoDAO.GetByID(id) != null;
        }

        private bool ExistsPais(int id)
        {
            return this.PaisDAO.GetByID(id) != null;
        }
    }
}
