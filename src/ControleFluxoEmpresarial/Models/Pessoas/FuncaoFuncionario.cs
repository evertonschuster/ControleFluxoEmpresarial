using ControleFluxoEmpresarial.DAOs.Pessoas;
using FluentValidation;

namespace ControleFluxoEmpresarial.Models.Pessoas
{
    public class FuncaoFuncionario : BaseModelSituacao
    {
        public string Nome { get; set; }

        public decimal CargaHoraria { get; set; }

        public bool RequerCNH { get; set; }

        public string Descricao { get; set; }

        public string Observacao { get; set; }
    }



    public class FuncaoFuncionarioValidator : AbstractValidator<FuncaoFuncionario>
    {
        public FuncaoFuncionarioDAO FuncaoFuncionarioDAO { get; }

        public FuncaoFuncionarioValidator(FuncaoFuncionarioDAO funcaoFuncionarioDAO)
        {
            this.FuncaoFuncionarioDAO = funcaoFuncionarioDAO;

            RuleFor(e => e.Nome)
                .NotEmpty().WithMessage("[Nome] da Função Funcionário não pode ser vazio.")
                .MaximumLength(50).WithMessage("O campo [Nome] não deve possuir mais de 50 caracteres.");

            RuleFor(e => e.CargaHoraria)
                .NotEmpty().WithMessage("A Carga Horária não pode ser vazio.")
                .Must(e => e > 0).WithMessage("A Carga Horária  não deve possuir mais de 5 caracteres.");

            RuleFor(e => e.Nome).Must(NameIsAllow).WithMessage("Função Funcionário já cadastrado.");

            RuleFor(e => e.Descricao)
                .MaximumLength(255).WithMessage("Descrição não pode ter mais de 255 caracteres.");

            RuleFor(e => e.Observacao)
                .MaximumLength(255).WithMessage("Observação não pode ter mais de 255 caracteres.");
        }

        private bool NameIsAllow(FuncaoFuncionario funcaoFuncionario, string nome)
        {
            var findCidade = this.FuncaoFuncionarioDAO.GetByNome(nome);
            return findCidade == null || findCidade?.Id == funcaoFuncionario.Id;
        }
    }
}
