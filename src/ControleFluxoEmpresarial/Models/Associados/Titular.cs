using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Models.Associados
{
    public class Titular : Associado
    {
        public string CPF { get; set; }
        
        public string Email { get; set; }
        
        public string CEP { get; set; }
        
        public string Bairro { get; set; }
        
        public string Endereco { get; set; }

        public string Numero { get; set; }

        public List<Associado> Dependentes { get; set; }
    }
}
