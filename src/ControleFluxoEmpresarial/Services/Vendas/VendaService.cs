
using ControleFluxoEmpresarial.Architectures.Exceptions;
using ControleFluxoEmpresarial.DAOs.Movimentos;
using ControleFluxoEmpresarial.DAOs.Vendas;
using ControleFluxoEmpresarial.DTO.Users;
using ControleFluxoEmpresarial.Models.Movimentos;
using ControleFluxoEmpresarial.Models.OrdensServico;
using ControleFluxoEmpresarial.Models.Vendas;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ControleFluxoEmpresarial.Services.Vendas
{
    public class VendaService : IService
    {
        public VendaDAO VendaDAO { get; set; }
        public ProdutoDAO ProdutoDAO { get; set; }
        public UserRequest UserRequest { get; set; }
        public VendaProdutoDAO VendaProdutoDAO { get; set; }
        public VendaServicoDAO VendaServicoDAO { get; set; }
        public ContasReceberDAO ContasReceberDAO { get; set; }
        public VendaService(VendaDAO vendaDAO, ProdutoDAO produtoDAO, UserRequest userRequest, VendaProdutoDAO vendaProdutoDAO, VendaServicoDAO vendaServicoDAO, ContasReceberDAO contasReceberDAO)
        {
            VendaDAO = vendaDAO ?? throw new ArgumentNullException(nameof(vendaDAO));
            ProdutoDAO = produtoDAO ?? throw new ArgumentNullException(nameof(produtoDAO));
            UserRequest = userRequest ?? throw new ArgumentNullException(nameof(userRequest));
            VendaProdutoDAO = vendaProdutoDAO ?? throw new ArgumentNullException(nameof(vendaProdutoDAO));
            VendaServicoDAO = vendaServicoDAO ?? throw new ArgumentNullException(nameof(vendaServicoDAO));
            ContasReceberDAO = contasReceberDAO ?? throw new ArgumentNullException(nameof(contasReceberDAO));
        }



        public void VendaProduto(int OSId, string modelo, string serie, int clienteId, int condicaoPagamentoId, List<VendaProduto> produtos, List<ContaReceber> contasReceber, string descricao, bool commit)
        {
            var totalParcela = contasReceber?.Sum(e => e.Valor);
            var totalOS = produtos?.Sum(e => e.Quantidade * e.Valor);

            if (totalParcela != totalOS)
            {
                throw new BusinessException(new { Parcelas = "Soma das parcelas não confere com a soma dos Produtos." });
            }

            var venda = new Venda()
            {
                Serie = serie,
                Modelo = modelo,
                Numero = this.GetNumeroOS(OSId),
                ClienteId = clienteId,
                DataEmissao = DateTime.Now,
                Descricao = descricao,
                CondicaoPagamentoId = condicaoPagamentoId,
                OrdemServicoId = OSId,
            };
            this.VendaDAO.Insert(venda, false);

            SalvarProdutoVenda(produtos, venda);
            SalvarContasReceberVenda(contasReceber, venda);


            if (commit)
            {
                this.VendaDAO.Commit();
            }
        }

        public (List<ContaReceber> contasProduto, List<ContaReceber> contasServico) getParcelasCompra(int id, string modeloProduto, string modeloServico)
        {
            var parcelas = this.ContasReceberDAO.GetByOSID(id);

            return (parcelas?.Where(e => e.Modelo == modeloProduto).ToList(),
                    parcelas?.Where(e => e.Modelo == modeloServico).ToList());
        }

        public void VendaServico(int OSId, string modelo, string serie, int clienteId, int condicaoPagamentoId, List<VendaServico> servicos, List<ContaReceber> contasReceber, string descricao, bool commit)
        {
            var totalParcela = contasReceber?.Sum(e => e.Valor);
            var totalOS = servicos?.Sum(e => e.Quantidade * e.Valor);

            if (totalParcela != totalOS)
            {
                throw new BusinessException(new { Parcelas = "Soma das parcelas não confere com a soma dos Serviços." });
            }

            var venda = new Venda()
            {
                Serie = serie,
                Modelo = modelo,
                Numero = this.GetNumeroOS(OSId),
                ClienteId = clienteId,
                DataEmissao = DateTime.Now,
                Descricao = descricao,
                CondicaoPagamentoId = condicaoPagamentoId,
                OrdemServicoId = OSId,
            };
            this.VendaDAO.Insert(venda, false);


            SalvarServicoVenda(servicos, venda);
            SalvarContasReceberVenda(contasReceber, venda);


            if (commit)
            {
                this.VendaDAO.Commit();
            }
        }

        private void SalvarServicoVenda(List<VendaServico> servicos, Venda venda)
        {
            foreach (var servico in servicos)
            {
                servico.VendaSerie = venda.Serie;
                servico.VendaModelo = venda.Modelo;
                servico.VendaNumero = venda.Numero;

                this.VendaServicoDAO.Insert(servico, false);
            }
        }

        private void SalvarProdutoVenda(List<VendaProduto> produtos, Venda venda)
        {
            foreach (var produto in produtos)
            {
                var produtoDb = this.ProdutoDAO.GetByID(produto.ProdutoId);
                produtoDb.Quantidade -= produto.Quantidade;
                if (produtoDb.Quantidade < 0)
                {
                    throw new BusinessException(new { Produto = $"Estoque do produto \"{produtoDb.Nome}\" é insuficiente." });
                }
                this.ProdutoDAO.Update(produtoDb, false);


                produto.VendaSerie = venda.Serie;
                produto.VendaModelo = venda.Modelo;
                produto.VendaNumero = venda.Numero;

                this.VendaProdutoDAO.Insert(produto, false);
            }
        }

        private void SalvarContasReceberVenda(List<ContaReceber> contasReceber, Venda venda)
        {
            foreach (var contaReceber in contasReceber)
            {
                contaReceber.Serie = venda.Serie;
                contaReceber.Numero = venda.Numero;
                contaReceber.Modelo = venda.Modelo;
                contaReceber.ClienteId = venda.ClienteId;
                contaReceber.Descricao = venda.Descricao;
                contaReceber.Descricao = venda.Descricao;
                contaReceber.DataEmissao = DateTime.Now;

                this.ContasReceberDAO.Insert(contaReceber, false);
            }
        }

        private string GetNumeroOS(int oSId)
        {
            var numero = this.VendaDAO.GetNumeroByOS(oSId);
            if (!string.IsNullOrEmpty(numero))
            {
                return numero;
            }

            return this.VendaDAO.GetNewNumero();
        }
    }
}
