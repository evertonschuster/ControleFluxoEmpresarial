using ControleFluxoEmpresarial.Architectures.Exceptions;
using ControleFluxoEmpresarial.DAOs.Movimentos;
using ControleFluxoEmpresarial.DAOs.OrdensServico;
using ControleFluxoEmpresarial.DTO.OrdensServico;
using ControleFluxoEmpresarial.DTO.Users;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Movimentos;
using ControleFluxoEmpresarial.Models.OrdensServico;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ControleFluxoEmpresarial.Services.OrdensServico
{
    public class OrdemServicoService : IService
    {
        public OrdemServicoService(OrdemServicoDAO dAO, UserRequest userRequest,
            OrdemServicoProdutoDAO ordemServicoProdutoDAO, ProdutoDAO produtoDAO,
            OrdemServicoServicoDAO ordemServicoServicoDAO, ServicoDAO servicoDAO)
        {
            this.DAO = dAO ?? throw new ArgumentNullException(nameof(dAO));
            this.ServicoDAO = servicoDAO ?? throw new ArgumentNullException(nameof(servicoDAO));
            this.ProdutoDAO = produtoDAO ?? throw new ArgumentNullException(nameof(produtoDAO));
            this.UserRequest = userRequest ?? throw new ArgumentNullException(nameof(userRequest));
            this.OrdemServicoServicoDAO = ordemServicoServicoDAO ?? throw new ArgumentNullException(nameof(ordemServicoServicoDAO));
            this.OrdemServicoProdutoDAO = ordemServicoProdutoDAO ?? throw new ArgumentNullException(nameof(ordemServicoProdutoDAO));
        }

        public OrdemServicoDAO DAO { get; set; }
        public ServicoDAO ServicoDAO { get; set; }
        public ProdutoDAO ProdutoDAO { get; set; }
        public UserRequest UserRequest { get; set; }
        public OrdemServicoServicoDAO OrdemServicoServicoDAO { get; set; }
        public OrdemServicoProdutoDAO OrdemServicoProdutoDAO { get; set; }
        public ContaReceberDAO ContaReceberDAO { get; set; }

        public OrdemServico GetByID(int id)
        {
            var entity = this.DAO.GetByID(id);
            entity.Servicos = this.OrdemServicoServicoDAO.GetInOrdemServico(id) ?? new List<OrdemServicoServico>();
            entity.Produtos = this.OrdemServicoProdutoDAO.GetInOrdemServico(id) ?? new List<OrdemServicoProduto>();

            return entity;
        }

        public void Finalizar(OrdemServico os)
        {
            var totalParcela = os.Parcelas?.Sum(e => e.Valor);
            var totalOS = os.Servicos?.Sum(e => e.Quantidade * e.Valor);
            totalOS += os.Produtos?.Sum(e => e.Quantidade * e.Valor);


            if (os.Servicos.Count == 0)
            {
                throw new BusinessException(new { Servicos = "Informe um serviço." });
            }
            if (os.Parcelas.Count == 0)
            {
                throw new BusinessException(new { Parcelas = "Informe as parcelas." });
            }

            if (totalParcela != totalOS)
            {
                throw new BusinessException(new { Parcelas = "Soma das parcelas não confere com o valor da Ordem de Serviço." });
            }

            foreach (var produto in os.Produtos)
            {
                var produtoDb = this.ProdutoDAO.GetByID(produto.ProdutoId);
                produtoDb.Quantidade -= produto.Quantidade;
                if (produtoDb.Quantidade < 0)
                {
                    throw new BusinessException(new { Produto = $"Estoque do produto \"{produtoDb.Nome}\" é insuficiente." });
                }
                this.ProdutoDAO.Update(produtoDb, false);
            }

        }

        public int Insert(AbrirOrdemServico model)
        {
            var entity = new OrdemServico()
            {
                ClienteId = model.ClienteId,
                Telefone = model.Telefone,
                Contato = model.Contato,
                NumeroSerie = model.NumeroSerie,
                DescricaoEquipamento = model.DescricaoEquipamento,
                DescricaoProblemaRelatado = model.DescricaoProblemaRelatado,
                DescricaoAcessorio = model.DescricaoAcessorio,
                DescricaoObservacao = model.DescricaoObservacao,
                DataAbertura = DateTime.Now
            };

            return this.DAO.Insert(entity);
        }

        public DateTime Iniciar(int id)
        {
            var entity = this.DAO.GetByID(id);
            if (entity is null)
            {
                throw new BusinessException(new { Id = "Ordem de Serviço não cadastrada" });
            }

            entity.DataExecucao = DateTime.Now;
            this.DAO.Update(entity);

            return entity.DataExecucao.Value;
        }

        public void SalvarAndamento(AndamentoOrdemServico model)
        {
            var entity = this.GetByID(model.Id);


            foreach (var servico in model.Servicos)
            {
                servico.Valor = this.ServicoDAO.GetByID(servico.ServicoId).Valor;
                servico.OrdemServicoId = model.Id;

                if (entity.Servicos.Any(e => e.ServicoId == servico.ServicoId))
                {
                    var servicoEntity = this.OrdemServicoServicoDAO.GetByID(new OrdemServicoServicoId() { ServicoId = servico.ServicoId, OrdemServicoId = servico.OrdemServicoId });
                    servicoEntity.Valor = servico.Valor;
                    servicoEntity.Quantidade = servico.Quantidade;
                    servicoEntity.FuncionarioId = servico.FuncionarioId;

                    this.OrdemServicoServicoDAO.Update(servicoEntity, false);
                }
                else
                {
                    this.OrdemServicoServicoDAO.Insert(servico, false);
                }

                entity.Servicos = entity.Servicos.Where(e => e.ServicoId != servico.ServicoId).ToList();
            }
            foreach (var removerServ in entity.Servicos)
            {
                this.OrdemServicoServicoDAO.Delete(new OrdemServicoServicoId() { ServicoId = removerServ.ServicoId, OrdemServicoId = removerServ.OrdemServicoId }, false);
            }

            foreach (var produto in model.Produtos)
            {
                produto.Valor = this.ProdutoDAO.GetByID(produto.ProdutoId).ValorVenda;
                produto.OrdemServicoId = model.Id;

                if (entity.Produtos.Any(e => e.ProdutoId == produto.ProdutoId))
                {
                    var produtoEntity = this.OrdemServicoProdutoDAO.GetByID(new OrdemServicoProdutoId() { ProdutoId = produto.ProdutoId, OrdemServicoId = produto.OrdemServicoId });
                    produtoEntity.Valor = produto.Valor;
                    produtoEntity.Quantidade = produto.Quantidade;

                    this.OrdemServicoProdutoDAO.Update(produtoEntity, false);
                }
                else
                {
                    this.OrdemServicoProdutoDAO.Insert(produto, false);
                }
                entity.Produtos = entity.Produtos.Where(e => e.ProdutoId != produto.ProdutoId).ToList();
            }
            foreach (var produto in entity.Produtos)
            {
                this.OrdemServicoProdutoDAO.Delete(new OrdemServicoProdutoId() { ProdutoId = produto.ProdutoId, OrdemServicoId = produto.OrdemServicoId }, false);
            }


            entity.DescricaoTecnico = model.DescricaoTecnico;
            entity.CondicaoPagamentoId = model.CondicaoPagamentoId;
            entity.DescricaoObservacaoTecnico = model.DescricaoObservacaoTecnico;

            this.DAO.Update(entity);
        }

        public PaginationResult<OrdemServico> GetPagined<TSituacaoType>(PaginationQuery<TSituacaoType> filter)
        {
            return this.DAO.GetPagined(filter);
        }
    }
}
