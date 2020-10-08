
using ControleFluxoEmpresarial.Entities;
using ControleFluxoEmpresarial.Models.Movimentos;
using System;

namespace ControleFluxoEmpresarial.Models.OrdensServico
{
    public class OrdemServicoProduto : IBaseAuditoria, IBaseEntity
    {
        public int OrdemServicoId { get; set; }

        public int ProdutoId { get; set; }

        public Produto Produto { get; set; }

        public decimal Quantidade { get; set; }

        public decimal Valor { get; set; }


        public DateTime DataCriacao { get; set; }
        public string UserCriacao { get; set; }
        public DateTime? DataAtualizacao { get; set; }
        public string UserAtualizacao { get; set; }
    }
}
