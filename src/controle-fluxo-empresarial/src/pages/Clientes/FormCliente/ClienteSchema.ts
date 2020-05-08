import * as Yup from 'yup';
import { Cliente } from '../../../models/Clientes/Cliente';


export const ClienteSchema = Yup.object().shape<Cliente>({
    nome: Yup.string()
        .max(50, "O campo [Nome] não deve possuir mais de 50 caracteres.")
        .required('[Nome] da Cliente não pode ser vaziu.'),

});