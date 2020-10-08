

using ControleFluxoEmpresarial.Entities;
using ControleFluxoEmpresarial.Models.Movimentos;
using ControleFluxoEmpresarial.Models.Pessoas;
using System;

namespace ControleFluxoEmpresarial.Models.OrdensServico
{
    public class OrdemServicoServico : IBaseAuditoria, IBaseEntity
    {
        public int OrdemServicoId { get; set; }

        public int ServicoId { get; set; }

        public decimal Valor { get; set; }

        public Servico Servico { get; set; }

        public int FuncionarioId { get; set; }

        public Funcionario Funcionario { get; set; }

        public decimal Quantidade { get; set; }

        public DateTime DataCriacao { get; set; }
        public string UserCriacao { get; set; }
        public DateTime? DataAtualizacao { get; set; }
        public string UserAtualizacao { get; set; }
    }
}
