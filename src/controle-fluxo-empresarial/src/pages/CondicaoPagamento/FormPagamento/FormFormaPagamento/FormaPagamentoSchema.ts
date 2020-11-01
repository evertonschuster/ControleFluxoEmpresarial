import * as Yup from 'yup';
import { FormaPagamento } from '../../../../models/CondicaoPagamento/FormaPagamento';


export const FormaPagamentoSchema = Yup.object().shape<FormaPagamento>({
    nome: Yup.string()
        .max(50, "Forma de Pagamento não deve possuir mais de 50 caracteres.")
        .required('Forma de Pagamento não pode estar vazio.')
});