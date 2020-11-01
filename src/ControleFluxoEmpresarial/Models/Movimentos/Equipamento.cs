using ControleFluxoEmpresarial.DAOs.Movimentos;
using FluentValidation;

namespace ControleFluxoEmpresarial.Models.Movimentos
{
    public class Equipamento : BaseModelSituacao
    {
        public string Nome { get; set; }

        public int MarcaId { get; set; }

        public Marca Marca { get; set; }
    }



    public class EquipamentoValidator : AbstractValidator<Equipamento>
    {
        public MarcaDAO MarcaDAO { get; }
        public EquipamentoDAO EquipamentoDAO { get; }

        public EquipamentoValidator(EquipamentoDAO EquipamentoDAO, MarcaDAO marcaDAO)
        {
            this.MarcaDAO = marcaDAO;
            this.EquipamentoDAO = EquipamentoDAO;

            RuleFor(e => e.Nome)
                .NotEmpty().WithMessage("[Nome] da Equipamento não pode ser vazio.")
                .MaximumLength(50).WithMessage("O campo [Nome] não deve possuir mais de 50 caracteres.");

            RuleFor(e => e.Nome).Must(NameIsAllow).WithMessage("Equipamento já cadastrada.");

            RuleFor(e => e.MarcaId)
                .NotEmpty().WithMessage("Informe a Marca.")
                .Must(ExistMarca).WithMessage("Marca não cadastrada.");
        }

        private bool NameIsAllow(Equipamento cidade, string nome)
        {
            var findEquipamento = this.EquipamentoDAO.GetByNome(nome);
            return findEquipamento == null || findEquipamento?.Id == cidade.Id;
        }


        private bool ExistMarca(Equipamento equipamento, int id)
        {
            var marcaDb = this.MarcaDAO.GetByID(id);
            var equipamentoDb = this.EquipamentoDAO.GetByID(equipamento.Id);
            if (equipamento.Id > 0 && marcaDb != null && equipamentoDb.MarcaId == equipamento.MarcaId)
            {
                return true;
            }

            return marcaDb != null && marcaDb.Situacao == null;
        }
    }
}
