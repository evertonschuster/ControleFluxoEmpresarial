using ControleFluxoEmpresarial.Architectures.Exceptions;
using ControleFluxoEmpresarial.DAOs.Movimentos;
using ControleFluxoEmpresarial.DAOs.OrdensServico;
using ControleFluxoEmpresarial.DAOs.Pessoas;
using ControleFluxoEmpresarial.DAOs.Vendas;
using ControleFluxoEmpresarial.DTO.OrdensServico;
using ControleFluxoEmpresarial.DTO.Users;
using ControleFluxoEmpresarial.Filters.DTO;
using ControleFluxoEmpresarial.Models.Movimentos;
using ControleFluxoEmpresarial.Models.OrdensServico;
using ControleFluxoEmpresarial.Models.Vendas;
using ControleFluxoEmpresarial.Services.Users;
using ControleFluxoEmpresarial.Services.Vendas;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ControleFluxoEmpresarial.Services.OrdensServico
{
    public class OrdemServicoService : IService
    {
        public OrdemServicoService(OrdemServicoDAO dAO, UserRequest userRequest,
            OrdemServicoProdutoDAO ordemServicoProdutoDAO, ProdutoDAO produtoDAO,
            OrdemServicoServicoDAO ordemServicoServicoDAO, ServicoDAO servicoDAO,
            VendaService vendaService, VendaDAO vendaDAO, UserDAO userDAO)
        {
            this.DAO = dAO ?? throw new ArgumentNullException(nameof(dAO));
            this.UserDAO = userDAO ?? throw new ArgumentNullException(nameof(userDAO));
            this.VendaDAO = vendaDAO ?? throw new ArgumentNullException(nameof(vendaDAO));
            this.ServicoDAO = servicoDAO ?? throw new ArgumentNullException(nameof(servicoDAO));
            this.ProdutoDAO = produtoDAO ?? throw new ArgumentNullException(nameof(produtoDAO));
            this.UserRequest = userRequest ?? throw new ArgumentNullException(nameof(userRequest));
            this.VendaService = vendaService ?? throw new ArgumentNullException(nameof(vendaService));
            this.OrdemServicoServicoDAO = ordemServicoServicoDAO ?? throw new ArgumentNullException(nameof(ordemServicoServicoDAO));
            this.OrdemServicoProdutoDAO = ordemServicoProdutoDAO ?? throw new ArgumentNullException(nameof(ordemServicoProdutoDAO));
        }

        public VendaDAO VendaDAO { get; set; }
        public OrdemServicoDAO DAO { get; set; }
        public ServicoDAO ServicoDAO { get; set; }
        public ProdutoDAO ProdutoDAO { get; set; }
        public UserRequest UserRequest { get; set; }
        public UserDAO UserDAO { get; set; }
        public VendaService VendaService { get; set; }
        public OrdemServicoServicoDAO OrdemServicoServicoDAO { get; set; }
        public OrdemServicoProdutoDAO OrdemServicoProdutoDAO { get; set; }

        public OrdemServico GetByID(int id)
        {
            var entity = this.DAO.GetByID(id);
            if (entity != null)
            {
                entity.Servicos = this.OrdemServicoServicoDAO.GetInOrdemServico(id) ?? new List<OrdemServicoServico>();
                entity.Produtos = this.OrdemServicoProdutoDAO.GetInOrdemServico(id) ?? new List<OrdemServicoProduto>();

                (entity.ParcelasProduto, entity.ParcelasServico) = this.VendaService.GetParcelasCompra(id, "55", "65");
            }

            return entity;
        }

        public void Cancelar(CancelarOrdemServico cancelar)
        {
            var compra = this.VendaDAO.GetByOSID(cancelar.Id)?.Where(e => e.DataCancelamento != null).ToList();
            if (compra?.Count > 0)
            {
                throw new BusinessException(new { Id = "Não é possível desativar, pois existe venda(s) ativa(s)." });
            }
            if (cancelar.Justificativa.Length < 20)
            {
                throw new BusinessException(new { Justificativa = "Justificativa deve ter mais de 20 caracteres." });
            }
            if (cancelar.Justificativa.Length > 255)
            {
                throw new BusinessException(new { Justificativa = "Justificativa deve ter menos de 255 caracteres." });
            }
            if (!this.UserDAO.PasswordSignIn(this.UserRequest.UserNome, cancelar.Senha).Succeeded)
            {
                throw new BusinessException(new { Senha = "Senha inválida." });
            }

            var OS = this.DAO.GetByID(cancelar.Id);
            OS.DataCancelamento = DateTime.Now;
            OS.UserCancelamento = this.UserRequest.Id.ToString();
            OS.JustificativaCancelamento = cancelar.Justificativa;

            this.DAO.Update(OS);
        }

        public void Finalizar(OrdemServico os)
        {
            var totalParcela = os.ParcelasProduto?.Sum(e => e.Valor)
                + os.ParcelasServico?.Sum(e => e.Valor);
            var totalOS = os.Servicos?.Sum(e => e.Quantidade * e.Valor)
                + os.Produtos?.Sum(e => e.Quantidade * e.Valor);


            if (os.Servicos.Count == 0)
            {
                throw new BusinessException(new { Servicos = "Informe um serviço." });
            }
            if (os.ParcelasServico.Count == 0)
            {
                throw new BusinessException(new { Parcelas = "Informe as parcelas do Serviço." });
            }
            if (os.Produtos.Count > 0 && os.ParcelasProduto.Count == 0)
            {
                throw new BusinessException(new { Parcelas = "Informe as parcelas dos Produtos." });
            }


            var produtoVenda = os.Produtos.Select(e => new VendaProduto()
            {
                Valor = e.Valor,
                ProdutoId = e.ProdutoId,
                Quantidade = e.Quantidade,
            }).ToList();

            if (produtoVenda.Count > 0)
            {
                var venda = new Venda()
                {
                    Serie = "1",
                    Modelo = "55",
                    ClienteId = os.ClienteId,
                    Descricao = "Lançada a partir de OS",
                    CondicaoPagamentoId = os.CondicaoPagamentoId.Value,
                    OrdemServicoId = os.Id,
                    Produtos = produtoVenda,
                    Parcelas = os.ParcelasProduto,
                };

                this.VendaService.VendaProduto(venda, false);
            }

            var servicoVenda = os.Servicos.Select(e => new VendaServico()
            {
                Valor = e.Valor,
                ServicoId = e.ServicoId,
                Quantidade = e.Quantidade,
                FuncionarioId = e.FuncionarioId,
            }).ToList();

            if (servicoVenda.Count > 0)
            {
                var venda = new Venda()
                {
                    Serie = "1",
                    Modelo = "65",
                    ClienteId = os.ClienteId,
                    Descricao = "Lançada a partir de OS",
                    CondicaoPagamentoId = os.CondicaoPagamentoId.Value,
                    OrdemServicoId = os.Id,
                    Parcelas = os.ParcelasServico,
                    Servicos = servicoVenda
                };

                this.VendaService.VendaServico(venda, false);
            }

            os.DataDevolucaoCliente = DateTime.Now;
            this.Update(os);
        }

        public int Insert(AbrirOrdemServico model)
        {
            var entity = new OrdemServico()
            {
                ClienteId = model.ClienteId,
                Telefone = model.Telefone,
                Contato = model.Contato,
                NumeroSerie = model.NumeroSerie,
                EquipamentoId = model.EquipamentoId,
                ProblemaRelatadoId = model.ProblemaRelatadoId,
                DescricaoAcessorio = model.DescricaoAcessorio,
                DescricaoObservacao = model.DescricaoObservacao,
                DataAbertura = DateTime.Now,
                OrdemServicoId = model.OrdemServicoId
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
            var os = new OrdemServico()
            {
                Id = model.Id,
                DescricaoTecnico = model.DescricaoTecnico,
                CondicaoPagamentoId = model.CondicaoPagamentoId,
                DescricaoObservacaoTecnico = model.DescricaoObservacaoTecnico,
                Servicos = model.Servicos,
                Produtos = model.Produtos
            };

            this.Update(os);
        }

        public PaginationResult<OrdemServico> GetPagined<TSituacaoType>(PaginationQuery<TSituacaoType> filter)
        {
            return this.DAO.GetPagined(filter);
        }


        private void Update(OrdemServico model)
        {
            var entity = this.GetByID(model.Id);

            foreach (var servico in model.Servicos)
            {
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
            entity.DataDevolucaoCliente = model.DataDevolucaoCliente;

            this.DAO.Update(entity);
        }
    }
}
