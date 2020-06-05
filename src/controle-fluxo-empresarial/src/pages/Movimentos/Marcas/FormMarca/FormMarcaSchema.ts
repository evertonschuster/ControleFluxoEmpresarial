import * as Yup from 'yup';
import { Marca } from '../../../../models/Movimentos/Marca';


export const MarcaSchema = Yup.object().shape<Marca>({
    nome: Yup.string()
        .max(50, "O campo Nome não deve possuir mais de 50 caracteres.")
        .required('Nome da Marca não pode ser vaziu.')
});