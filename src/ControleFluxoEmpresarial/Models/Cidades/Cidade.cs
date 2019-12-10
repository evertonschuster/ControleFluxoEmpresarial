using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Models.Cidades
{
    public class Cidade : BaseEntity
    {
        public string Nome { get; set; }

        public string DDD { get; set; }

        [JsonIgnore]
        public Estado Estado { get; set; }

        public int EstadoId { get; set; }
    }
}
