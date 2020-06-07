import * as Yup from 'yup';
import { UnidadeMedida } from '../../../../models/Movimentos/UnidadeMedida';


export const UnidadeMedidaSchema = Yup.object().shape<UnidadeMedida>({
    id: Yup.string()
        .max(3, "O campo Código não deve possuir mais de 3 caracteres.")
        .min(1, "O campo Código deve possuir mais de 1 caracter.")
        .required('O campo Código não pode ser vaziu.'),

    nome: Yup.string()
        .max(50, "O campo Nome não deve possuir mais de 50 caracteres.")
        .required('Nome da Unidade Medida não pode ser vaziu.')
});