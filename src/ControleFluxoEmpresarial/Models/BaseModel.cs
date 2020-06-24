using ControleFluxoEmpresarial.Entities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Models
{
    public abstract class BaseModel : IBaseModel<int>
    {
        public int Id { get; set; }

        public DateTime DataCriacao { get; set; }

        public DateTime DataAtualizacao { get; set; }
    }

    public interface IBaseModel<TId> : IBaseEntity
    {
        [JsonProperty(Order = 1)]
        TId Id { get; set; }
    }

}
