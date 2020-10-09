using ControleFluxoEmpresarial.Entities;
using ControleFluxoEmpresarial.Models.Movimentos;
using ControleFluxoEmpresarial.Models.Pessoas;
using System;

namespace ControleFluxoEmpresarial.Models.Vendas
{
    public class VendaServico : IBaseAuditoria, IBaseEntity
    {
        public string VendaNumero { get; set; }

        public string VendaSerie { get; set; }

        public string VendaModelo { get; set; }

        public Servico Servico { get; set; }
        public int ServicoId { get; set; }

        public Funcionario Funcionario { get; set; }

        public int FuncionarioId { get; set; }

        public decimal Quantidade { get; set; }

        public decimal Valor { get; set; }


        public DateTime DataCriacao { get; set; }
        public DateTime? DataAtualizacao { get; set; }
        public string UserCriacao { get; set; }
        public string UserAtualizacao { get; set; }
    }
}
