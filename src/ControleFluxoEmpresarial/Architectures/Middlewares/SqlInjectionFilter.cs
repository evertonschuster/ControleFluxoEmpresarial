using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Architectures.Middlewares
{
    public class SqlInjectionFilter : IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext context)
        {

        }

        public void OnActionExecuting(ActionExecutingContext context)
        {

            var string2 = JsonConvert.SerializeObject(context.ActionArguments);


            //throw new Exception("Seu baca");
        }
    }
}
