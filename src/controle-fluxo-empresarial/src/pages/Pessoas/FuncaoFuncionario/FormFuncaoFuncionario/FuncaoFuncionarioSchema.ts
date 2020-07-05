import * as Yup from 'yup';
import { FuncaoFuncionario } from '../../../../models/Pessoas/FuncaoFuncionario';


export const FuncaoFuncionarioSchema = Yup.object().shape<FuncaoFuncionario>({

    nome: Yup.string()
        .nullable()
        .max(50, "Função do Funcionário não deve possuir mais de 50 caracteres.")
        .required('Função do Funcionário não pode estar vaziu.'),

    cargaHoraria: Yup.number()
        .nullable()
        .min(0.0001, "A Carga Horária não pode estar igual ou inferior a 0.")
        .required('A Carga Horária deve estar informada.'),

    observacao: Yup.string().nullable().max(255, "Observação não pode ter mais de 255 caracteres."),

    descricao: Yup.string().nullable().max(255, "Descrição não pode ter mais de 255 caracteres."),
});
