using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Models.Cidades
{
    public class Estado : BaseEntity
    {
        public string Nome { get; set; }

        public string UF { get; set; }

        [JsonIgnore]
        public Pais Pais { get; set; }

        public int PaisId { get; set; }
    }
}
