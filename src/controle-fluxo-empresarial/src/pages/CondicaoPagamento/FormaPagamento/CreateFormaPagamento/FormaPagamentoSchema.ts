import * as Yup from 'yup';
import { FormaPagamento } from '../../../../models/CondicaoPagamento/FormaPagamento';


export const FormaPagamentoSchema = Yup.object().shape<FormaPagamento>({
    nome: Yup.string()
        .max(50, "O campo Nome não deve possuir mais de 50 caracteres.")
        .required('Nome da Forma de Pagamento não pode ser vaziu.')
});