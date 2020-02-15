import * as Yup from 'yup';
import { Titular } from '../../../models/Associados/Titular';
import { Associado } from '../../../models/Associados/Associado';


export const TitularSchema = Yup.object().shape<Titular>({
    nome: Yup.string()
        .max(50, "O campo [Nome] não deve possuir mais de 50 caracteres.")
        .required('[Nome] do Titular não pode ser vaziu.'),
    rg: Yup.string()
        .max(50, "O campo [RG] não deve possuir mais de 20 caracteres.")
        .required('[RG] do Dependente não pode ser vaziu.'),
    cpf: Yup.string()
        .max(50, "O campo [CPF] não deve possuir mais de 20 caracteres.")
        .required('[CPF] do Dependente não pode ser vaziu.'),
});

export const AssociadoSchema = Yup.object().shape<Associado>({
    nome: Yup.string()
        .max(50, "O campo [Nome] não deve possuir mais de 50 caracteres.")
        .required('[Nome] do Titular não pode ser vaziu.'),

    rg: Yup.string()
        .max(50, "O campo [RG] não deve possuir mais de 20 caracteres.")
        .required('[RG] do Dependente não pode ser vaziu.'),

});