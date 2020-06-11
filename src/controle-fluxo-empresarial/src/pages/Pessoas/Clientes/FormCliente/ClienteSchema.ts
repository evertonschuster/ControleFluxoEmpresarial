import * as Yup from 'yup';
import { Cliente } from '../../../../models/Pessoas/Cliente';
import { NATIONALITY_TYPE } from '../../../../components/NationalitySelect/NationalitySelect';
// const regexCPFV1 = /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/;
const regexCPF = /([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})/;
const regexRG = /((^[A-Z]{2}-?)?([0-9\\.-]{5,}))([A-Z]{3})?([A-Z]{2})?/

export const ClienteSchema = Yup.object().shape<Cliente>({
    nome: Yup.string()
        .max(50, "O campo [Nome] não deve possuir mais de 50 caracteres.")
        .required('Informe o Cliente.'),

    bairro: Yup.string()
        .max(50, "O Bairro não deve possuir mais de 50 caracteres.")
        .required('Informe Bairro.'),

    cep: Yup.string()
        .max(10, "O CEP não deve possuir mais de 10 caracteres.")
        .required('Informe o CEP.'),

    cPFCPNJ: Yup.string().when("nacionalidade", (value: NATIONALITY_TYPE, schema: any) => {
        if (value === NATIONALITY_TYPE.BRASILEIRO) {
            return Yup.string()
                .required("Informe o CPF/CNPJ.")
                .matches(regexCPF, "CPF/CNPJ não é válido.")
        }
    }),

    dataNascimento: Yup.date().required("Informe a data."),

    email: Yup.string()
        .required("Informe o Email.")
        .email("Informe um email válido"),

    endereco: Yup.string()
        .max(50, "O Endereço não deve possuir mais de 50 caracteres.")
        .required('Informe o Endereço.'),

    estadoCivil: Yup.mixed().required('Informe o Estado Civíl.'),

    limiteCredito: Yup.number()
        .typeError("Informe um valor válido")
        .required('Informe o Limite de credito.')
        .min(-0.00001, "O Limite de credito não pode ser negativo"),

    nacionalidade: Yup.string()
        .required('Informe a Nacionalidade.'),

    rgInscricaoEstadual: Yup.string()
        .matches(regexRG, "Documento inválido.")
        .required("Informe o Documento."),

    sexo: Yup.mixed().required("Informe o sexo."),

    telefone: Yup.string()
        .min(5, "Informe um telefone válido,")
        .max(30, "O Telefone não pode ter mais de 30 caracteres.")
        .required("Informe um telefone."),

    cidadeId: Yup.number().required("Informe a Cidade."),

    numero: Yup.string()
        .typeError("Informe o Número.")
        .max(6, "O Número não pode ter mais de 6 caracteres.")
        .required("Informe o Número."),

    condicaoPagamentoId: Yup.number().required("Informe a Condição de pagemento."),

});