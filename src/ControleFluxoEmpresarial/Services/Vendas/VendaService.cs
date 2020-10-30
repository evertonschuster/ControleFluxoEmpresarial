
using ControleFluxoEmpresarial.Architectures.Exceptions;
using ControleFluxoEmpresarial.DAOs.Movimentos;
using ControleFluxoEmpresarial.DAOs.Pessoas;
using ControleFluxoEmpresarial.DAOs.Vendas;
using ControleFluxoEmpresarial.DTO.Filters;
using ControleFluxoEmpresarial.DTO.Users;
using ControleFluxoEmpresarial.DTO.Vendas;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Movimentos;
using ControleFluxoEmpresarial.Models.Vendas;
using ControleFluxoEmpresarial.Services.Movimentos;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ControleFluxoEmpresarial.Services.Vendas
{
    public class VendaService : IService
    {
        public UserDAO UserDAO { get; set; }
        public VendaDAO VendaDAO { get; set; }
        public ProdutoDAO ProdutoDAO { get; set; }
        public UserRequest UserRequest { get; set; }
        public VendaProdutoDAO VendaProdutoDAO { get; set; }
        public VendaServicoDAO VendaServicoDAO { get; set; }
        public ContaReceberService ContaReceberService { get; set; }

        public VendaService(VendaDAO vendaDAO, ProdutoDAO produtoDAO, UserRequest userRequest,
                VendaProdutoDAO vendaProdutoDAO, VendaServicoDAO vendaServicoDAO,
                ContaReceberService contaReceberService, UserDAO userDAO)
        {
            UserDAO = userDAO ?? throw new ArgumentNullException(nameof(userDAO));
            VendaDAO = vendaDAO ?? throw new ArgumentNullException(nameof(vendaDAO));
            ProdutoDAO = produtoDAO ?? throw new ArgumentNullException(nameof(produtoDAO));
            UserRequest = userRequest ?? throw new ArgumentNullException(nameof(userRequest));
            VendaProdutoDAO = vendaProdutoDAO ?? throw new ArgumentNullException(nameof(vendaProdutoDAO));
            VendaServicoDAO = vendaServicoDAO ?? throw new ArgumentNullException(nameof(vendaServicoDAO));
            ContaReceberService = contaReceberService ?? throw new ArgumentNullException(nameof(contaReceberService));
        }

        public Venda GetByID(VendaId vendaId)
        {
            var venda = this.VendaDAO.GetByID(vendaId);
            if (venda != null)
            {
                venda.Produtos = this.VendaProdutoDAO.GetInVenda(vendaId);
                venda.Servicos =this.VendaServicoDAO.GetInVenda(vendaId);
                venda.Parcelas = this.ContaReceberService.GetInVenda(vendaId);
            }

            return venda;
        }

        //Cancelar 
        //Se uma parcela ja for dado baixa n pode, precisa cancelar a baixa
        //Cancelar compra, deve voltar o valor original do produto
        public void Cancelar(CancelarVenda cancelarVenda)
        {
            var result = this.UserDAO.PasswordSignIn(this.UserRequest.UserNome, cancelarVenda.Senha);
            if (!result.Succeeded)
            {
                throw new BusinessException(new { Senha = "Senha inválido" });
            }

            var id = new VendaId()
            {
                Modelo = cancelarVenda.Modelo,
                Serie = cancelarVenda.Serie,
                Numero = cancelarVenda.Numero
            };

            var venda = this.GetByID(id);
            var dataCancelamento = DateTime.Now;

            foreach (var parcela in venda.Parcelas)
            {
                if (parcela.DataBaixa != null)
                {
                    throw new BusinessException(new { Numero = "Compra já possuir uma conta a pagar baixada." });
                }

                parcela.DataCancelamento = dataCancelamento;
                parcela.UserCancelamento = UserRequest.Id.ToString();
                parcela.JustificativaCancelamento = cancelarVenda.Justificativa;
                this.ContaReceberService.Update(parcela, false);
            }

            foreach (var produto in venda.Produtos)
            {
                var produtoDb = this.ProdutoDAO.GetByID(produto.ProdutoId);
                produtoDb.Quantidade += produto.Quantidade;
                this.ProdutoDAO.Update(produtoDb, false);
            }

            venda.DataCancelamento = dataCancelamento;
            venda.UserCancelamento = UserRequest.Id.ToString();
            venda.JustificativaCancelamento = cancelarVenda.Justificativa;
            this.VendaDAO.Update(venda);
        }

        public PaginationResult<Venda> GetPagined(PaginationQuery<SituacaoType?> filter)
        {
            var result = this.VendaDAO.GetPagined(filter);
            foreach (var venda in result.Result)
            {
                venda.Produtos = VendaProdutoDAO.GetInVenda(venda.GetId());
            }

            return result;
        }

        public void VendaProduto(Venda venda, bool commit = true)
        {
            var totalParcela = venda.Parcelas?.Sum(e => e.Valor);
            var totalOS = venda.Produtos?.Sum(e => e.Quantidade * e.Valor);

            if (totalParcela != totalOS)
            {
                throw new BusinessException(new { Parcelas = "Soma das parcelas não confere com a soma dos Produtos." });
            }

            venda.Numero = this.GetNumeroOS(venda.OrdemServicoId);
            venda.DataEmissao = DateTime.Now;

            this.VendaDAO.Insert(venda, false);
            SalvarProdutoVenda(venda.Produtos, venda);
            SalvarContasReceberVenda(venda.Parcelas, venda);


            if (commit)
            {
                this.VendaDAO.Commit();
            }
        }

        public (List<ContaReceber> contasProduto, List<ContaReceber> contasServico) GetParcelasCompra(int id, string modeloProduto, string modeloServico)
        {
            var parcelas = this.ContaReceberService.GetByOSID(id);

            return (parcelas?.Where(e => e.Modelo == modeloProduto).ToList(),
                    parcelas?.Where(e => e.Modelo == modeloServico).ToList());
        }

        public void VendaServico(Venda venda, bool commit = true)
        {
            var totalParcela = venda.Parcelas?.Sum(e => e.Valor);
            var totalOS = venda.Servicos?.Sum(e => e.Quantidade * e.Valor);

            if (totalParcela != totalOS)
            {
                throw new BusinessException(new { Parcelas = "Soma das parcelas não confere com a soma dos Serviços." });
            }

            venda.Numero = this.GetNumeroOS(venda.OrdemServicoId);
            venda.DataEmissao = DateTime.Now;

            this.VendaDAO.Insert(venda, false);
            SalvarServicoVenda(venda.Servicos, venda);
            SalvarContasReceberVenda(venda.Parcelas, venda);


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

                this.ContaReceberService.Insert(contaReceber, false);
            }
        }

        private string GetNumeroOS(int? oSId)
        {
            if (oSId == null)
            {
                return this.VendaDAO.GetNewNumero();
            }

            var numero = this.VendaDAO.GetNumeroByOS(oSId.Value);
            if (!string.IsNullOrEmpty(numero))
            {
                return numero;
            }

            return this.VendaDAO.GetNewNumero();
        }
    }
}
