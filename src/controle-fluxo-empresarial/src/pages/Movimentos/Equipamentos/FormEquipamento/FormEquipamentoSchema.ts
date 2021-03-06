import * as Yup from 'yup';
import { Equipamento } from '../../../../models/Movimentos/Equipamento';


export const EquipamentoSchema = Yup.object().shape<Equipamento>({
    nome: Yup.string()
        .max(50, "Equipamento não deve possuir mais de 50 caracteres.")
        .required('Equipamento não pode estar vazio.'),

    marcaId: Yup.number()
        .nullable()
        .typeError("Informe a Marca")
        .required("Informe a Marca.")
        .min(0, "Informe a Marca."),
});