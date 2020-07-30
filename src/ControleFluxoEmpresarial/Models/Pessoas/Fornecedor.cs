using ControleFluxoEmpresarial.DAOs.Cidades;
using ControleFluxoEmpresarial.DAOs.CondicaoPagamentos;
using ControleFluxoEmpresarial.DAOs.Pessoas;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Models.Pessoas
{
    public class Fornecedor : Pessoa
    {
        public TipoPessoaType Tipo { get; set; }

        public string Contato { get; set; }

        public decimal LimiteCredito { get; set; }

        public int CondicaoPagamentoId { get; set; }

    }


    public class FornecedorValidator : AbstractValidator<Fornecedor>
    {
        public FornecedorDAO FornecedorDAO { get; }
        public CidadeDAO CidadeDAO { get; }
        public CondicaoPagamentoDAO CondicaoPagamentoDAO { get; }


        public FornecedorValidator(FornecedorDAO fornecedorDAO, CidadeDAO cidadeDAO, CondicaoPagamentoDAO condicaoPagamentoDAO)
        {

            this.CidadeDAO = cidadeDAO;
            this.FornecedorDAO = fornecedorDAO;
            this.CondicaoPagamentoDAO = condicaoPagamentoDAO;

            RuleFor(e => e.Nome)
                .NotEmpty().WithMessage("O Fornecedor não pode ser vazio.")
                .MaximumLength(60).WithMessage("O Fornecedor não deve possuir mais de 60 caracteres.")
                .MinimumLength(5).WithMessage("O Fornecedor deve possuir mais de 5 caracteres.");

            RuleFor(e => e.Contato)
                .NotEmpty().WithMessage("O Contato não pode ser vazio.")
                .MaximumLength(60).WithMessage("O Contato não deve possuir mais de 60 caracteres.")
                .MinimumLength(5).WithMessage("O Contato deve possuir mais de 5 caracteres.");

            RuleFor(e => e.Apelido)
                .MaximumLength(60).WithMessage("O Fornecedor não deve possuir mais de 60 caracteres.");

            RuleFor(e => e.CPFCPNJ)
                   .NotEmpty().WithMessage("O CPF/CNPJ não pode ser vazio.")
                   .MaximumLength(18).WithMessage("O CPF/CNPJ não deve possuir mais de 18 caracteres.")
                   .MinimumLength(5).WithMessage("O CPF/CNPJ deve possuir mais de 5 caracteres.");

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

            RuleFor(e => e.Email)
                .NotEmpty().WithMessage("O Email não pode ser vazio.")
                .MinimumLength(5).WithMessage("O Email deve possuir mais de 5 caracteres.")
                .MaximumLength(60).WithMessage("O Email não deve possuir mais de 60 caracteres.");

            RuleFor(e => e.Endereco)
              .NotEmpty().WithMessage("O Endereço não pode ser vazio.")
              .MaximumLength(60).WithMessage("O Endereço não deve possuir mais de 60 caracteres.")
              .MinimumLength(5).WithMessage("O Endereço deve possuir mais de 5 caracteres.");

            RuleFor(e => e.Numero)
                .NotEmpty().WithMessage("O Número não pode ser vazio.")
                .MinimumLength(1).WithMessage("O Número deve possuir mais de 1 caracteres.")
                .MaximumLength(10).WithMessage("O Número não deve possuir mais de 10 caracteres.");

            RuleFor(e => e.RgInscricaoEstadual)
                .NotEmpty().WithMessage("O RG não pode ser vazio.")
                .MinimumLength(5).WithMessage("O RG deve possuir mais de 5 caracteres.")
                .MaximumLength(19).WithMessage("O RG não deve possuir mais de 19 caracteres.");

            RuleFor(e => e.Telefone)
                .NotEmpty().WithMessage("O Telefone não pode ser vazio.")
                .MinimumLength(5).WithMessage("O Telefone deve possuir mais de 5 caracteres.")
                .MaximumLength(30).WithMessage("O Telefone não deve possuir mais de 30 caracteres.");

            RuleFor(e => e.LimiteCredito)
                .Must(e => e >= 0).WithMessage("O Limite Credito deve ser maior que 0.")
                .Must(e => e < 100000000).WithMessage("O Limite Credito deve ser menor que 100000000.");

            RuleFor(e => e.CPFCPNJ).Must(CPFIsAllow).WithMessage("Fornecedor já cadastrado.");

            RuleFor(e => e.CidadeId).Must(ExistCidade).WithMessage("Cidade não cadastrada.");

            RuleFor(e => e.CondicaoPagamentoId).Must(ExistCondicaoPagamento).WithMessage("Condição de Pagamento não cadastrada.");
        }

        private bool CPFIsAllow(Fornecedor Fornecedor, string cpf)
        {
            var findFornecedor = this.FornecedorDAO.GetByCPFCNPJ(cpf);
            return findFornecedor == null || findFornecedor?.Id == Fornecedor.Id;
        }

        private bool ExistCidade(Fornecedor fornecedor, int id)
        {
            var cidadeDb = this.CidadeDAO.GetByID(id);
            var fornecedorDb = this.FornecedorDAO.GetByID(fornecedor.Id);
            if (fornecedor.Id > 0 && cidadeDb != null && fornecedorDb.CidadeId == fornecedor.CidadeId)
            {
                return true;
            }

            return cidadeDb != null && cidadeDb.Situacao == null;
        }

        private bool ExistCondicaoPagamento(Fornecedor fornecedor, int id)
        {
            var condicaoDb = this.CondicaoPagamentoDAO.GetByID(id);
            var fornecedorDb = this.FornecedorDAO.GetByID(fornecedor.Id);
            if (fornecedor.Id > 0 && condicaoDb != null && fornecedorDb.CondicaoPagamentoId == fornecedor.CondicaoPagamentoId)
            {
                return true;
            }


            return condicaoDb != null && condicaoDb.Situacao == null;
        }
    }
}
