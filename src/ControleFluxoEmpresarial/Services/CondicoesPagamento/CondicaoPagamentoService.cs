using ControleFluxoEmpresarial.DAOs.CondicaoPagamentos;
using ControleFluxoEmpresarial.Models.CondicaoPagamentos;
using ControleFluxoEmpresarial.Models.Movimentos;
using ControleFluxoEmpresarial.Services.CondicoesPagamento.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Services.CondicoesPagamento
{
    public class CondicaoPagamentoService : IService
    {
        public CondicaoPagamentoService(CondicaoPagamentoDAO dAO)
        {
            DAO = dAO ?? throw new ArgumentNullException(nameof(dAO));
        }

        public CondicaoPagamentoDAO DAO { get; set; }

        private ParcelaPagamento CalculaUltimaParcela(CondicaoPagamento condicaoPagamento, CondicaoPagamentoParcela condicaoPagamentoParcela, DateTime dataBase, decimal valorTotal, List<ParcelaPagamento> parcelas, int numero)
        {
            var valorParcela = Decimal.Round(valorTotal - parcelas.Sum(e => e.Valor), 2);
            var descontoParcela = Decimal.Round(valorParcela * (condicaoPagamento.Desconto / 100), 2);

            var parcela = new ParcelaPagamento()
            {
                Valor = valorParcela,
                Desconto = descontoParcela,
                ValorTotal = valorParcela - descontoParcela,
                DataVencimento = dataBase.AddDays(condicaoPagamentoParcela.NumeroDias),
                FormaPagamento = condicaoPagamentoParcela.FormaPagamento,
                FormaPagamentoId = condicaoPagamentoParcela.FormaPagamentoId,
                NumeroParcela = numero
            };

            return parcela;
        }

        private ParcelaPagamento CalculaParcela(CondicaoPagamento condicaoPagamento, CondicaoPagamentoParcela condicaoPagamentoParcela, DateTime dataBase, decimal valorTotal, int numero)
        {
            var valorParcela = Decimal.Round(valorTotal * (condicaoPagamentoParcela.Percentual / 100), 2);
            var descontoParcela = Decimal.Round(valorParcela * (condicaoPagamento.Desconto / 100), 2);

            var parcela = new ParcelaPagamento()
            {
                Valor = valorParcela,
                Desconto = descontoParcela,
                ValorTotal = valorParcela - descontoParcela,
                DataVencimento = dataBase.AddDays(condicaoPagamentoParcela.NumeroDias),
                FormaPagamento = condicaoPagamentoParcela.FormaPagamento,
                FormaPagamentoId = condicaoPagamentoParcela.FormaPagamentoId,
                NumeroParcela = numero
            };

            return parcela;
        }


        public List<ParcelaPagamento> CalculaParcela(int condicaoPagamentoId, DateTime dataBase, decimal valorDataBase)
        {
            var condicaoPagamento = this.DAO.GetByID(condicaoPagamentoId);
            return this.CalculaParcela(condicaoPagamento, dataBase, valorDataBase);
        }
        public List<ParcelaPagamento> CalculaParcela(CondicaoPagamento condicaoPagamento, DateTime dataBase, decimal valorDataBase)
        {
            if (condicaoPagamento.Parcela == null || condicaoPagamento.Parcela.Count == 0)
            {
                throw new ArgumentNullException(nameof(condicaoPagamento.Parcela), "Informe as parcelas");
            }

            var parcelas = new List<ParcelaPagamento>(condicaoPagamento.Parcela.Count);
            var valorTotal = valorDataBase;

            for (int i = 0; i < condicaoPagamento.Parcela.Count - 1; i++)
            {
                var condicaoPagamentoParcela = condicaoPagamento.Parcela[i];
                var parcela = this.CalculaParcela(condicaoPagamento, condicaoPagamentoParcela, dataBase, valorTotal, i + 1);
                parcelas.Add(parcela);
            }

            var ultimaParcela = condicaoPagamento.Parcela[condicaoPagamento.Parcela.Count - 1];
            parcelas.Add(this.CalculaUltimaParcela(condicaoPagamento, ultimaParcela, dataBase, valorTotal, parcelas, condicaoPagamento.Parcela.Count));

            return parcelas;
        }
    }
}
