import * as Yup from 'yup';
import { Estado } from './../../../../models/Cidades/Estado';


export const EstadoSchema = Yup.object().shape<Estado>({
    nome: Yup.string()
        .max(50, "O campo [Nome] não deve possuir mais de 50 caracteres.")
        .required('[Nome] do Estado não pode ser vaziu.'),

    uf: Yup.string()
        .max(5, "O campo [UF] não deve possuir mais de 5 caracteres.")
        .required('[UF] do Estado não pode ser vaziu.'),

    paisId: Yup.number()
        .nullable()
        .required('O campo Pais é obrigatório'),
});