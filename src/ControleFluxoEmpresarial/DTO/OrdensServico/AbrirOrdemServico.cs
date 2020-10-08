
using ControleFluxoEmpresarial.DAOs.Pessoas;
using FluentValidation;
using System;

namespace ControleFluxoEmpresarial.DTO.OrdensServico
{
    public class AbrirOrdemServico
    {
        public int ClienteId { get; set; }

        public string Telefone { get; set; }

        public string Contato { get; set; }

        public string NumeroSerie { get; set; }

        public string DescricaoEquipamento { get; set; }

        public string DescricaoProblemaRelatado { get; set; }

        public string DescricaoAcessorio { get; set; }

        public string DescricaoObservacao { get; set; }
    }

    public class AbrirOrdemServicoValidator : AbstractValidator<AbrirOrdemServico>
    {
        public ClienteDAO ClienteDAO { get; set; }

        public AbrirOrdemServicoValidator(ClienteDAO clienteDAO)
        {
            ClienteDAO = clienteDAO ?? throw new ArgumentNullException(nameof(clienteDAO));

            RuleFor(e => e.ClienteId)
                .NotEmpty().WithMessage("Informe o cliente.")
                .Must(ExistFormaCliente).WithMessage("Informe o cliente.");

            RuleFor(e => e.Telefone)
                .NotEmpty().WithMessage("Informe o telefone.")
                .MinimumLength(8).WithMessage("Telefone deve ter mais de 8 caracteres.")
                .MaximumLength(20).WithMessage("Telefone não deve ter mais de 20 caracteres.");

            RuleFor(e => e.Contato)
                .MaximumLength(50).WithMessage("Contato não deve ter mais de 50 caracteres.");

            RuleFor(e => e.NumeroSerie)
                .MaximumLength(50).WithMessage("Número Serie não deve ter mais de 50 caracteres.");

            RuleFor(e => e.DescricaoEquipamento)
                .MinimumLength(5).WithMessage("Descrição do equipamento deve ter pelo menos 5 caracteres.")
                .MaximumLength(255).WithMessage("Descrição do equipamento não deve ter mais de 255 caracteres.");

            RuleFor(e => e.DescricaoProblemaRelatado)
                .MinimumLength(5).WithMessage("Problema Relatado do equipamento deve ter pelo menos 5 caracteres.")
                .MaximumLength(255).WithMessage("Problema Relatado do equipamento não deve ter mais de 255 caracteres.");

            RuleFor(e => e.DescricaoAcessorio)
                .MinimumLength(5).WithMessage("Acessório do equipamento deve ter pelo menos 5 caracteres.")
                .MaximumLength(255).WithMessage("Acessório do equipamento não deve ter mais de 255 caracteres.");

            RuleFor(e => e.DescricaoObservacao)
                .MaximumLength(255).WithMessage("Observações do equipamento não deve ter mais de 255 caracteres.");
        }

        private bool ExistFormaCliente(AbrirOrdemServico contaPagar, int id)
        {
            var findCliente = this.ClienteDAO.GetByID(id);
            return findCliente != null && findCliente.Situacao == null;
        }
    }
}
