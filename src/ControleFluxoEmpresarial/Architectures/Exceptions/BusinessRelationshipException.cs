﻿namespace ControleFluxoEmpresarial.Architectures.Exceptions
{
    public class BusinessRelationshipException : BusinessException
    {

        public BusinessRelationshipException(object errors, string? message = null, object? helper = null) : base(errors)
        {
            Response = new { errors, helper, message = message ?? "Erros ao executar." };
        }

    }
}
