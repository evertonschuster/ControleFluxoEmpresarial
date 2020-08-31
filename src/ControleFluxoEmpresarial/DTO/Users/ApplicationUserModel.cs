using System.ComponentModel.DataAnnotations.Schema;

namespace ControleFluxoEmpresarial.DTO.Users
{
    public class ApplicationUserModel
    {
        public string Email { get; set; }

        public string UserName { get; set; }

        public string Name { get; set; }

        public string PhoneNumber { get; set; }

        [NotMapped]
        public string Password { get; set; }

        [NotMapped]
        public string ConfirmPassword { get; set; }
    }
}
