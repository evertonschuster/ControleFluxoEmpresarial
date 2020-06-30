import * as Yup from 'yup';
import { FuncaoFuncionario } from '../../../../models/Pessoas/FuncaoFuncionario';


export const FuncaoFuncionarioSchema = Yup.object().shape<FuncaoFuncionario>({

    nome: Yup.string()
        .nullable()
        .max(50, "O campo [Nome] não deve possuir mais de 50 caracteres.")
        .required('[Nome] da Função do Funcionário não pode ser vaziu.'),

    cargaHoraria: Yup.number()
        .nullable()
        .min(0.0001, "A Carga Horária não pode ser igual ou inferior a 0.")
        .required('A Carga Horária deve ser informada.'),

    observacao: Yup.string().nullable().max(255, "Observação não pode ter mais de 255 caracteres."),

    descricao: Yup.string().nullable().max(255, "Descrição não pode ter mais de 255 caracteres."),
});
