import * as Yup from 'yup';
import { CancelarVenda } from '../../../../../models/Vendas/CancelarVenda';

export const CancelarVendaSchema = Yup.object().shape<CancelarVenda>({
    modelo: Yup.string()
        .nullable()
        .required("Informe o modelo."),

    serie: Yup.string()
        .nullable()
        .required("Informe a série."),

    numero: Yup.string()
        .nullable()
        .required("Informe o número."),


    justificativa: Yup.string()
        .nullable()
        .required("Informe a justificatica.")
        .max(255, "Justificativa não deve ter mais de 255 caracteres.")
        .min(10, "Justificativa deve ter no mínimo 10 caracteres."),

    senha: Yup.string()
        .nullable()
        .required("Infrome a senha.")
})