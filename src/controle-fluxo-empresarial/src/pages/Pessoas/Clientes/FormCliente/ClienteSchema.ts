import * as Yup from 'yup';
import { Cliente } from '../../../../models/Pessoas/Cliente';


export const ClienteSchema = Yup.object().shape<Cliente | any>({
    nome: Yup.string()
        .max(50, "O campo [Nome] não deve possuir mais de 50 caracteres.")
        .required('[Nome] da Cliente não pode ser vaziu.'),
    expiry: Yup.string()
        .max(50, "O campo [expiry] não deve possuir mais de 50 caracteres.")
        .required('[expiry] da Cliente não pode ser vaziu.'),

});