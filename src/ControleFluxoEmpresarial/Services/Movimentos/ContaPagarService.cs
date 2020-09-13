using ControleFluxoEmpresarial.Architectures.Exceptions;
using ControleFluxoEmpresarial.DAOs.Movimentos;
using ControleFluxoEmpresarial.DAOs.Pessoas;
using ControleFluxoEmpresarial.DTO.Movimentos;
using ControleFluxoEmpresarial.DTO.Users;
using ControleFluxoEmpresarial.Models.Movimentos;
using System;

namespace ControleFluxoEmpresarial.Services.Movimentos
{
    public class ContaPagarService : IService
    {
        public ContaPagarService(ContaPagarDAO dAO, UserDAO userDAO, UserRequest userRequest)
        {
            ContaPagarDAO = dAO ?? throw new ArgumentNullException(nameof(dAO));
            UserDAO = userDAO ?? throw new ArgumentNullException(nameof(userDAO));
            UserRequest = userRequest ?? throw new ArgumentNullException(nameof(userRequest));
        }

        public ContaPagarDAO ContaPagarDAO { get; set; }
        public UserDAO UserDAO { get; set; }
        public UserRequest UserRequest { get; set; }

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

        public void Cancelar(CancelarContaPagar model)
        {
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

        public void Pagar(ContaPagar model, bool commit = true)
        {
            if (model.DataBaixa == null)
            {
                throw new BusinessException(new { DataBaixa = "Data Baixa inválida." });
            }
            if (model.DataPagamento == null)
            {
                throw new BusinessException(new { DataPagamento = "Data Pagamento inválida." });
            }

            var entity = this.ContaPagarDAO.GetByID(model.GetId());
            if (entity == null)
            {
                throw new BusinessException(new { Parcela = "Conta a pagar não cadastrada." });
            }

            model.UserBaixa = this.ContaPagarDAO.Context.UserRequest.Id.ToString();
            this.ContaPagarDAO.Update(model, commit);
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

    }
}
