using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Models.Pessoas
{
    public class Associado : BaseEntity
    {
        public string Nome { get; set; }

        public string RG { get; set; }

        public string Telefone { get; set; }

        public DateTime DataNascimento { get; set; }

    }
}
