using Microsoft.AspNetCore.Identity;

namespace ControleFluxoEmpresarial.Models.Pessoas
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }
        //int IBaseEntity.Id { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        //public DateTime DataCriacao { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        //public DateTime DataAtualizacao { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    }
}
