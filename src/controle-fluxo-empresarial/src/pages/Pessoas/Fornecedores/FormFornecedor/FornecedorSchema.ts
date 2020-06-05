import * as Yup from 'yup';
import { Fornecedor } from '../../../../models/Pessoas/Fornecedor';


export const FornecedorSchema = Yup.object().shape<Fornecedor | {}>({
    // nome: Yup.string()
    //     .max(50, "O campo [Nome] não deve possuir mais de 50 caracteres.")
    //     .required('[Nome] do Fornecedor não pode ser vaziu.'),
});
