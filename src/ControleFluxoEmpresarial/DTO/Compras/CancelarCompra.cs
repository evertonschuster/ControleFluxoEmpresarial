using ControleFluxoEmpresarial.DAOs.Compras;
using ControleFluxoEmpresarial.DAOs.Pessoas;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DTO.Compras
{
    public class CancelarCompra
    {
        public string Modelo { get; set; }
        public string Serie { get; set; }
        public string Numero { get; set; }
        public int FornecedorId { get; set; }

        public string Justificativa { get; set; }

        public string Senha { get; set; }
    }

    public class CompraValidator : AbstractValidator<CancelarCompra>
    {
        public CompraDAO CompraDAO { get; set; }
        public FornecedorDAO FornecedorDAO { get; set; }

        public CompraValidator(CompraDAO compraDAO, FornecedorDAO fornecedorDAO)
        {

            this.CompraDAO = compraDAO;
            this.FornecedorDAO = fornecedorDAO;

            RuleFor(e => e.Modelo)
                 .NotEmpty().WithMessage("Informe o modelo.")
                 .MaximumLength(2).WithMessage("Modelo só pode ter 2 caracteres.");

            RuleFor(e => e.Serie)
                .NotEmpty().WithMessage("Informe a série.")
                .MaximumLength(2).WithMessage("Série só pode ter 2 caracteres.");

            RuleFor(e => e.Numero)
                .NotEmpty().WithMessage("Informe o número.")
                .MaximumLength(6).WithMessage("Número só pode ter 6 caracteres.")
                .Must(VerifyId).WithMessage("Compra já cadastrada.");

            RuleFor(e => e.FornecedorId)
                .NotEmpty().WithMessage("Informe o fornecedor.")
                .Must(ExistFornecedor).WithMessage("Fornecedor não cadastrado.");

            RuleFor(e => e.Justificativa)
                .NotEmpty().WithMessage("Informe a justificatica.")
                .MinimumLength(10).WithMessage("A justificatica deve ter mais de 10 caracteres.")
                .MaximumLength(255).WithMessage("A justificatica deve ter no máximo 255 caracteres.");

            RuleFor(e => e.Senha)
                .NotEmpty().WithMessage("Informe a senha");
        }

        private bool VerifyId(CancelarCompra compra, string numero)
        {
            return this.CompraDAO.GetByID(new CompraId()
            {
                FornecedorId = compra.FornecedorId,
                Modelo = compra.Modelo,
                Numero = compra.Numero,
                Serie = compra.Serie
            }) != null;
        }

        private bool ExistFornecedor(CancelarCompra compra, int id)
        {
            var findFornecedor = this.FornecedorDAO.GetByID(id);
            return findFornecedor != null && findFornecedor.Situacao == null;
        }
    }
}
