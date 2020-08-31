using ControleFluxoEmpresarial.Entities;
using ControleFluxoEmpresarial.Models.Pessoas;
using System;

namespace ControleFluxoEmpresarial.Models.Vendas
{
    public class Venda : IBaseAuditoria, IBaseSituacao, IBaseEntity
    {
        public string Numero { get; set; }

        public string Serie { get; set; }

        public string Modelo { get; set; }

        public string Descricao { get; set; }

        public decimal Desconto { get; set; }

        public decimal Acrescimo { get; set; }

        public DateTime DataEmissao { get; set; }


        public Cliente Cliente { get; set; }
        public int ClienteId { get; set; }


        public Funcionario Funcionario { get; set; }
        public int FuncionarioId { get; set; }

        public int ContasReceberId { get; set; }
        public int CondicaoPagamentoId { get; set; }
        public int OrdemServicosId { get; set; }

        public DateTime? Situacao { get; set; }
        public DateTime DataCriacao { get; set; }
        public DateTime? DataAtualizacao { get; set; }
        public string UserCriacao { get; set; }
        public string? UserAtualizacao { get; set; }
    }
}
