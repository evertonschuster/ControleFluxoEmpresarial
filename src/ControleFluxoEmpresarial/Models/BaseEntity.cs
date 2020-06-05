using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Models
{
    public abstract class BaseEntity : IBaseEntity<int>
    {
        public int Id { get; set; }

        public DateTime DataCriacao { get; set; }

        public DateTime DataAtualizacao { get; set; }
    }

    public interface IBaseEntity<TId>
    {
        [JsonProperty(Order = 1)]
        TId Id { get; set; }

        DateTime DataCriacao { get; set; }

        DateTime DataAtualizacao { get; set; }
    }

}
