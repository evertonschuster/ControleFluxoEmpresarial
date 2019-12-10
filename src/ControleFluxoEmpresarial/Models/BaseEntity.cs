using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Models
{
    public abstract class BaseEntity : IBaseEntity
    {
        public int Id { get; set; }
    }

    public interface IBaseEntity
    {
        [JsonProperty(Order = 1)]
        int Id { get; set; }

    }

}
