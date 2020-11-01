import * as Yup from 'yup';
import { Cidade } from '../../../../models/Cidades/Cidade';


export const CidadeSchema = Yup.object().shape<Cidade>({
    nome: Yup.string()
        .max(50, "Cidade não deve possuir mais de 50 caracteres.")
        .required('Cidade não pode estar vazia.'),

    ddd: Yup.string()
        .max(5, "DDD não deve possuir mais de 5 caracteres.")
        .required('DDD da Cidade não pode estar vazio.'),

    estadoId: Yup.number()
        .nullable()
        .typeError("Id inválido")
        .required('O campo Estado é obrigatório'),
});