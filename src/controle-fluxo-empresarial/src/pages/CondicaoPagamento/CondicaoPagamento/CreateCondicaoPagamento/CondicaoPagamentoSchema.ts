import * as Yup from 'yup';
import { CondicaoPagamento } from '../../../../models/CondicaoPagamento/CondicaoPagamento';
import { CondicaoPagamentoParcela } from './../../../../models/CondicaoPagamento/CondicaoPagamentoParcela';
import { FormaPagamento } from '../../../../models/CondicaoPagamento/FormaPagamento';


export const CondicaoPagamentoParcelaSchema = Yup.object().shape<CondicaoPagamentoParcela>({
    numeroDias: Yup.number()
        .required("Informe o número de dias.")
        .min(0, "O número de dias deve ser maior que 0."),
    percentual: Yup.number()
        .required("Informe o percentual.")
        .min(0.01, "O percentual deve ser maior que 0.")
        .max(100, "O percentual não pode ser maior que 100."),
    formaPagamento: Yup.object()
        .shape<FormaPagamento>({
            id: Yup.number()
                .required("Informe uma Dondição de Pagamento.")
        })
});



export const CondicaoPagamentoSchema = Yup.object().shape<CondicaoPagamento>({
    nome: Yup.string()
        .max(50, "O campo Nome não deve possuir mais de 50 caracteres.")
        .required('O campo Condição de Pagamento não pode ser vazio.'),
    juro: Yup.number()
        .required("Informe um número válido.")
        .typeError("Informe um número válido.")
        .min(0, "O valor não pode ser menor que 0.")
        .max(100, "O valor não pode ser maior que 100."),
    multa: Yup.number()
        .required("Informe um número válido.")
        .typeError("Informe um número válido.")
        .min(0, "O valor não pode ser menor que 0.")
        .max(100, "O valor não pode ser maior que 100."),
    desconto: Yup.number()
        .required("Informe um número válido.")
        .typeError("Informe um número válido.")
        .min(0, "O valor não pode ser menor que 0.")
        .max(100, "O valor não pode ser maior que 100."),
    parcela: Yup.array()
        .of(CondicaoPagamentoParcelaSchema)
        .min(1, "Informe ao menos uma parcela.")
        .test({
            name: "parcela",
            message: (parcelas) => {
                let total = (parcelas.value as CondicaoPagamentoParcela[]).reduce((ty, parcela) => ty + parcela.percentual, 0);
                return `Soma percentual das diferente de 100% (${100 - total}).`
            },
            test: (parcelas: CondicaoPagamentoParcela[]) => {
                return parcelas.reduce((ty, parcela) => ty + parcela.percentual, 0) === 100;
            }
        })
        .test({
            name: "parcela",
            message: (parcelas) => {
                return `As parcelas devem ser sequenciais.`
            },
            test: (parcelas: CondicaoPagamentoParcela[]) => {
                let init = 0;
                return parcelas.every(e => {
                    let valid = e.numeroDias >= init
                    init = e.numeroDias;
                    return valid;
                });
            }
        })
});
