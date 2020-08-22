using ControleFluxoEmpresarial.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Models.Compras
{
    public class Compra : IBaseAuditoria, IBaseSituacao, IBaseEntity
    {
        public DateTime? Situacao { get; set; }

        public DateTime DataCriacao { get; set; }

        public DateTime DataAtualizacao { get; set; }
    }
}
