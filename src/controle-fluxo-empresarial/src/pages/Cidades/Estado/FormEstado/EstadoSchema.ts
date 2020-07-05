import * as Yup from 'yup';
import { Estado } from './../../../../models/Cidades/Estado';


export const EstadoSchema = Yup.object().shape<Estado>({
    nome: Yup.string()
        .max(50, "Estado não deve possuir mais de 50 caracteres.")
        .required('Estado não pode estar vaziu.'),

    uf: Yup.string()
        .max(5, "UF não deve possuir mais de 5 caracteres.")
        .required('UF não pode estar vaziu.'),

    paisId: Yup.number()
        .nullable()
        .typeError("Id inválido")
        .required('O campo Pais é obrigatório'),
});