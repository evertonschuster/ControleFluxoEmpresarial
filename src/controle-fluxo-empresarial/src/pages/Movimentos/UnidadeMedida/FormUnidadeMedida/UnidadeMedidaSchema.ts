import * as Yup from 'yup';
import { UnidadeMedida } from '../../../../models/Movimentos/UnidadeMedida';


export const UnidadeMedidaSchema = Yup.object().shape<UnidadeMedida>({
    nome: Yup.string()
        .max(50, "O campo Nome não deve possuir mais de 50 caracteres.")
        .required('Nome da Unidade Medida não pode ser vaziu.')
});