using System.Runtime.Serialization;

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
