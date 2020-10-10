import * as Yup from 'yup';
import ContaReceber from '../../../../models/Movimentos/ContaReceber';


export const ContaReceberSchema = Yup.object().shape<ContaReceber>({
    modelo: Yup.string()
        .nullable()
        .required("Informe o modelo."),

    serie: Yup.string()
        .nullable()
        .required("Informe a série."),

    numero: Yup.string()
        .nullable()
        .required("Informe o número."),

    clienteId: Yup.number()
        .nullable()
        .typeError("Informe o cliente.")
        .required("Informe o cliente.")
        .test("conta-receber-cliente", "Informe o cliente.", function () {
            return this.parent.cliente
        }),

    parcela: Yup.number()
        .nullable()
        .min(1, "Parcela inválida.")
        .typeError("Informe a parcela.")
        .required("Informe a parcela."),

    valor: Yup.number()
        .nullable()
        .typeError("Valor inválido.")
        .min(0, "Valor inválido.")
        .required("Informe o valor."),

    desconto: Yup.number()
        .nullable()
        .typeError("Desconto inválido.")
        .min(0, "Desconto inválido."),

    multa: Yup.number()
        .nullable()
        .typeError("Multa inválido.")
        .min(0, "Multa inválido."),

    juro: Yup.number()
        .nullable()
        .typeError("Juro inválido.")
        .min(0, "Juro inválido."),

    dataEmissao: Yup.date()
        .nullable()
        .typeError("Data inválida.")
        .required("Infome a data de emissão."),

    dataVencimento: Yup.date()
        .nullable()
        .typeError("Data inválida.")
        .required("Infome a data de vencimento.")
        .test("data-pagamento-vencimento", "Data de vencimento inferioar da data de Emissão", function () {
            let form = this.parent as ContaReceber;

            form.dataEmissao!.setHours(0,0,0,0)
            form.dataVencimento!.setHours(0,0,0,0)
            return form.dataEmissao! <= form.dataVencimento!
        }),

    formaPagamentoId: Yup.number()
        .nullable()
        .typeError("Informe a forma de pagamento.")
        .required("Informe a forma de pagamento.")
        .test("conta_receber_forma_pagamento_123123", "Informe a forma de pagamento.", function () {
            return this.parent.formaPagamento
        }),


    descricao: Yup.string()
        .nullable()
        .max(255, "Descrição não pode ter mais de 255 caracteres.")

});