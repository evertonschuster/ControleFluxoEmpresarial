using ControleFluxoEmpresarial.Architectures;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.DTO.Users
{
    public class UserRequest
    {
        public UserRequest(IHttpContextAccessor httpContext)
        {
            var user = httpContext?.HttpContext?.User;
            if (user == null || !user.Identity.IsAuthenticated)
            {
                return;
            }


            this.Id = Guid.Parse(user.Claims.Where(e => e.Type == "Id").FirstOrDefault().Value);
            this.Nome = user.Claims.Where(e => e.Type == ClaimTypes.NameIdentifier).FirstOrDefault().Value;
        }

        public Guid Id { get; set; }

        public string Nome { get; set; }
    }
}
