import * as Yup from 'yup';
import { CancelarCompra } from './../../../models/Compras/CancelarCompra';

export const CancelarCompraSchema = Yup.object().shape<CancelarCompra>({
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
        .required("Informe o fornecedor."),

    justificativa: Yup.string()
        .nullable()
        .required("Informe a justificatica.")
        .max(255, "Justificativa não deve ter mais de 255 caracteres.")
        .min(10, "Justificativa deve ter no mínimo 10 caracteres."),

    senha: Yup.string()
        .nullable()
        .required("Infrome a senha.")


})