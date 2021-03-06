﻿using ControleFluxoEmpresarial.DAOs.CondicaoPagamentos;
using ControleFluxoEmpresarial.DAOs.Movimentos;
using ControleFluxoEmpresarial.DAOs.Pessoas;
using ControleFluxoEmpresarial.DTO.Movimentos;
using ControleFluxoEmpresarial.Entities;
using ControleFluxoEmpresarial.Models.CondicaoPagamentos;
using ControleFluxoEmpresarial.Models.Pessoas;
using FluentValidation;
using System;

namespace ControleFluxoEmpresarial.Models.Movimentos
{
    public class ContaPagar : IBaseAuditoria, IBaseEntity
    {
        public string Modelo { get; set; }
        public string Serie { get; set; }
        public string Numero { get; set; }
        public int FornecedorId { get; set; }
        public int Parcela { get; set; }

        public decimal Valor { get; set; }

        public decimal? Desconto { get; set; }

        public decimal? Multa { get; set; }

        public decimal? Juro { get; set; }

        public int FormaPagamentoId { get; set; }
        public FormaPagamento FormaPagamento { get; set; }

        public Fornecedor Fornecedor { get; set; }
        public string Descricao { get; set; }

        public DateTime DataVencimento { get; set; }
        public DateTime DataEmissao { get; set; }


        public DateTime? DataCancelamento { get; set; }
        public string UserCancelamento { get; set; }
        public string JustificativaCancelamento { get; set; }

        public DateTime? DataCancelamentoBaixa { get; set; }
        public string UserCancelamentoBaixa { get; set; }
        public string JustificativaCancelamentoBaixa { get; set; }


        public DateTime? DataBaixa { get; set; }
        public DateTime? DataPagamento { get; set; }
        public string UserBaixa { get; set; }
        public decimal? ValorBaixa { get; set; }


        public DateTime DataCriacao { get; set; }

        public string UserCriacao { get; set; }

        public DateTime? DataAtualizacao { get; set; }

        public string UserAtualizacao { get; set; }

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

    public class ContaPagarValidator : AbstractValidator<ContaPagar>
    {
        public ContaPagarDAO ContaPagarDAO { get; set; }
        public FornecedorDAO FornecedorDAO { get; set; }
        public FormaPagamentoDAO FormaPagamentoDAO { get; set; }

        public ContaPagarValidator(ContaPagarDAO contaPagarDAO, FornecedorDAO fornecedorDAO, FormaPagamentoDAO formaPagamentoDAO)
        {
            this.ContaPagarDAO = contaPagarDAO;
            this.FornecedorDAO = fornecedorDAO;
            this.FormaPagamentoDAO = formaPagamentoDAO;

            RuleFor(e => e.Modelo)
                .NotEmpty().WithMessage("Informe o modelo.")
                .MaximumLength(2).WithMessage("Modelo só pode ter 2 caracteres.");

            RuleFor(e => e.Serie)
                .NotEmpty().WithMessage("Informe a série.")
                .MaximumLength(2).WithMessage("Série só pode ter 2 caracteres.");

            RuleFor(e => e.Numero)
                .NotEmpty().WithMessage("Informe o número.")
                .MaximumLength(20).WithMessage("Número só pode ter 2 caracteres.");

            RuleFor(e => e.FornecedorId)
                .NotEmpty().WithMessage("Informe o fornecedor.")
                .Must(ExistFornecedor).WithMessage("Fornecedor não cadastrado.");

            RuleFor(e => e.Parcela)
                .GreaterThan(0).WithMessage("Parcela deve ser superior a 0.")
                .NotEmpty().WithMessage("Informe a parcela.");

            RuleFor(e => e.Valor)
                .Must(e => e >= 0).WithMessage("Valor não pode ser negativo.");

            RuleFor(e => e.Desconto)
                .Must((parcela, desconto) => parcela.Valor >= desconto || desconto is null).WithMessage("Desconto não pode ser maior que o valor.")
                .Must(e => e >= 0 || e == null).WithMessage("Desconto não pode ser negativo.");

            RuleFor(e => e.Multa)
                .Must(e => e >= 0 || e == null).WithMessage("Multa não pode ser negativo.");

            RuleFor(e => e.Juro)
                .Must(e => e >= 0 || e == null).WithMessage("Juro não pode ser negativo.");

            RuleFor(e => e.FormaPagamentoId)
                .NotEmpty().WithMessage("Informe a forma de pagamento.")
                .Must(ExistFormaPagamento).WithMessage("Forma de pagamento não cadastrado.");

            RuleFor(e => e.DataEmissao)
                .NotEmpty().WithMessage("Informe a data de emissão.");

            RuleFor(e => e.DataVencimento)
                .NotEmpty().WithMessage("Informe a data de vencimento.")
                .Must((contaPagar, vencimento) => contaPagar.DataVencimento >= contaPagar.DataEmissao).WithMessage("Data de vencimento inválida.");

            RuleFor(e => e.Descricao)
                .MaximumLength(255).WithMessage("Descrição deve ter menos de 255 caracteres.");
        }

        private bool ExistFornecedor(ContaPagar contaPagar, int id)
        {
            var findFornecedor = this.FornecedorDAO.GetByID(id);
            var contaPagarDB = this.ContaPagarDAO.GetByID(contaPagar.GetId());
            if (contaPagarDB != null && findFornecedor != null && contaPagar.FornecedorId == contaPagarDB.FornecedorId)
            {
                return true;
            }

            return findFornecedor != null && findFornecedor.Situacao == null;
        }

        private bool ExistFormaPagamento(ContaPagar contaPagar, int id)
        {
            var findFormaPagamento = this.FormaPagamentoDAO.GetByID(id);
            var contaPagarDB = this.ContaPagarDAO.GetByID(contaPagar.GetId());
            if (contaPagarDB != null && findFormaPagamento != null && contaPagar.FormaPagamentoId == contaPagarDB.FormaPagamentoId)
            {
                return true;
            }

            return findFormaPagamento != null && findFormaPagamento.Situacao == null;
        }
    }
}
