using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Entities
{
    public abstract class BaseEntity : IBaseEntity
    {
        public DateTime DataCriacao { get; set; }

        public DateTime DataAtualizacao { get; set; }
    }

    public interface IBaseEntity
    {
        DateTime DataCriacao { get; set; }

        DateTime DataAtualizacao { get; set; }
    }
}
