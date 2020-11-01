import * as Yup from 'yup';
import { Pais } from '../../../../models/Cidades/Pais';


export const PaisSchema = Yup.object().shape<Pais>({
    nome: Yup.string()
        .max(50, "País não deve possuir mais de 50 caracteres.")
        .required('País não pode estar vazio.'),

    ddi: Yup.string()
        .max(5, "DDI não deve possuir mais de 5 caracteres.")
        .required('DDI não pode estar vazio.'),

    sigla: Yup.string()
        .max(5, "Sigla não deve possuir mais de 5 caracteres.")
        .required('Sigla não pode estar vazio.'),
});