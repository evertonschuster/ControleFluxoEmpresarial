import * as Yup from 'yup';
import { CancelarContaPagar } from '../../../../../models/Movimentos/ContaPagar';


export const CancelarContaPagarSchema = Yup.object().shape<CancelarContaPagar>({
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