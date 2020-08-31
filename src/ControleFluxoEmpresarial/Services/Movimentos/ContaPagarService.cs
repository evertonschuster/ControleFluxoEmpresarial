using ControleFluxoEmpresarial.Architectures.Exceptions;
using ControleFluxoEmpresarial.DAOs.Movimentos;
using ControleFluxoEmpresarial.DAOs.Pessoas;
using ControleFluxoEmpresarial.DTO.Movimentos;
using ControleFluxoEmpresarial.DTO.Users;
using ControleFluxoEmpresarial.Models.Movimentos;
using ControleFluxoEmpresarial.Models.Pessoas;
using Microsoft.AspNetCore.Identity;
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
            if(entity == null)
            {
                throw new BusinessException(new { Parcela = "Conta a pagar não cadastrada." });
            }

            entity.JustificativaCancelamento = model.Justificativa;
            entity.UserCancelamento = this.UserRequest.Id.ToString();
            entity.DataCancelamento = DateTime.Now;

            this.ContaPagarDAO.Update(entity);
        }
    }
}
