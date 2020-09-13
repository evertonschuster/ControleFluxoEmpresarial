import * as Yup from 'yup';
import { Compra } from './../../../models/Compras/Compra';
import { FormCompraMode } from './FormCompra';

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

    dataEmissao: Yup.date()
        .nullable()
        .typeError("Data inválida.")
        .required("Informe uma data."),

    dataChegada: Yup.date()
        .nullable()
        .typeError("Data inválida.")
        .required("Informe uma data.")
        .test("data-Chegada", "Data de Chegada não pode ser anterior a data de emissão", function () {
            let form = this.parent as Compra;
            return form.dataEmissao! <= form.dataChegada!
        }),

    parcelas: Yup.mixed()
        .nullable()
        .when("formMode", {
            is: 1,
            then: Yup.array().required("Infome as parcelas.")
        }),

    observacao: Yup.string()
        .nullable()
        .max(255, "Tamanho máximo de 255.")
})