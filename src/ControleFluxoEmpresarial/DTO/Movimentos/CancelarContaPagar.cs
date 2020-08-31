using ControleFluxoEmpresarial.DAOs.Movimentos;
using ControleFluxoEmpresarial.DAOs.Pessoas;
using FluentValidation;

namespace ControleFluxoEmpresarial.DTO.Movimentos
{
    public class CancelarContaPagar
    {
        public string Modelo { get; set; }
        public string Serie { get; set; }
        public string Numero { get; set; }
        public int FornecedorId { get; set; }
        public int Parcela { get; set; }

        public string Justificativa { get; set; }

        public string Senha { get; set; }

        public ContaPagarId GetId()
        {
            return new ContaPagarId()
            {
                FornecedorId = this.FornecedorId,
                Modelo = this.Modelo,
                Numero = this.Numero,
                Parcela = this.Parcela,
                Serie = this.Serie
            };
        }
    }

    public class CancelarContaPagarValidator : AbstractValidator<CancelarContaPagar>
    {
        public FornecedorDAO FornecedorDAO { get; set; }
        public ContaPagarDAO ContaPagarDAO { get; set; }

        public CancelarContaPagarValidator(ContaPagarDAO contaPagarDAO, FornecedorDAO fornecedorDAO)
        {
            this.ContaPagarDAO = contaPagarDAO;
            this.FornecedorDAO = fornecedorDAO;

            RuleFor(e => e.Modelo)
                    .NotEmpty().WithMessage("Informe o modelo.")
                    .MaximumLength(2).WithMessage("Modelo só pode ter 2 caracteres.");

            RuleFor(e => e.Serie)
                    .NotEmpty().WithMessage("Informe a série.")
                    .MaximumLength(2).WithMessage("Série só pode ter 2 caracteres.");

            RuleFor(e => e.Numero)
                    .NotEmpty().WithMessage("Informe o número.")
                    .Must(ExistCondicaoPagamento).WithMessage("Conta a pagar não cadastrada.")
                    .MaximumLength(20).WithMessage("Número só pode ter 2 caracteres.");

            RuleFor(e => e.FornecedorId)
                    .NotEmpty().WithMessage("Informe o fornecedor.")
                    .Must(ExistFornecedor).WithMessage("Fornecedor não cadastrado.");

            RuleFor(e => e.Parcela)
                    .GreaterThan(0).WithMessage("Parcela deve ser superior a 0.")
                    .NotEmpty().WithMessage("Informe a parcela.");
        }

        private bool ExistCondicaoPagamento(CancelarContaPagar contaPagar, string numero)
        {
            var contaPagarDB = this.ContaPagarDAO.GetByID(contaPagar.GetId());
            return contaPagarDB != null;
        }

        private bool ExistFornecedor(CancelarContaPagar contaPagar, int id)
        {
            var findFornecedor = this.FornecedorDAO.GetByID(id);
            var contaPagarDB = this.ContaPagarDAO.GetByID(contaPagar.GetId());
            if (contaPagarDB != null && findFornecedor != null && contaPagar.FornecedorId == contaPagarDB.FornecedorId)
            {
                return true;
            }

            return findFornecedor != null && findFornecedor.Situacao == null;
        }
    }

}