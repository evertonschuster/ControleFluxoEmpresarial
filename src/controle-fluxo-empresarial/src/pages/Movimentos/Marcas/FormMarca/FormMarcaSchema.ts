import * as Yup from 'yup';
import { Marca } from '../../../../models/Movimentos/Marca';


export const MarcaSchema = Yup.object().shape<Marca>({
    nome: Yup.string()
        .max(50, "Marca não deve possuir mais de 50 caracteres.")
        .required('Marca não pode estar vazio.')
});