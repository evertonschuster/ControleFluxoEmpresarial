

using ControleFluxoEmpresarial.Architectures.Exceptions;
using ControleFluxoEmpresarial.DAOs.Movimentos;
using ControleFluxoEmpresarial.DAOs.Pessoas;
using ControleFluxoEmpresarial.DAOs.Vendas;
using ControleFluxoEmpresarial.DTO.Movimentos;
using ControleFluxoEmpresarial.DTO.Users;
using ControleFluxoEmpresarial.Models.Movimentos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;

namespace ControleFluxoEmpresarial.Services.Movimentos
{
    public class ContaReceberService : IService
    {
        public UserDAO UserDAO { get; set; }
        public VendaDAO VendaDAO { get; set; }
        public UserRequest UserRequest { get; set; }
        public ContaReceberDAO ContaReceberDAO { get; set; }

        public ContaReceberService(UserDAO userDAO, UserRequest userRequest, ContaReceberDAO contaReceberDAO, VendaDAO vendaDAO)
        {
            UserDAO = userDAO ?? throw new ArgumentNullException(nameof(userDAO));
            VendaDAO = vendaDAO ?? throw new ArgumentNullException(nameof(vendaDAO));
            UserRequest = userRequest ?? throw new ArgumentNullException(nameof(userRequest));
            ContaReceberDAO = contaReceberDAO ?? throw new ArgumentNullException(nameof(contaReceberDAO));
        }


        public ContaReceberId Insert(ContaReceber entity, bool commit = true)
        {
            var findContaPagar = this.ContaReceberDAO.GetByID(entity.GetId());
            if (findContaPagar != null)
            {
                throw new BusinessException(new { Parcela = "Conta a Receber já cadastrada." });
            }
            entity.DataBaixa = null;
            entity.DataPagamento = null;
            entity.UserBaixa = null;

            entity.UserCancelamento = null;
            entity.JustificativaCancelamento = null;
            entity.DataCancelamento = null;

            return this.ContaReceberDAO.Insert(entity, commit);
        }

        public void Update(ContaReceber entity, bool commit = true)
        {
            var dbEntity = this.ContaReceberDAO.GetByID(entity.GetId());
            if (dbEntity == null)
            {
                throw new BusinessException(new { Parcela = "Conta a Receber não cadastrada." });
            }
            if (dbEntity.Valor != entity.Valor)
            {
                throw new BusinessException(new { Valor = "Não pode alterar o valor." });
            }

            if (dbEntity.DataEmissao != entity.DataEmissao)
            {
                throw new BusinessException(new { DataEmissao = "Não pode alterar a data de emissão." });
            }

            this.ContaReceberDAO.Update(entity, commit);

        }

        public List<ContaReceber> GetInVenda(VendaId vendaId)
        {
            return this.ContaReceberDAO.GetInVenda(vendaId);
        }

        public void Ativar(ContaReceberId id)
        {
            var compra = this.VendaDAO.GetByID(new VendaId
            {
                Serie = id.Serie,
                Modelo = id.Modelo,
                Numero = id.Numero,
            });

            if (compra != null)
            {
                throw new BusinessException(new { Numero = "Não é possível Ativar uma Conta a Receber lançada por uma Venda" });
            }

            var conta = this.ContaReceberDAO.GetByID(id);

            conta.DataCancelamento = null;
            conta.UserCancelamento = null;

            this.ContaReceberDAO.Update(conta);
        }

        public void Cancelar(CancelarContaReceber model)
        {
            var compra = this.VendaDAO.GetByID(new VendaId()
            {
                Serie = model.Serie,
                Modelo = model.Modelo,
                Numero = model.Numero,
            });

            if (compra != null)
            {
                throw new BusinessException(new { Numero = "Não é possível cancelar uma Conta a Receber lançada por uma Venda" });
            }

            var result = this.UserDAO.PasswordSignIn(this.UserRequest.UserNome, model.Senha);
            if (!result.Succeeded)
            {
                throw new BusinessException(new { Senha = "Senha inválido" });
            }

            var entity = this.ContaReceberDAO.GetByID(model.GetId());
            if (entity == null)
            {
                throw new BusinessException(new { Parcela = "Conta a pagar não cadastrada." });
            }

            entity.JustificativaCancelamento = model.Justificativa;
            entity.UserCancelamento = this.UserRequest.Id.ToString();
            entity.DataCancelamento = DateTime.Now;

            this.ContaReceberDAO.Update(entity);
        }

        public void CancelarBaixa(CancelarContaReceber model)
        {
            var entity = this.ContaReceberDAO.GetByID(model.GetId());
            if (entity == null)
            {
                throw new BusinessException(new { Parcela = "Conta a pagar não cadastrada." });
            }

            var login = UserDAO.PasswordSignIn(this.UserRequest.UserNome, model.Senha);
            if (!login.Succeeded)
            {
                throw new BusinessException(new { senha = "Senha inválida" });
            }

            entity.DataBaixa = null;
            entity.UserBaixa = null;
            entity.DataPagamento = null;
            entity.ValorBaixa = null;

            entity.JustificativaCancelamentoBaixa = model.Justificativa;
            entity.UserCancelamentoBaixa = this.UserRequest.Id.ToString();
            entity.DataCancelamentoBaixa = DateTime.Now;

            this.ContaReceberDAO.Update(entity);
        }

        public void Receber(ReceberContaReceber contaReceber)
        {
            var dbEntity = this.ContaReceberDAO.GetByID(contaReceber.GetId());
            if (dbEntity == null)
            {
                throw new BusinessException(new { Parcela = "Conta a Receber não cadastrada." });
            }
            if (contaReceber.ValorBaixa < contaReceber.Desconto)
            {
                throw new BusinessException(new { Desconto = "Desconto não pode ser maior que o valor da Conta." });
            }
            if (dbEntity.DataCancelamento != null)
            {
                throw new BusinessException(new { Parcela = "Conta a Receber Cancelada." });
            }
            if (dbEntity.DataPagamento != null)
            {
                throw new BusinessException(new { Parcela = "Conta a Receber Paga." });
            }

            CheckParcelaConfirmacao(contaReceber, contaReceber.Parcela);
           
            dbEntity.Desconto = contaReceber.Desconto;
            dbEntity.Multa = contaReceber.Multa;
            dbEntity.Juro = contaReceber.Juro;
            dbEntity.ValorBaixa = contaReceber.ValorBaixa;
            dbEntity.FormaPagamentoId = contaReceber.FormaPagamentoId;
            dbEntity.DataVencimento = contaReceber.DataVencimento;
            dbEntity.DataPagamento = contaReceber.DataPagamento;
            dbEntity.Descricao = contaReceber.Descricao;

            dbEntity.DataBaixa = DateTime.Now;
            dbEntity.UserBaixa = this.UserRequest.Id.ToString();

            this.ContaReceberDAO.Update(dbEntity);
        }

        public object CalcularValor(ContaReceberId id)
        {
            throw new NotImplementedException();
        }

        public List<ContaReceber> GetByOSID(int id)
        {
            return this.ContaReceberDAO.GetByOSID(id);
        }



        private void CheckParcelaConfirmacao(ReceberContaReceber contaPagar, int numeroParcela)
        {
            if (numeroParcela == 1)
            {
                return;
            }

            if (!string.IsNullOrEmpty(contaPagar.Senha))
            {
                var login = UserDAO.PasswordSignIn(this.UserRequest.UserNome, contaPagar.Senha);
                if (login.Succeeded)
                {
                    return;
                }

                throw new BusinessException(new { senha = "Senha inválida" });
            }

            var id = contaPagar.GetId();
            var parcelasPendentes = new List<int>(numeroParcela);

            for (int i = 1; i < numeroParcela; i++)
            {
                id.Parcela = i;
                var parcela = this.ContaReceberDAO.GetByID(id);
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
