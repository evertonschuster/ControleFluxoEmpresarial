﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.ModelView.Users
{
    public class AuthenticateModel
    {
        public string UserName { get; set; }

        public string Password { get; set; }
    }
}
