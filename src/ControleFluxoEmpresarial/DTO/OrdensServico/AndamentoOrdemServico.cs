using ControleFluxoEmpresarial.DAOs.CondicaoPagamentos;
using ControleFluxoEmpresarial.DAOs.Movimentos;
using ControleFluxoEmpresarial.DAOs.OrdensServico;
using ControleFluxoEmpresarial.Models.OrdensServico;
using FluentValidation;
using System;
using System.Collections.Generic;

namespace ControleFluxoEmpresarial.DTO.OrdensServico
{
    public class AndamentoOrdemServico
    {
        public int Id { get; set; }

        public string DescricaoTecnico { get; set; }
        public string DescricaoObservacaoTecnico { get; set; }

        public int? CondicaoPagamentoId { get; set; }


        public List<OrdemServicoProduto> Produtos { get; set; } = new List<OrdemServicoProduto>();
        public List<OrdemServicoServico> Servicos { get; set; } = new List<OrdemServicoServico>();
    }

    public class AndamentoOrdemServicoValidator : AbstractValidator<AndamentoOrdemServico>
    {
        public ProdutoDAO ProdutoDAO { get; set; }
        public ServicoDAO ServicoDAO { get; set; }
        public OrdemServicoDAO OrdemServicoDAO { get; set; }

        public AndamentoOrdemServicoValidator(OrdemServicoDAO ordemServicoDAO, ProdutoDAO produtoDAO, ServicoDAO servicoDAO)
        {
            this.ProdutoDAO = produtoDAO ?? throw new ArgumentNullException(nameof(produtoDAO));
            this.ServicoDAO = servicoDAO ?? throw new ArgumentNullException(nameof(servicoDAO));
            this.OrdemServicoDAO = ordemServicoDAO ?? throw new ArgumentNullException(nameof(ordemServicoDAO));

            RuleFor(e => e.Id)
                .Must(ExistOrdemServico).WithMessage("Ordem de serviço não cadastrada");

            RuleFor(e => e.DescricaoTecnico)
               .MaximumLength(255).WithMessage("Descrição não deve ter mais de 255 caracteres.");

            RuleFor(e => e.DescricaoObservacaoTecnico)
                .MaximumLength(255).WithMessage("Observações não deve ter mais de 255 caracteres.");

            RuleForEach(e => e.Produtos)
                 .Must(ExistProduto).WithMessage("Produto não cadastrado");

            RuleForEach(e => e.Servicos)
                .Must(ExistServico).WithMessage("Serviço não cadastrado");
        }

        private bool ExistProduto(AndamentoOrdemServico os, OrdemServicoProduto produto)
        {
            var findProduto = this.ProdutoDAO.GetByID(produto.ProdutoId);
            return findProduto != null && findProduto.Situacao == null;
        }

        private bool ExistServico(AndamentoOrdemServico os, OrdemServicoServico servico)
        {
            var findServico = this.ServicoDAO.GetByID(servico.ServicoId);
            return findServico != null && findServico.Situacao == null;
        }

        private bool ExistOrdemServico(AndamentoOrdemServico os, int id)
        {
            return this.OrdemServicoDAO.GetByID(id) != null;
        }
    }
}
