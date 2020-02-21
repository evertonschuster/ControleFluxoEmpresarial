import * as Yup from 'yup';
import { CondicaoPagamento } from '../../../../models/CondicaoPagamento/CondicaoPagamento';
import { CondicaoPagamentoParcela } from './../../../../models/CondicaoPagamento/CondicaoPagamentoParcela';


export const CondicaoPagamentoParcelaSchema = Yup.object().shape<CondicaoPagamentoParcela>({
    numeroDias: Yup.number()
        .required("Informe o número de dias.")
        .min(0, "O número de dias deve ser maior que 0."),
    porcentual: Yup.number()
        .required("Informe o percentual.")
        .min(0, "O percentual deve ser maior que 0.")
        .max(100, "O percentual não pode ser maior que 100."),
});



export const CondicaoPagamentoSchema = Yup.object().shape<CondicaoPagamento>({
    nome: Yup.string()
        .max(50, "O campo Nome não deve possuir mais de 50 caracteres.")
        .required('Nome da Condicao de Pagamento não pode ser vaziu.'),
    juro: Yup.number(),
    multa: Yup.number(),
    desconto: Yup.number(),
    parcela: Yup.array().of(CondicaoPagamentoParcelaSchema).min(1, "Informe ao menos uma parcela")
});
