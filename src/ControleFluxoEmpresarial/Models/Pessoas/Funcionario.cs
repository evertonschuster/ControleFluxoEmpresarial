using ControleFluxoEmpresarial.DAOs.Cidades;
using ControleFluxoEmpresarial.DAOs.Pessoas;
using ControleFluxoEmpresarial.Models.Movimentos;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Models.Pessoas
{
    public class Funcionario : Pessoa
    {
        public EstadoCivilType EstadoCivil { get; set; }

        public SexoType Sexo { get; set; }

        public string Nacionalidade { get; set; }

        public Boolean IsBrasileiro { get; set; }

        public DateTime DataNascimento { get; set; }

        public string Cnh { get; set; }

        public DateTime? DataValidadeCNH { get; set; }

        public int FuncaoFuncionarioId { get; set; }

        public FuncaoFuncionario FuncaoFuncionario { get; set; }

        public decimal Salario { get; set; }

        public DateTime DataAdmissao { get; set; }

        public DateTime? DataDemissao { get; set; }

        public List<Servico> Servicos { get; set; }


    }

    public class FuncionarioValidator : AbstractValidator<Funcionario>
    {
        public FuncionarioDAO FuncionarioDAO { get; }
        public CidadeDAO CidadeDAO { get; }
        public FuncaoFuncionarioDAO FuncaoFuncionarioDAO { get; }


        public FuncionarioValidator(FuncionarioDAO FuncionarioDAO, CidadeDAO cidadeDAO, FuncaoFuncionarioDAO funcaoFuncionarioDAO)
        {

            this.CidadeDAO = cidadeDAO;
            this.FuncionarioDAO = FuncionarioDAO;
            this.FuncaoFuncionarioDAO = funcaoFuncionarioDAO;

            RuleFor(e => e.Nome)
                .NotEmpty().WithMessage("O Funcionário não pode ser vazio.")
                .MaximumLength(60).WithMessage("O Funcionário não deve possuir mais de 60 caracteres.")
                .MinimumLength(5).WithMessage("O Funcionário deve possuir mais de 5 caracteres.");

            RuleFor(e => e.Apelido)
                .MaximumLength(60).WithMessage("O Funcionario não deve possuir mais de 60 caracteres.");

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

            RuleFor(e => e.Salario)
                .NotEmpty().WithMessage("O Salário não pode ser vazio.")
                .Must(e => e >= 0).WithMessage("Sálario não pode ser nagativo.");

            RuleFor(e => e.DataAdmissao)
                .NotEmpty().WithMessage("A Data de Admissão não pode ser vazia.");

            RuleFor(e => e.DataDemissao)
                .Must((e, a) => e.DataAdmissao < e.DataDemissao || e.DataDemissao == null).WithMessage("Data de Demissão não pode ser inferior a data de Admissão.");

            RuleFor(e => e.CPFCPNJ).Must(CPFIsAllow).WithMessage("Funcionario já cadastrado.");

            RuleFor(e => e.CidadeId).Must(ExistCidade).WithMessage("Cidade não cadastrada.");

            RuleFor(e => e.FuncaoFuncionarioId).Must(ExistFuncaoFuncionario).WithMessage("Função Funcionário não cadastrada.");

            RuleFor(e => e.DataValidadeCNH)
                .Must(e => e == null || (e != null && e >= DateTime.Now)).WithMessage("CNH está vencida.");
        }

        private bool CPFIsAllow(Funcionario Funcionario, string cpf)
        {
            var findFuncionario = this.FuncionarioDAO.GetByCPFCNPJ(cpf);
            return findFuncionario == null || findFuncionario?.Id == Funcionario.Id;
        }

        private bool ExistCidade(Funcionario funcionario, int id)
        {
            var cidadeDb = this.CidadeDAO.GetByID(id);
            var funcionarioDb = this.FuncionarioDAO.GetByID(funcionario.Id);
            if (funcionario.Id > 0 && cidadeDb != null && funcionarioDb.CidadeId == funcionario.CidadeId)
            {
                return true;
            }

            return cidadeDb != null && cidadeDb.Situacao == null;
        }

        private bool ExistFuncaoFuncionario(Funcionario funcionario, int id)
        {
            var funcaoDb = this.FuncaoFuncionarioDAO.GetByID(id);
            var funcionarioDb = this.FuncionarioDAO.GetByID(funcionario.Id);
            if (funcionario.Id > 0 && funcaoDb != null && funcionarioDb.FuncaoFuncionarioId == funcionario.FuncaoFuncionarioId)
            {
                return true;
            }

            return funcaoDb != null && funcaoDb.Situacao == null;
        }
    }
}
