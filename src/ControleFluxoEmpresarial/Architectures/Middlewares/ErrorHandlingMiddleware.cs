using ControleFluxoEmpresarial.Architectures.Exceptions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Net;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Architectures.Middlewares
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate next;

        public ErrorHandlingMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext context /* other dependencies */)
        {
            try
            {

                await next(context);

            }
            catch (BusinessRelationshipException ex)
            {
                HandleExceptionAsync(context, ex, HttpStatusCode.Conflict);
            }
            catch (BusinessException ex)
            {
                HandleExceptionAsync(context, ex, HttpStatusCode.UnprocessableEntity);
            }
        }

        private static void HandleExceptionAsync(HttpContext context, BusinessException exception, HttpStatusCode code)
        {
            var serializerSettings = new JsonSerializerSettings();
            serializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            var result = JsonConvert.SerializeObject(exception.Response, serializerSettings);

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)code;
            context.Response.WriteAsync(result).Wait();
        }

    }


    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class MyMiddlewareExtensions
    {
        public static IApplicationBuilder UseErrorHandlingMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ErrorHandlingMiddleware>();
        }
    }
}
