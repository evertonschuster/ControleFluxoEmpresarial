using ControleFluxoEmpresarial.Entities;
using System;

namespace ControleFluxoEmpresarial.Models.Compras
{
    public class Compra : IBaseAuditoria, IBaseSituacao, IBaseEntity
    {
        public DateTime? Situacao { get; set; }

        public DateTime DataCriacao { get; set; }

        public DateTime? DataAtualizacao { get; set; }
        public string UserCriacao { get; set; }
        public string? UserAtualizacao { get; set; }
    }
}
