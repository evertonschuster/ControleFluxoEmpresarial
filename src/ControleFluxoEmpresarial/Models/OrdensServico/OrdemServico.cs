using ControleFluxoEmpresarial.DAOs.CondicaoPagamentos;
using ControleFluxoEmpresarial.DAOs.Movimentos;
using ControleFluxoEmpresarial.DAOs.OrdensServico;
using ControleFluxoEmpresarial.Models.Movimentos;
using ControleFluxoEmpresarial.Models.Pessoas;
using FluentValidation;
using System;
using System.Collections.Generic;

namespace ControleFluxoEmpresarial.Models.OrdensServico
{
    public class OrdemServico : BaseModel
    {
        public int ClienteId { get; set; }
        public Cliente Cliente { get; set; }

        public string Telefone { get; set; }
        public string Contato { get; set; }
        public string DescricaoEquipamento { get; set; }
        public string DescricaoProblemaRelatado { get; set; }
        public string DescricaoAcessorio { get; set; }
        public string DescricaoObservacao { get; set; }
        public string DescricaoTecnico { get; set; }
        public string DescricaoObservacaoTecnico { get; set; }
        public string NumeroSerie { get; set; }


        public int? CondicaoPagamentoId { get; set; }


        public DateTime DataAbertura { get; set; }
        public DateTime? DataExecucao { get; set; }
        public DateTime? DataDevolucaoCliente { get; set; }

        public List<OrdemServicoProduto> Produtos { get; set; } = new List<OrdemServicoProduto>();
        public List<OrdemServicoServico> Servicos { get; set; } = new List<OrdemServicoServico>();

        public List<ContaReceber> ParcelasProduto { get; set; } = new List<ContaReceber>();
        public List<ContaReceber> ParcelasServico { get; set; } = new List<ContaReceber>();
    }


    public class OrdemServicoValidator : AbstractValidator<OrdemServico>
    {
        public ProdutoDAO ProdutoDAO { get; set; }
        public ServicoDAO ServicoDAO { get; set; }
        public OrdemServicoDAO OrdemServicoDAO { get; set; }
        public CondicaoPagamentoDAO CondicaoPagamentoDAO { get; set; }

        public OrdemServicoValidator(OrdemServicoDAO ordemServicoDAO, ProdutoDAO produtoDAO, ServicoDAO servicoDAO, CondicaoPagamentoDAO condicaoPagamentoDAO)
        {
            this.ProdutoDAO = produtoDAO ?? throw new ArgumentNullException(nameof(produtoDAO));
            this.ServicoDAO = servicoDAO ?? throw new ArgumentNullException(nameof(servicoDAO));
            this.OrdemServicoDAO = ordemServicoDAO ?? throw new ArgumentNullException(nameof(ordemServicoDAO));
            this.CondicaoPagamentoDAO = condicaoPagamentoDAO ?? throw new ArgumentNullException(nameof(condicaoPagamentoDAO));

            RuleFor(e => e.Id)
                .Must(ExistOrdemServico).WithMessage("Ordem de serviço não cadastrada.");

            RuleFor(e => e.CondicaoPagamentoId)
                .Must(ExistCondicaoPagamento).WithMessage("Condição de pagamento não cadastrada");

            RuleFor(e => e.DescricaoTecnico)
               .MaximumLength(255).WithMessage("Descrição não deve ter mais de 255 caracteres.");

            RuleFor(e => e.DescricaoObservacaoTecnico)
                .MaximumLength(255).WithMessage("Observações não deve ter mais de 255 caracteres.");

            RuleForEach(e => e.Produtos)
                 .Must(ExistProduto).WithMessage("Produto não cadastrado.");

            RuleForEach(e => e.Servicos)
                .Must(ExistServico).WithMessage("Serviço não cadastrado.");

            RuleFor(e => e.Servicos)
                .Must(e => e.Count > 0).WithMessage("Informe os serviços.");

        }
        private bool ExistCondicaoPagamento(OrdemServico os, int? id)
        {
            var findCondicaoPagamento = this.CondicaoPagamentoDAO.GetByID(id.Value);
            return findCondicaoPagamento != null && findCondicaoPagamento.Situacao == null;
        }

        private bool ExistProduto(OrdemServico os, OrdemServicoProduto produto)
        {
            var findProduto = this.ProdutoDAO.GetByID(produto.ProdutoId);
            return findProduto != null && findProduto.Situacao == null;
        }

        private bool ExistServico(OrdemServico os, OrdemServicoServico servico)
        {
            var findServico = this.ServicoDAO.GetByID(servico.ServicoId);
            return findServico != null && findServico.Situacao == null;
        }

        private bool ExistOrdemServico(OrdemServico os, int id)
        {
            return this.OrdemServicoDAO.GetByID(id) != null;
        }
    }
}
