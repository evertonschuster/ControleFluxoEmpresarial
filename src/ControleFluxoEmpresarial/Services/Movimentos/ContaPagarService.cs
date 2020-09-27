using ControleFluxoEmpresarial.Architectures.Exceptions;
using ControleFluxoEmpresarial.DAOs.Compras;
using ControleFluxoEmpresarial.DAOs.Movimentos;
using ControleFluxoEmpresarial.DAOs.Pessoas;
using ControleFluxoEmpresarial.DTO.Movimentos;
using ControleFluxoEmpresarial.DTO.Users;
using ControleFluxoEmpresarial.Models.Movimentos;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ControleFluxoEmpresarial.Services.Movimentos
{
    public class ContaPagarService : IService
    {
        public ContaPagarService(ContaPagarDAO dAO, UserDAO userDAO, UserRequest userRequest, CompraDAO compraDAO)
        {
            ContaPagarDAO = dAO ?? throw new ArgumentNullException(nameof(dAO));
            UserDAO = userDAO ?? throw new ArgumentNullException(nameof(userDAO));
            CompraDAO = compraDAO ?? throw new ArgumentNullException(nameof(compraDAO));
            UserRequest = userRequest ?? throw new ArgumentNullException(nameof(userRequest));
        }

        public UserDAO UserDAO { get; set; }
        public CompraDAO CompraDAO { get; set; }
        public UserRequest UserRequest { get; set; }
        public ContaPagarDAO ContaPagarDAO { get; set; }

        public ContaPagarId Insert(ContaPagar entity, bool commit = true)
        {
            var findContaPagar = this.ContaPagarDAO.GetByID(entity.GetId());
            if (findContaPagar != null)
            {
                throw new BusinessException(new { Parcela = "Conta a Pagar já cadastrada." });
            }
            entity.DataBaixa = null;
            entity.DataPagamento = null;
            entity.UserBaixa = null;

            entity.UserCancelamento = null;
            entity.JustificativaCancelamento = null;
            entity.DataCancelamento = null;

            var id = this.ContaPagarDAO.Insert(entity, commit);
            return id;
        }

        public void Update(ContaPagar entity, bool commit = true)
        {
            var dbEntity = this.ContaPagarDAO.GetByID(entity.GetId());
            if (dbEntity == null)
            {
                throw new BusinessException(new { Parcela = "Conta a Pagar não cadastrada." });
            }

            if (dbEntity.Valor != entity.Valor)
            {
                throw new BusinessException(new { Valor = "Não pode alterar o valor." });
            }

            if (dbEntity.DataEmissao != entity.DataEmissao)
            {
                throw new BusinessException(new { DataEmissao = "Não pode alterar a data de emissão." });
            }

            this.ContaPagarDAO.Update(entity, commit);
        }

        //se Possuir uma compra, não pode cancelar
        public void Cancelar(CancelarContaPagar model)
        {
            var compra = this.CompraDAO.GetByID(new DTO.Compras.CompraId()
            {
                Serie = model.Serie,
                Modelo = model.Modelo,
                Numero = model.Numero,
                FornecedorId = model.FornecedorId
            });

            if (compra != null)
            {
                throw new BusinessException(new { Numero = "Não é possível cancelar uma conta a pagar lançada por uma compra" });
            }

            var result = this.UserDAO.PasswordSignIn(this.UserRequest.UserNome, model.Senha);
            if (!result.Succeeded)
            {
                throw new BusinessException(new { Senha = "Senha inválido" });
            }

            var entity = this.ContaPagarDAO.GetByID(model.GetId());
            if (entity == null)
            {
                throw new BusinessException(new { Parcela = "Conta a pagar não cadastrada." });
            }

            entity.JustificativaCancelamento = model.Justificativa;
            entity.UserCancelamento = this.UserRequest.Id.ToString();
            entity.DataCancelamento = DateTime.Now;

            this.ContaPagarDAO.Update(entity);
        }

        public void Pagar(PagarContaPagar model, bool commit = true)
        {
            var entity = this.ContaPagarDAO.GetByID(model.GetId());
            if (entity == null)
            {
                throw new BusinessException(new { Parcela = "Conta a pagar não cadastrada." });
            }

            CheckParcelaConfirmacao(model, model.Parcela);

            entity.Desconto = model.Desconto;
            entity.Multa = model.Multa;
            entity.Juro = model.Juro;
            entity.FormaPagamentoId = model.FormaPagamentoId;
            entity.DataVencimento = model.DataVencimento;
            entity.DataPagamento = model.DataPagamento;
            entity.Descricao = model.Descricao;

            entity.DataBaixa = DateTime.Now;
            entity.UserBaixa = this.ContaPagarDAO.Context.UserRequest.Id.ToString();
            this.ContaPagarDAO.Update(entity, commit);
        }

        public decimal CalcularValor(ContaPagarId id, DateTime? dataBase = null, decimal? desconto = null, decimal? multa = null, decimal? juro = null)
        {
            var entity = this.ContaPagarDAO.GetByID(id);
            dataBase ??= entity.DataVencimento;
            desconto ??= entity.Desconto;
            multa ??= entity.Multa;
            juro ??= entity.Juro;

            if (entity.DataPagamento != null)
            {
                return entity.ValorBaixa ?? 0;
            }

            if (dataBase >= DateTime.Now)
            {
                return entity.Valor - (desconto ?? 0);
            }

            return entity.Valor + (multa ?? 0) + (juro ?? 0);
        }



        private void CheckParcelaConfirmacao(PagarContaPagar contaPagar, int numeroParcela)
        {
            if (numeroParcela == 1 || contaPagar.ConfirmPagamento)
            {
                return;
            }

            var id = contaPagar.GetId();
            var parcelasPendentes = new List<int>(numeroParcela);

            for (int i = 1; i < numeroParcela; i++)
            {
                id.Parcela = i;
                var parcela = this.ContaPagarDAO.GetByID(id);
                if (parcela.DataPagamento == null)
                {
                    parcelasPendentes.Add(i);
                }
            }

            if (parcelasPendentes.Count == 0)
            {
                return;
            }

            if (parcelasPendentes.Count == 1)
            {
                throw new BusinessException(new { Parcela = $"A parcela {parcelasPendentes.First()} é anterior a esta e não está baixada, para baxair esta parcela confirme.", },
                        codeError: System.Net.HttpStatusCode.PreconditionRequired);
            }

            var str = parcelasPendentes.Aggregate("", (e, a) => $"{e}{a}, ");

            throw new BusinessException(new { Parcela = $"As parcelas {str} são anteriores a esta e não estão baixadas, para baxair esta parcela confirme.", },
                        codeError: System.Net.HttpStatusCode.PreconditionRequired);
        }
    }
}
