import * as Yup from 'yup';
import { CancelarContaReceber } from '../../../../../models/Movimentos/ContaReceber';


export const CancelarContaReceberSchema = Yup.object().shape<CancelarContaReceber>({
    modelo: Yup.string()
        .nullable()
        .required("Informe o modelo."),

    serie: Yup.string()
        .nullable()
        .required("Informe a série."),

    numero: Yup.string()
        .nullable()
        .required("Informe o número."),

    parcela: Yup.number()
        .nullable()
        .min(1, "Parcela inválida.")
        .typeError("Informe a parcela.")
        .required("Informe a parcela."),

    justificativa: Yup.string()
        .nullable()
        .required("Informe a justificatica.")
        .max(255,"Justificativa não deve ter mais de 255 caracteres.")
        .min(10, "Justificativa deve ter no mínimo 10 caracteres."),

    senha: Yup.string()
        .nullable()
        .required("Infrome a senha.")
});