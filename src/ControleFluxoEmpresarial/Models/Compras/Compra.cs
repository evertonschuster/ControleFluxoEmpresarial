using ControleFluxoEmpresarial.DAOs.Compras;
using ControleFluxoEmpresarial.DAOs.CondicaoPagamentos;
using ControleFluxoEmpresarial.DAOs.Movimentos;
using ControleFluxoEmpresarial.DAOs.Pessoas;
using ControleFluxoEmpresarial.DTO.Compras;
using ControleFluxoEmpresarial.DTO.Movimentos;
using ControleFluxoEmpresarial.Entities;
using ControleFluxoEmpresarial.Models.CondicaoPagamentos;
using ControleFluxoEmpresarial.Models.Movimentos;
using ControleFluxoEmpresarial.Models.Pessoas;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ControleFluxoEmpresarial.Models.Compras
{
    public class Compra : IBaseAuditoria, IBaseEntity
    {
        public string Modelo { get; set; }

        public string Serie { get; set; }

        public string Numero { get; set; }

        public int FornecedorId { get; set; }

        public Fornecedor Fornecedor { get; set; }

        public DateTime DataEmissao { get; set; }

        public DateTime DataChegada { get; set; }

        public decimal? Frete { get; set; }

        public bool ConhecimentoFrete { get; set; }

        public decimal? Seguro { get; set; }

        public decimal? OutrasDespesas { get; set; }

        public int CondicaoPagamentoId { get; set; }

        public CondicaoPagamento CondicaoPagamento { get; set; }

        public string Observacoes { get; set; }

        public List<CompraProduto> Produtos { get; set; }

        public List<ContaPagar> Parcelas { get; set; }


        public DateTime? DataCancelamento { get; set; }
        public string UserCancelamento { get; set; }
        public string JustificativaCancelamento { get; set; }

        public DateTime DataCriacao { get; set; }
        public DateTime? DataAtualizacao { get; set; }

        public string UserCriacao { get; set; }
        public string UserAtualizacao { get; set; }

        public CompraId GetId()
        {
            return new CompraId()
            {
                FornecedorId = this.FornecedorId,
                Modelo = this.Modelo,
                Numero = this.Numero,
                Serie = this.Serie
            };
        }
    }

    public class CompraValidator : AbstractValidator<Compra>
    {
        public CompraDAO CompraDAO { get; set; }
        public FornecedorDAO FornecedorDAO { get; set; }
        public ProdutoDAO ProdutoDAO { get; set; }
        public FormaPagamentoDAO FormaPagamentoDAO { get; set; }
        public ContaPagarDAO ContaPagarDAO { get; set; }


        public CompraValidator(CompraDAO compraDAO, FornecedorDAO fornecedorDAO, ProdutoDAO produtoDAO,
            FormaPagamentoDAO formaPagamentoDAO, ContaPagarDAO contaPagarDAO)
        {
            this.CompraDAO = compraDAO;
            this.ProdutoDAO = produtoDAO;
            this.FornecedorDAO = fornecedorDAO;
            this.ContaPagarDAO = contaPagarDAO;
            this.FormaPagamentoDAO = formaPagamentoDAO;


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

            RuleFor(e => e.DataEmissao)
                .NotEmpty().WithMessage("Infome a Data de Emissão.");

            RuleFor(e => e.DataChegada)
                .NotEmpty().WithMessage("Informe a Data de Chegada.")
                .Must((e, a) => e.DataChegada >= e.DataEmissao).WithMessage("Data de Chegada não poder ser posterior a data de Emissão");

            RuleFor(e => e.Frete)
                .Must(e => e >= 0 || e == null).WithMessage("Frete inválido.");

            RuleFor(e => e.Seguro)
                .Must(e => e >= 0 || e == null).WithMessage("Seguro inválido.");

            RuleFor(e => e.OutrasDespesas)
                .Must(e => e >= 0 || e == null).WithMessage("Outras Despesas inválido.");

            RuleFor(e => e.CondicaoPagamentoId)
                .NotEmpty().WithMessage("Infome a condição de pagamento.");

            RuleFor(e => e.Observacoes)
                .MaximumLength(255).WithMessage("Observação não pode ter mais de 255 caracteres.");

            RuleFor(e => e.Produtos)
                .Must(e => e.Count > 0).WithMessage("Adicine produtos a compra.")
                .Must(e => e.Select(a => a.ProdutoId).Distinct().Count() == e.Count()).WithMessage("Existem produtos repetidos na compra.");

            RuleForEach(e => e.Produtos)
                .Must(e => ExistProduto(e.ProdutoId)).WithMessage("Produto não cadastrado.")
                .Must(e => e.Quantidade > 0).WithMessage("Quantidade inválida.")
                .Must(e => e.ValorUnitario > 0).WithMessage("Valor inválido.")
                .Must(e => e.Desconto >= 0 || e.Desconto == null).WithMessage("Desconto inválido.")
                .Must(e => e.IPI > 0 || e.IPI == null).WithMessage("IPI inválido.");

            RuleFor(e => e.Parcelas)
                .NotEmpty().WithMessage("Adicione parcelas a compra.")
                .Must(VerifyValues).WithMessage("Soma das parcelas não confere com o valor da compra.");

            RuleForEach(e => e.Parcelas)
                .NotEmpty().WithMessage("Informe as parcelas.")
                .Must(e => e.Parcela >= 0).WithMessage("Parcelas inválida.")
                .Must(e => ExistFormaPagamento(e.FormaPagamentoId)).WithMessage("Forma de pagamento não cadastrada.")
                .Must(e => e.DataVencimento != null).WithMessage("Data de Vencimento inválida.")
                .Must((c, p) => !ExistParcela(c, p)).WithMessage((c, p) => $"Parcela {p.Parcela} já cadastrada.");

        }

        private bool ExistParcela(Compra compra, ContaPagar contaPagar)
        {
            var id = new ContaPagarId()
            {
                Modelo = compra.Modelo,
                Serie = compra.Serie,
                Numero = compra.Numero,
                FornecedorId = compra.FornecedorId,
                Parcela = contaPagar.Parcela,
            };

            var findFormaPagamento = this.ContaPagarDAO.GetByID(id);
            return findFormaPagamento != null && findFormaPagamento.DataCancelamento == null;
        }

        private bool ExistFormaPagamento(int id)
        {
            var findFormaPagamento = this.FormaPagamentoDAO.GetByID(id);
            return findFormaPagamento != null && findFormaPagamento.Situacao == null;
        }

        private bool VerifyValues(Compra compra, List<ContaPagar> parcela)
        {
            var totalCompra = compra.Produtos.Sum(e => (e.Quantidade * e.ValorUnitario) - (e.Desconto ?? 0) + (e.IPI ?? 0));
            totalCompra += (compra.Seguro ?? 0) + (compra.OutrasDespesas ?? 0) + (compra.ConhecimentoFrete ? (compra.Frete ?? 0) : 0);

            var totalParcelas = compra.Parcelas?.Sum(e => e.Valor);

            return totalParcelas == totalCompra;
        }

        private bool ExistProduto(int id)
        {
            var findProduto = this.ProdutoDAO.GetByID(id);
            return findProduto != null && findProduto.Situacao == null;
        }

        private bool ExistFornecedor(Compra compra, int id)
        {
            var findFornecedor = this.FornecedorDAO.GetByID(id);
            return findFornecedor != null && findFornecedor.Situacao == null;
        }

        private bool VerifyId(Compra compra, string numero)
        {
            return this.CompraDAO.GetByID(compra.GetId()) == null;
        }
    }

}
