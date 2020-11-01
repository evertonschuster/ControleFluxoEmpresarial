using ControleFluxoEmpresarial.DAOs.Movimentos;
using FluentValidation;

namespace ControleFluxoEmpresarial.Models.Movimentos
{
    public class Equipamento : BaseModelSituacao
    {
        public string Nome { get; set; }
    }



    public class EquipamentoValidator : AbstractValidator<Equipamento>
    {
        public EquipamentoDAO EquipamentoDAO { get; }

        public EquipamentoValidator(EquipamentoDAO EquipamentoDAO)
        {
            this.EquipamentoDAO = EquipamentoDAO;

            RuleFor(e => e.Nome)
                .NotEmpty().WithMessage("[Nome] da Equipamento não pode ser vazio.")
                .MaximumLength(50).WithMessage("O campo [Nome] não deve possuir mais de 50 caracteres.");

            RuleFor(e => e.Nome).Must(NameIsAllow).WithMessage("Equipamento já cadastrada.");

        }

        private bool NameIsAllow(Equipamento cidade, string nome)
        {
            var findEquipamento = this.EquipamentoDAO.GetByNome(nome);
            return findEquipamento == null || findEquipamento?.Id == cidade.Id;
        }
    }
}
