using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Models.Pessoas
{
    public class Cliente : Pessoa
    {
        public decimal LimiteCredito { get; set; }

        public SexoType Sexo { get; set; }

        public EstadoCivilType EstadoCivil { get; set; }

        public TipoPessoaType Tipo { get; set; }
    }
}
