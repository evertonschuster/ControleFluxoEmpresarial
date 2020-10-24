import * as Yup from 'yup';
import { Compra } from './../../../models/Compras/Compra';

export const CompraSchema = Yup.object().shape<Compra>({
    modelo: Yup.string()
        .nullable()
        .required("Informe o modelo."),

    serie: Yup.string()
        .nullable()
        .required("Informe a série."),

    numero: Yup.string()
        .nullable()
        .required("Informe o número."),

    fornecedorId: Yup.number()
        .nullable()
        .typeError("Informe o fornecedor.")
        .required("Informe o fornecedor.")
        .test("conta-pagar-fornecedor", "Informe o fornecedor.", function () {
            return this.parent.fornecedor
        }),

    condicaoPagamentoId: Yup.number()
        .nullable()
        .typeError("Informe a condição de pagamento.")
        .required("Informe a condição de pagamento.")
        .test("conta-pagar-conficao-pagamento", "Informe a condição de pagamento.", function () {
            return this.parent.condicaoPagamento
        }),

    dataEmissao: Yup.date()
        .nullable()
        .typeError("Data inválida.")
        .required("Informe uma data.")
        .test("data-emissao-compra", "A data não pode ser futura.", function () {
            let form = this.parent as Compra;

            return form.dataEmissao! <= new Date();
        }),

    dataChegada: Yup.date()
        .nullable()
        .typeError("Data inválida.")
        .required("Informe uma data.")
        .test("data-Chegada", "Data de Chegada não pode ser anterior a data de emissão", function () {
            let form = this.parent as Compra;
            return form.dataEmissao! <= form.dataChegada!
        })
        .test("data-Chegada-2", "Data de Chegada não pode ser futura", function () {
            let form = this.parent as Compra;
            return form.dataChegada! <= new Date();
        }),


    frete: Yup.number()
        .nullable()
        .min(0, "Frete não pode ser negativo"),

    seguro: Yup.number()
        .nullable()
        .min(0, "Seguro não pode ser negativo"),

    outrasDespesas: Yup.number()
        .nullable()
        .min(0, "Outras Despesas não pode ser negativo"),

    parcelas: Yup.mixed()
        .nullable()
        .when("formMode", {
            is: 1,
            then: Yup.array().required("Calcule as parcelas.")
        }),

    observacao: Yup.string()
        .nullable()
        .max(255, "Tamanho máximo de 255.")
})