import * as Yup from 'yup';
import { Categoria } from '../../../../models/Movimentos/Categoria';


export const CategoriaSchema = Yup.object().shape<Categoria>({
    nome: Yup.string()
        .max(50, "O campo Nome não deve possuir mais de 50 caracteres.")
        .required('Nome da Categoria não pode ser vaziu.')
});