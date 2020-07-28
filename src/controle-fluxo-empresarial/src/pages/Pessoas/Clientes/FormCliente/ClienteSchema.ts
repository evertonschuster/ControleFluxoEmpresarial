import * as Yup from 'yup';
import { Cliente } from '../../../../models/Pessoas/Cliente';
import { NATIONALITY_TYPE } from '../../../../components/NationalitySelect/NationalitySelect';
import { validaCPFCNPJ } from './../../../../utils/Validate';
// const regexCPFV1 = /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/;
const regexCPF = /([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})/;
const regexRG = /((^[A-Z]{2}-?)?([0-9\\.-]{5,}))([A-Z]{3})?([A-Z]{2})?/

export const ClienteSchema = Yup.object().shape<Cliente>({
    nome: Yup.string()
        .nullable()
        .max(60, "Cliente não deve possuir mais de 60 caracteres.")
        .min(5, "Cliente deve possuir mais de 5 caracteres.")
        .required('Informe o Cliente.'),

    apelido: Yup.string()
        .nullable()
        .max(60, "Apelido não deve possuir mais de 60 caracteres."),

    bairro: Yup.string()
        .nullable()
        .max(60, "O Bairro não deve possuir mais de 60 caracteres.")
        .required('Informe Bairro.'),

    cep: Yup.string()
        .nullable()
        .max(9, "O CEP não deve possuir mais de 9 caracteres.")
        .min(8, "O CEP deve possuir mais de 8 caracteres.")
        .required('Informe o CEP.'),

    complemento: Yup.string()
        .nullable()
        .max(60, "O Complemento não deve possuir mais de 60 caracteres."),

    observacao: Yup.string()
        .nullable()
        .max(255, "A Descrição não deve possuir mais de 255 caracteres."),

    cpfcpnj: Yup.string().when("nacionalidade", (nacionalidade: NATIONALITY_TYPE, schema: any) => {
        if (nacionalidade === NATIONALITY_TYPE.BRASILEIRO) {
            return Yup.string()
                .nullable()
                .max(18, "O CPF/CNPJ não deve possuir mais de 18 caracteres.")
                .min(5, "O CPF/CNPJ deve possuir mais de 5 caracteres.")
                .matches(regexCPF, "CPF/CNPJ não é válido.")
                .test('cpfcpnj', 'CPF/CNPJ não é válido.', value => {
                    return validaCPFCNPJ(value)
                })
        }
    }),

    email: Yup.string()
        .nullable()
        .required("Informe o Email.")
        .max(60, "O Email não deve possuir mais de 60 caracteres")
        .email("Informe um email válido"),

    endereco: Yup.string()
        .nullable()
        .min(5, "O Endereço deve possuir mais de 5 caracteres.")
        .max(60, "O Endereço não deve possuir mais de 60 caracteres.")
        .required('Informe o Endereço.'),

    limiteCredito: Yup.number()
        .nullable()
        .typeError("Informe um valor válido")
        .required('Informe o Limite de credito.')
        .min(-0.00001, "O Limite de credito não pode estar negativo"),

    rgInscricaoEstadual: Yup.string()
        .nullable()
        .matches(regexRG, "Documento inválido.")
        .max(18, "Documento inválido."),

    telefone: Yup.string()
        .nullable()
        .min(5, "Informe um telefone válido,")
        .max(30, "O Telefone não pode ter mais de 30 caracteres.")
        .required("Informe um telefone."),

    cidadeId: Yup.number()
        .nullable().required("Informe a Cidade."),

    numero: Yup.string()
        .nullable()
        .typeError("Informe o Número.")
        .min(1, "O Número deve possuir mais de 1 caracteres.")
        .max(10, "O Número não pode ter mais de 10 caracteres.")
        .required("Informe o Número."),

    condicaoPagamentoId: Yup.number().required("Informe a Condição de pagemento."),

});