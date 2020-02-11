using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.ModelView.Users
{
    public class ApplicationUserModel
    {
        public string Email { get; set; }

        public string UserName { get; set; }

        public string PhoneNumber { get; set; }

        [NotMapped]
        public string Password { get; set; }

        [NotMapped]
        public string ConfirmPassword { get; set; }
    }
}
