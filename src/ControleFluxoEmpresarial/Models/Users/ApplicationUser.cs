using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Models.Users
{
    public class ApplicationUser : IdentityUser, IBaseEntity
    {
        int IBaseEntity.Id { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    }
}
