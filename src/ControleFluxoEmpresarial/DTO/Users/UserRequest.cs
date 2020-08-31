using Microsoft.AspNetCore.Http;
using System;
using System.Linq;
using System.Security.Claims;

namespace ControleFluxoEmpresarial.DTO.Users
{
    public class UserRequest
    {
        public UserRequest(IHttpContextAccessor httpContext)
        {
            this.User = httpContext?.HttpContext?.User;
            if (this.User == null || !this.User.Identity.IsAuthenticated)
            {
                return;
            }


            this.Id = Guid.Parse(this.User.Claims.Where(e => e.Type == "Id").FirstOrDefault().Value);
            this.Nome = this.User.Claims.Where(e => e.Type == ClaimTypes.Name).FirstOrDefault().Value;
            this.UserNome = this.User.Claims.Where(e => e.Type == ClaimTypes.NameIdentifier).FirstOrDefault().Value;
        }

        public Guid Id { get; set; }

        public string Nome { get; set; }
        public string UserNome { get; set; }

        public ClaimsPrincipal User { get; set; }
    }
}
