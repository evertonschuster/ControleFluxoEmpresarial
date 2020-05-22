import * as Yup from 'yup';
import { FuncaoFuncionario } from '../../../../models/Pessoas/FuncaoFuncionario';


export const FuncaoFuncionarioSchema = Yup.object().shape<FuncaoFuncionario>({
    id: Yup.number(),
    
    nome: Yup.string()
        .max(50, "O campo [Nome] não deve possuir mais de 50 caracteres.")
        .required('[Nome] da Função do Funcionário não pode ser vaziu.'),
        
    requerCNH: Yup.boolean(),
});
