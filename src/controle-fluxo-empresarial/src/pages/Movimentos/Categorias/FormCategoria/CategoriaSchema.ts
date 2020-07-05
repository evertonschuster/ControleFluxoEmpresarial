import * as Yup from 'yup';
import { Categoria } from '../../../../models/Movimentos/Categoria';


export const CategoriaSchema = Yup.object().shape<Categoria>({
    nome: Yup.string()
        .max(50, "Categoria não deve possuir mais de 50 caracteres.")
        .required('Categoria não pode estar vaziu.')
});