using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DTO.Users
{
    public class LoginModel
    {
        //[Required]
        public string grant_type { get; set; }

        public string username { get; set; }
        public string password { get; set; }
        public string refresh_token { get; set; }

        // Optional
        //public string scope { get; set; }
    }


}
