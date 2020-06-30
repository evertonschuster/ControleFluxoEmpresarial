﻿using ControleFluxoEmpresarial.DAOs.Cidades;
using ControleFluxoEmpresarial.DAOs.CondicaoPagamentos;
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
        public bool IsBrasileiro { get; set; }

        public DateTime? DataNascimento { get; set; }

        public decimal LimiteCredito { get; set; }

        public EstadoCivilType? EstadoCivil { get; set; }

        public SexoType? Sexo { get; set; }

        public string Nacionalidade { get; set; }

        public TipoPessoaType Tipo { get; set; }

        public int CondicaoPagamentoId { get; set; }

    }


    public class ClienteValidator : AbstractValidator<Cliente>
    {
        public ClienteDAO ClienteDAO { get; }
        public CidadeDAO CidadeDAO { get; }
        public CondicaoPagamentoDAO CondicaoPagamentoDAO { get; }

        public ClienteValidator(ClienteDAO ClienteDAO, CidadeDAO cidadeDAO, CondicaoPagamentoDAO condicaoPagamentoDAO)
        {
            this.CidadeDAO = cidadeDAO;
            this.ClienteDAO = ClienteDAO;
            this.CondicaoPagamentoDAO = condicaoPagamentoDAO;

            RuleFor(e => e.Nome)
                .NotEmpty().WithMessage("O Cliente não pode ser vazio.")
                .MaximumLength(60).WithMessage("O Cliente não deve possuir mais de 60 caracteres.")
                .MinimumLength(5).WithMessage("O Cliente deve possuir mais de 5 caracteres.");

            RuleFor(e => e.Apelido)
                .MaximumLength(60).WithMessage("O Cliente não deve possuir mais de 60 caracteres.");


            RuleFor(e => e.Bairro)
               .NotEmpty().WithMessage("O Bairro não pode ser vazio.")
               .MaximumLength(60).WithMessage("O Bairro não deve possuir mais de 60 caracteres.");

            RuleFor(e => e.Cep)
                .NotEmpty().WithMessage("O Cep não pode ser vazio.")
                .MaximumLength(9).WithMessage("O Cep não deve possuir mais de 9 caracteres.")
                .MinimumLength(8).WithMessage("O Cep deve possuir mais de 8 caracteres.");

            RuleFor(e => e.Complemento)
                .MaximumLength(60).WithMessage("O Complemento não deve possuir mais de 60 caracteres.");

            RuleFor(e => e.Observacao)
                .MaximumLength(255).WithMessage("A Observacoes não deve possuir mais de 255 caracteres.");


            When(e => e.Nacionalidade.ToLower() == "brasileiro", () =>
            {
                RuleFor(e => e.CPFCPNJ)
                    .MaximumLength(18).WithMessage("O CPF/CNPJ não deve possuir mais de 18 caracteres.")
                    .MinimumLength(5).WithMessage("O CPF/CNPJ deve possuir mais de 5 caracteres.");
            });

            RuleFor(e => e.Email)
                .NotEmpty().WithMessage("O Email não pode ser vazio.")
                .MinimumLength(5).WithMessage("O Email deve possuir mais de 5 caracteres.")
                .MaximumLength(60).WithMessage("O Email não deve possuir mais de 60 caracteres.");

            RuleFor(e => e.DataNascimento)
                .Must(e => e == null || e < DateTime.Now.AddYears(-14)).WithMessage("Data de nascimento inválida, deve ter ao menos 14 anos.");

            RuleFor(e => e.Endereco)
                .NotEmpty().WithMessage("O Endereço não pode ser vazio.")
                .MaximumLength(60).WithMessage("O Endereço não deve possuir mais de 60 caracteres.")
                .MinimumLength(5).WithMessage("O Endereço deve possuir mais de 5 caracteres.");

            RuleFor(e => e.Nacionalidade)
                .MinimumLength(5).WithMessage("A Nacionalidade deve possuir mais de 5 caracteres.")
                .MaximumLength(60).WithMessage("A Nacionalidade não deve possuir mais de 60 caracteres.");

            RuleFor(e => e.Numero)
                .NotEmpty().WithMessage("O Número não pode ser vazio.")
                .MinimumLength(1).WithMessage("O Número deve possuir mais de 1 caracteres.")
                .MaximumLength(10).WithMessage("O Número não deve possuir mais de 10 caracteres.");

            RuleFor(e => e.RgInscricaoEstadual)
                .MinimumLength(5).WithMessage("O RG deve possuir mais de 5 caracteres.")
                .MaximumLength(19).WithMessage("O RG não deve possuir mais de 19 caracteres.");

            RuleFor(e => e.Telefone)
                .NotEmpty().WithMessage("O Telefone não pode ser vazio.")
                .MinimumLength(5).WithMessage("O Telefone deve possuir mais de 5 caracteres.")
                .MaximumLength(30).WithMessage("O Telefone não deve possuir mais de 30 caracteres.");

            RuleFor(e => e.LimiteCredito)
                .Must(e => e >= 0).WithMessage("O Limite Credito deve ser maior que 0.")
                .Must(e => e < 100000000).WithMessage("O Limite Credito deve ser menor que 100000000.");

            RuleFor(e => e.CPFCPNJ)
                .Must(CPFIsAllow).OverridePropertyName("cpfcpnj").WithMessage("Cliente já cadastrado.");

            RuleFor(e => e.CidadeId).Must(ExistCidade).WithMessage("Cidade não cadastrada.");

            RuleFor(e => e.CondicaoPagamentoId).Must(ExistCondicaoPagamento).WithMessage("Condição de Pagamento não cadastrada.");
        }

        private bool CPFIsAllow(Cliente cliente, string cpf)
        {
            var findCliente = this.ClienteDAO.GetByCPFCNPJ(cpf);
            return findCliente == null || findCliente?.Id == cliente.Id;
        }

        private bool ExistCidade(int id)
        {
            return this.CidadeDAO.GetByID(id) != null;
        }

        private bool ExistCondicaoPagamento(int id)
        {
            return this.CondicaoPagamentoDAO.GetByID(id) != null;
        }
    }
}
