import * as Yup from 'yup';
import { Cidade } from '../../../../models/Cidades/Cidade';


export const CidadeSchema = Yup.object().shape<Cidade>({
    nome: Yup.string()
        .max(50, "O campo [Nome] não deve possuir mais de 50 caracteres.")
        .required('[Nome] da Cidade não pode ser vaziu.'),

    ddd: Yup.string()
        .max(5, "O campo [DDD] não deve possuir mais de 5 caracteres.")
        .required('[DDD] do Cidade não pode ser vaziu.'),

    estadoId: Yup.number()
        .nullable()
        .required('O campo Estado é obrigatório'),
});