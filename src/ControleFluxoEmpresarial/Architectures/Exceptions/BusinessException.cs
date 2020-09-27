using System;
using System.Net;

namespace ControleFluxoEmpresarial.Architectures.Exceptions
{
    public class BusinessException : Exception
    {
        public BusinessException(object errors, string message = null, object helper = null, HttpStatusCode? codeError = null)
        {
            this.Response = new { errors, helper, message = message ?? "Erros ao preencher valores do formúlario" };
            this.CodeError = codeError;
        }

        public HttpStatusCode? CodeError { get; set; }

        public Object Response { get; set; }

    }
}
