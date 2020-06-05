import * as Yup from 'yup';
import { Servico } from '../../../../models/Movimentos/Servico';


export const ServicoSchema = Yup.object().shape<Servico>({
    id: Yup.number(),

    nome: Yup.string()
        .max(50, "O campo [Nome] não deve possuir mais de 50 caracteres.")
        .required('[Nome] do Serviço não pode ser vaziu.'),

    valor: Yup.number().required("Informe o valor do serviço."),

    categoriaId: Yup.number()
        .required("Informe uma Categoria ao serviço.")
        .min(0, "Informe uma Categoria ao serviço."),

});
