﻿using System;

namespace ControleFluxoEmpresarial.Architectures.Exceptions
{
    public class BusinessException : Exception
    {
        public BusinessException(object errors, string? message = null, object? helper = null)
        {
            Response = new { errors, helper, message = message ?? "Erros ao preencher valores do formúlario" };
        }

        public Object Response { get; set; }

    }
}
