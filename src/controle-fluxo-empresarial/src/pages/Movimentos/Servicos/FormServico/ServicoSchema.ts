import * as Yup from 'yup';
import { Servico } from '../../../../models/Movimentos/Servico';


export const ServicoSchema = Yup.object().shape<Servico>({
    id: Yup.number(),

    nome: Yup.string()
        .max(60, "Serviço não deve possuir mais de 60 caracteres.")
        .required('Serviço não pode estar vaziu.'),

    valor: Yup.number()
        .min(-0.00001, "O valor não pode estar negativo.")
        .required("Informe o valor."),

    categoriaId: Yup.number()
        .typeError("Informe a Categoria.")
        .required("Informe a Categoria.")
        .min(0, "Informe a Categoria."),

    descricao: Yup.string()
        .nullable()
        .max(255, "Descrição não deve possuir mais de 255 caracteres."),

    observacao: Yup.string()
        .nullable()
        .max(255, "Observação não deve possuir mais de 255 caracteres."),
});
