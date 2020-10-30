using ControleFluxoEmpresarial.DAOs.CondicaoPagamentos;
using ControleFluxoEmpresarial.DAOs.Movimentos;
using ControleFluxoEmpresarial.DAOs.Pessoas;
using ControleFluxoEmpresarial.DAOs.Vendas;
using ControleFluxoEmpresarial.Entities;
using ControleFluxoEmpresarial.Models.Movimentos;
using ControleFluxoEmpresarial.Models.Pessoas;
using FluentValidation;
using System;
using System.Collections.Generic;

namespace ControleFluxoEmpresarial.Models.Vendas
{
    public class Venda : IBaseAuditoria, IBaseEntity
    {
        public string Numero { get; set; }

        public string Serie { get; set; }

        public string Modelo { get; set; }

        public string Descricao { get; set; }

        public DateTime? DataEmissao { get; set; }
        public DateTime? DataCancelamento { get; set; }
        public string UserCancelamento { get; set; }
        public string JustificativaCancelamento { get; set; }


        public Cliente Cliente { get; set; }
        public int ClienteId { get; set; }


        public int CondicaoPagamentoId { get; set; }
        public int? OrdemServicoId { get; set; }


        public List<VendaProduto> Produtos { get; set; }
        public List<VendaServico> Servicos { get; set; }
        public List<ContaReceber> Parcelas { get; set; }

        public DateTime DataCriacao { get; set; }
        public DateTime? DataAtualizacao { get; set; }
        public string UserCriacao { get; set; }
        public string UserAtualizacao { get; set; }

        public VendaId GetId()
        {
            return new VendaId()
            {
                Modelo = this.Modelo,
                Numero = this.Numero,
                Serie = this.Serie
            };
        }
    }

    public class VendaValidator : AbstractValidator<Venda>
    {
        public ProdutoDAO ProdutoDAO { get; set; }
        public CondicaoPagamentoDAO CondicaoPagamentoDAO { get; set; }
        public FormaPagamentoDAO FormaPagamentoDAO { get; set; }
        public ClienteDAO ClienteDAO { get; set; }

        public VendaValidator(ProdutoDAO produtoDAO, CondicaoPagamentoDAO condicaoPagamentoDAO, FormaPagamentoDAO formaPagamentoDAO, ClienteDAO clienteDAO)
        {
            this.ProdutoDAO = produtoDAO;
            this.CondicaoPagamentoDAO = condicaoPagamentoDAO;
            this.FormaPagamentoDAO = formaPagamentoDAO;
            this.ClienteDAO = clienteDAO;


            RuleFor(e => e.Modelo)
              .NotEmpty().WithMessage("Informe o modelo.")
              .MaximumLength(2).WithMessage("Modelo só pode ter 2 caracteres.");

            RuleFor(e => e.Serie)
                .NotEmpty().WithMessage("Informe a série.")
                .MaximumLength(2).WithMessage("Série só pode ter 2 caracteres.");

            RuleFor(e => e.ClienteId)
                .Must(ExistCliente).WithMessage("Cliente não cadastrado.");

            RuleForEach(e => e.Produtos)
                .Must(ExistProduto).WithMessage(e => "Produto não cadastrado.");

            RuleFor(e => e.CondicaoPagamentoId)
                .Must(ExistCondicaoPagamento).WithMessage("Condição de Pagamento não cadastrada.");
        }

        private bool ExistCondicaoPagamento(int id)
        {
            var findCond = this.CondicaoPagamentoDAO.GetByID(id);
            return findCond != null && findCond.Situacao == null;
        }

        private bool ExistProduto(VendaProduto produto)
        {
            var findProduto = this.ProdutoDAO.GetByID(produto.ProdutoId);
            return findProduto != null && findProduto.Situacao == null;
        }

        private bool ExistCliente(int id)
        {
            var findCliente = this.ClienteDAO.GetByID(id);
            return findCliente != null && findCliente.Situacao == null;
        }

        private bool ExistFormaPagamento(ContaPagar contaPagar, int id)
        {
            var findFormaPagamento = this.FormaPagamentoDAO.GetByID(id);
            return findFormaPagamento != null && findFormaPagamento.Situacao == null;
        }
    }
}
