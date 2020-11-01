using ControleFluxoEmpresarial.DAOs.Movimentos;
using FluentValidation;

namespace ControleFluxoEmpresarial.Models.Movimentos
{
    public class ProblemaRelatado : BaseModelSituacao
    {
        public string Nome { get; set; }
    }



    public class ProblemaRelatadoValidator : AbstractValidator<ProblemaRelatado>
    {
        public ProblemaRelatadoDAO ProblemaRelatadoDAO { get; }

        public ProblemaRelatadoValidator(ProblemaRelatadoDAO ProblemaRelatadoDAO)
        {
            this.ProblemaRelatadoDAO = ProblemaRelatadoDAO;

            RuleFor(e => e.Nome)
                .NotEmpty().WithMessage("[Nome] da Problema Relatado não pode ser vazio.")
                .MaximumLength(50).WithMessage("O campo [Nome] não deve possuir mais de 50 caracteres.");

            RuleFor(e => e.Nome).Must(NameIsAllow).WithMessage("Problema Relatado já cadastrada.");

        }

        private bool NameIsAllow(ProblemaRelatado cidade, string nome)
        {
            var findProblemaRelatado = this.ProblemaRelatadoDAO.GetByNome(nome);
            return findProblemaRelatado == null || findProblemaRelatado?.Id == cidade.Id;
        }
    }
}
