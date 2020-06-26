using ControleFluxoEmpresarial.DAOs.CondicaoPagamentoParcelas;
using ControleFluxoEmpresarial.DAOs.CondicaoPagamentos;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Models.CondicaoPagamentos
{
    public class CondicaoPagamentoParcela : BaseModel
    {
        public FormaPagamento FormaPagamento { get; set; }

        public int NumeroDias { get; set; }

        public decimal Percentual { get; set; }
    }

}
