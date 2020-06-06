using ControleFluxoEmpresarial.Architectures.Helper;
using ControleFluxoEmpresarial.Models.Cidades;
using FluentValidation;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Models.Pessoas
{
    public class Client : BaseEntity
    {

        public String Nome { get; set; }

        public String CPF { get; set; }

        public String Telephone { get; set; }

        public String CellPhone { get; set; }

        public String Email { get; set; }

        public String Sexo { get; set; }

        [JsonIgnore]
        public Cidade Cidade { get; set; }

        public int CidadeId { get; set; }

        public String Address { get; set; }

        public String Number { get; set; }

    }


    public class ClientValidator : AbstractValidator<Client>
    {
        public ClientValidator()
        {
            RuleFor(e => e.Nome)
                .MinimumLength(5).WithMessage("Campo nome deve possuir mais de 5 caracteres.")
                .MaximumLength(144).WithMessage("Campo nome deve possuir menos de 144 caracteres.");

            RuleFor(e => e.CPF)
                .Must(e => (Validator.ValidaCNPJ(e) || Validator.ValidaCPF(e))).WithMessage("CPF/CNPJ inválido");

            //RuleFor(e => e.CellPhone)

        }
    }
}
