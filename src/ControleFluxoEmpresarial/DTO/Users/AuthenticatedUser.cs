using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DTO.Users
{
    public class AuthenticatedUser
    {
        [DataMember]
        public string Token { get; set; }

        [DataMember]
        public string UserName { get; set; }

        [DataMember]
        public string Name { get; set; }
    }
}
