import * as Yup from 'yup';
import { Funcionario } from '../../../../models/Pessoas/Funcionario';


export const FuncionarioSchema = Yup.object().shape<Funcionario | any>({
    nome: Yup.string()
        .max(50, "O campo [Nome] não deve possuir mais de 50 caracteres.")
        .required('[Nome] do Funcionario não pode ser vaziu.'),
});
