import * as Yup from 'yup';
import { CondicaoPagamento } from '../../../../models/CondicaoPagamento/CondicaoPagamento';
import { CondicaoPagamentoParcela } from './../../../../models/CondicaoPagamento/CondicaoPagamentoParcela';
import { RecordTable } from '../../../../components/EditableTable/EditableTable';


export const CondicaoPagamentoParcelaSchema = Yup.object().shape<CondicaoPagamentoParcela>({
    numeroDias: Yup.number()
        .typeError("Código inválido.")
        .integer("Código inválido.")
        .required("Informe o número de dias.")
        .min(0, "O número de dias deve estar maior que 0."),
    percentual: Yup.number()
        .typeError("Código inválido.")
        .required("Informe o percentual.")
        .min(0.01, "O percentual deve estar maior que 0.")
        .max(100, "O percentual não pode estar maior que 100."),
    formaPagamentoId: Yup.number()
        .integer("Código inválido.")
        .typeError("Código inválido.")
        .required("Informe uma Condição de Pagamento.")
        .test("", "Código inválido.", function () {
            let parent = this.parent as CondicaoPagamentoParcela
            return !!parent.formaPagamento;
        })
});



export const CondicaoPagamentoSchema = Yup.object().shape<CondicaoPagamento>({
    nome: Yup.string()
        .max(50, "Condição não deve possuir mais de 50 caracteres.")
        .required('Condição não pode estar vazio.'),
    juro: Yup.number()
        .required("Código inválido.")
        .typeError("Código inválido.")
        .min(0, "O valor não pode ser menor que 0.")
        .max(100, "O valor não pode ser maior que 100."),
    multa: Yup.number()
        .required("Código inválido.")
        .typeError("Código inválido.")
        .min(0, "O valor não pode estar menor que 0.")
        .max(100, "O valor não pode estar maior que 100."),
    desconto: Yup.number()
        .required("Código inválido.")
        .typeError("Código inválido.")
        .min(0, "O valor não pode estar menor que 0.")
        .max(100, "O valor não pode estar maior que 100."),
    parcela: Yup.array()
        .of(CondicaoPagamentoParcelaSchema)
        .min(1, "Informe ao menos uma parcela.")
        .test({
            name: "parcela",
            message: (parcelas) => {
                let total = (parcelas.value as CondicaoPagamentoParcela[]).reduce((ty, parcela) => ty + parcela.percentual, 0);
                return `Soma percentual diferente de 100% (${(100 - total).toFixed(2)}).`
            },
            test: (parcelas: CondicaoPagamentoParcela[]) => {
                return parcelas.reduce((ty, parcela) => ty + parcela.percentual, 0) === 100;
            }
        })
        .test({
            name: "parcela",
            message: (parcelas) => {
                return `O número de dias deve ser crescente.`
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




export function validateNumeroDias(value: number, record: CondicaoPagamentoParcela & RecordTable, percelasSource: (CondicaoPagamentoParcela & RecordTable)[]) {
    let index = percelasSource.findIndex(e => e.tableKey === record.tableKey)
    if (index < 0 || percelasSource.length === 1) {
        return undefined
    }

    let beforeRecord = percelasSource[index - 1];
    if (!beforeRecord) {
        return undefined;
    }
    if (beforeRecord.numeroDias < value) {
        return undefined;
    }

    if (beforeRecord.numeroDias = value) {
        return "Número de dias já adicionado.";
    }

    return `Número de dias inferior a parcela anterior${beforeRecord.numeroDias !== undefined ? ` (${beforeRecord.numeroDias})` : ""}.`
}


export function validatePercentual(value: number, record: CondicaoPagamentoParcela & RecordTable, percelasSource: (CondicaoPagamentoParcela & RecordTable)[]) {
    let index = percelasSource
        .findIndex(e => e.tableKey === record.tableKey);

    if (index < 0) {
        return undefined
    }

    let percentualTotal = percelasSource
        .filter(e => e.tableKey !== record.tableKey)
        .reduce((e, a) => e + a.percentual, 0);

    if ((percentualTotal + value) <= 100) {
        return undefined
    }

    return `Soma total o percentual ultrapassa 100% (${100 - percentualTotal}).`
}