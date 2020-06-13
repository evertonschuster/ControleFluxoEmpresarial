using ControleFluxoEmpresarial.DAOs.Pessoas;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Models.Pessoas
{
    public class Cliente : Pessoa
    {
        public decimal LimiteCredito { get; set; }

        public SexoType? Sexo { get; set; }

        public EstadoCivilType? EstadoCivil { get; set; }

        public TipoPessoaType Tipo { get; set; }
    }


    public class ClienteValidator : AbstractValidator<Cliente>
    {
        public ClienteDAO ClienteDAO { get; }

        public ClienteValidator(ClienteDAO ClienteDAO)
        {
            this.ClienteDAO = ClienteDAO;

            RuleFor(e => e.Nome)
                .NotEmpty().WithMessage("O Cliente não pode ser vaziu.")
                .MaximumLength(60).WithMessage("O Cliente não deve possuir mais de 60 caracteres.")
                .MinimumLength(5).WithMessage("O Cliente deve possuir mais de 5 caracteres.");

            RuleFor(e => e.Bairro)
               .NotEmpty().WithMessage("O Bairro não pode ser vaziu.")
               .MaximumLength(60).WithMessage("O Bairro não deve possuir mais de 60 caracteres.");

            RuleFor(e => e.Cep)
                .NotEmpty().WithMessage("O Cep não pode ser vaziu.")
                .MaximumLength(9).WithMessage("O Cep não deve possuir mais de 9 caracteres.")
                .MinimumLength(8).WithMessage("O Cep deve possuir mais de 8 caracteres.");

            RuleFor(e => e.Complemento)
                .MaximumLength(60).WithMessage("O Complemento não deve possuir mais de 60 caracteres.");

            RuleFor(e => e.Observacao)
                .MaximumLength(255).WithMessage("A Observacoes não deve possuir mais de 255 caracteres.");

            RuleFor(e => e.CPFCPNJ)
                .NotEmpty().WithMessage("O CPF/CNPJ não pode ser vaziu.")
                .MaximumLength(16).WithMessage("O CPF/CNPJ não deve possuir mais de 16 caracteres.")
                .MinimumLength(5).WithMessage("O CPF/CNPJ deve possuir mais de 5 caracteres.");

            RuleFor(e => e.Email)
                .NotEmpty().WithMessage("O Email não pode ser vaziu.")
                .MinimumLength(5).WithMessage("O Email deve possuir mais de 5 caracteres.")
                .MaximumLength(60).WithMessage("O Email não deve possuir mais de 60 caracteres.");

            RuleFor(e => e.DataNascimento)
                .Must(e => e < DateTime.Now.AddDays(-1)).WithMessage("Data de nascimento inválida.")
                .NotEmpty().WithMessage("O Data de nascimento não pode ser vaziu.");

            RuleFor(e => e.Endereco)
                .NotEmpty().WithMessage("O Endereço não pode ser vaziu.")
                .MaximumLength(60).WithMessage("O Endereço não deve possuir mais de 60 caracteres.")
                .MinimumLength(5).WithMessage("O Endereço deve possuir mais de 5 caracteres.");

            RuleFor(e => e.Nacionalidade)
                .NotEmpty().WithMessage("A Nacionalidade não pode ser vaziu.")
                .MinimumLength(5).WithMessage("A Nacionalidade deve possuir mais de 5 caracteres.")
                .MaximumLength(60).WithMessage("A Nacionalidade não deve possuir mais de 60 caracteres.");

            RuleFor(e => e.Numero)
                .NotEmpty().WithMessage("O Número não pode ser vaziu.")
                .MinimumLength(1).WithMessage("O Número deve possuir mais de 1 caracteres.")
                .MaximumLength(10).WithMessage("O Número não deve possuir mais de 10 caracteres.");

            RuleFor(e => e.RgInscricaoEstadual)
                .NotEmpty().WithMessage("O RG não pode ser vaziu.")
                .MinimumLength(5).WithMessage("O RG deve possuir mais de 5 caracteres.")
                .MaximumLength(14).WithMessage("O RG não deve possuir mais de 14 caracteres.");

            RuleFor(e => e.Telefone)
                .NotEmpty().WithMessage("O Telefone não pode ser vaziu.")
                .MinimumLength(5).WithMessage("O Telefone deve possuir mais de 5 caracteres.")
                .MaximumLength(30).WithMessage("O Telefone não deve possuir mais de 30 caracteres.");

            RuleFor(e => e.LimiteCredito)
                .Must(e => e >= 0).WithMessage("O Limite Credito deve ser maior que 0.")
                .Must(e => e < 100000000).WithMessage("O Limite Credito deve ser menor que 100000000.");

            RuleFor(e => e.CPFCPNJ).Must(CPFIsAllow).WithMessage("Cliente já cadastrado.");

        }

        private bool CPFIsAllow(Cliente cliente, string cpf)
        {
            var findCliente = this.ClienteDAO.GetByCPFCNPJ(cpf);
            return findCliente == null || findCliente?.Id == cliente.Id;
        }
    }
}
