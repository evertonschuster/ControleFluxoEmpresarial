import * as Yup from 'yup';
import { ProblemaRelatado } from '../../../../models/Movimentos/ProblemaRelatado';


export const ProblemaRelatadoSchema = Yup.object().shape<ProblemaRelatado>({
    nome: Yup.string()
        .max(50, "Problema Relatado não deve possuir mais de 50 caracteres.")
        .required('Problema Relatado não pode estar vazio.')
});