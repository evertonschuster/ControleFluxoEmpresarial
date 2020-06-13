import * as Yup from 'yup';
import { Fornecedor } from '../../../../models/Pessoas/Fornecedor';
const regexCPF = /([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})/;
const regexRG = /((^[A-Z]{2}-?)?([0-9\\.-]{5,}))([A-Z]{3})?([A-Z]{2})?/


export const FornecedorSchema = Yup.object().shape<Fornecedor>({
    nome: Yup.string()
        .max(60, "O Cliente não deve possuir mais de 60 caracteres.")
        .min(5, "O Cliente deve possuir mais de 5 caracteres.")
        .required('Informe o Cliente.'),

    apelido: Yup.string()
        .max(60, "O Apelido não deve possuir mais de 60 caracteres."),

    bairro: Yup.string()
        .max(60, "O Bairro não deve possuir mais de 60 caracteres.")
        .required('Informe Bairro.'),

    cep: Yup.string()
        .max(9, "O CEP não deve possuir mais de 9 caracteres.")
        .min(8, "O CEP deve possuir mais de 8 caracteres.")
        .required('Informe o CEP.'),

    complemento: Yup.string()
        .max(60, "O Complemento não deve possuir mais de 60 caracteres"),

    observacao: Yup.string()
        .max(255, "A Descrição não deve possuir mais de 255 caracteres"),

    cpfcpnj: Yup.string()
        .required("Informe o CPF/CNPJ.")
        .max(16, "O CPF/CNPJ não deve possuir mais de 16 caracteres")
        .min(5, "O CPF/CNPJ deve possuir mais de 5 caracteres")
        .matches(regexCPF, "CPF/CNPJ não é válido."),

    email: Yup.string()
        .required("Informe o Email.")
        .max(60, "O Email não deve possuir mais de 60 caracteres")
        .email("Informe um email válido"),

    endereco: Yup.string()
        .min(5, "O Endereço deve possuir mais de 5 caracteres.")
        .max(60, "O Endereço não deve possuir mais de 60 caracteres.")
        .required('Informe o Endereço.'),


    limiteCredito: Yup.number()
        .typeError("Informe um valor válido")
        .required('Informe o Limite de credito.')
        .min(-0.00001, "O Limite de credito não pode ser negativo"),

    rgInscricaoEstadual: Yup.string()
        .matches(regexRG, "Documento inválido.")
        .max(14, "Documento inválido.")
        .required("Informe o Documento."),


    telefone: Yup.string()
        .min(5, "Informe um telefone válido,")
        .max(30, "O Telefone não pode ter mais de 30 caracteres.")
        .required("Informe um telefone."),

    cidadeId: Yup.number().required("Informe a Cidade."),

    numero: Yup.string()
        .typeError("Informe o Número.")
        .min(1, "O Número deve possuir mais de 1 caracteres.")
        .max(10, "O Número não pode ter mais de 10 caracteres.")
        .required("Informe o Número."),

    condicaoPagamentoId: Yup.number().required("Informe a Condição de pagemento."),

    contato: Yup.string()
        .max(60, "O Contato não deve possuir mais de 60 caracteres.")
        .min(5, "O Contato deve possuir mais de 5 caracteres.")
        .required('Informe o Cliente.'),
});
