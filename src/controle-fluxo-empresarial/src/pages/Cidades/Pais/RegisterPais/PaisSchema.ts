import * as Yup from 'yup';
import { Pais } from '../../../../models/Cidades/Pais';


export const PaisSchema = Yup.object().shape<Pais>({
    nome: Yup.string()
        .max(50, "O campo [Nome] não deve possuir mais de 50 caracteres.")
        .required('[Nome] do pais não pode ser vaziu.'),

    dDI: Yup.string()
        .max(5, "O campo [DDI] não deve possuir mais de 5 caracteres.")
        .required('[DDI] do pais não pode ser vaziu.'),

    sigla: Yup.string()
        .max(5, "O campo [Sigla] não deve possuir mais de 5 caracteres.")
        .required('[Sigla] do pais não pode ser vaziu.'),
});