import * as Yup from 'yup';
import { UnidadeMedida } from '../../../../models/Movimentos/UnidadeMedida';


export const UnidadeMedidaSchema = Yup.object().shape<UnidadeMedida>({
    id: Yup.string()
        .max(3, "Código não deve possuir mais de 3 caracteres.")
        .min(1, "Código deve possuir mais de 1 caracter.")
        .required('Código não pode estar vaziu.'),

    nome: Yup.string()
        .max(50, "Unidade Medida não deve possuir mais de 50 caracteres.")
        .required('Unidade Medida não pode estar vaziu.')
});