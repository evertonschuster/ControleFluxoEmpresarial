using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Architectures.Exceptions
{
    public class BusinessException : Exception
    {
        public BusinessException(object errors, object? helper = null)
        {
            Response = new { errors, helper };
        }

        public Object Response { get; set; }

    }
}
