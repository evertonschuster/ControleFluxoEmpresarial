import * as Yup from 'yup';
import { Funcionario } from '../../../../models/Pessoas/Funcionario';
import { FuncaoFuncionario } from './../../../../models/Pessoas/FuncaoFuncionario';
import { validaCPFCNPJ } from '../../../../utils/Validate';
const regexCPF = /([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})/;
const regexRG = /((^[A-Z]{2}-?)?([0-9\\.-]{5,}))([A-Z]{3})?([A-Z]{2})?/

export const FuncionarioSchema = Yup.object().shape<Funcionario>({
    nome: Yup.string()
        .nullable()
        .max(60, "Funcionário não deve possuir mais de 60 caracteres.")
        .min(5, "Função do Funcionário  deve possuir mais de 5 caracteres.")
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
        .min(9, "O CEP deve possuir mais de 9 caracteres.")
        .required('Informe o CEP.'),

    complemento: Yup.string()
        .nullable()
        .max(60, "O Complemento não deve possuir mais de 60 caracteres"),

    observacao: Yup.string()
        .nullable()
        .max(255, "A Descrição não deve possuir mais de 255 caracteres"),

    cpfcpnj: Yup.string()
        .nullable()
        .required("Informe o CPF/CNPJ.")
        .max(18, "O CPF/CNPJ não deve possuir mais de 18 caracteres")
        .min(5, "O CPF/CNPJ deve possuir mais de 5 caracteres")
        .matches(regexCPF, "CPF/CNPJ não é válido.")
        .test('cpfcpnj', 'CPF/CNPJ não é válido.', value => {
            return validaCPFCNPJ(value)
        }),

    dataNascimento: Yup.date()
        .nullable()
        .typeError("Informe um valor válido.")
        .required("Informe a data.")
        .max(new Date(), "Data inválida."),

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

    estadoCivil: Yup.mixed().nullable().required('Informe o Estado Civíl.'),

    nacionalidade: Yup.string()
        .nullable()
        .required('Informe a Nacionalidade.')
        .min(5, "A Nacionalidade deve possuir mais de 5 caracteres.")
        .max(60, "A Nacionalidade não deve possuir mais de 60 caracteres."),

    rgInscricaoEstadual: Yup.string()
        .nullable()
        .matches(regexRG, "Documento inválido.")
        .max(18, "Documento inválido.")
        .required("Informe o Documento."),

    sexo: Yup.mixed().nullable().required("Informe o sexo."),

    telefone: Yup.string()
        .nullable()
        .min(5, "Informe um telefone válido,")
        .max(30, "O Telefone não pode ter mais de 30 caracteres.")
        .required("Informe um telefone."),

    cidadeId: Yup.number()
        .typeError("Informe um valor válido.")
        .nullable().required("Informe a Cidade."),

    numero: Yup.string()
        .nullable()
        .typeError("Informe o Número.")
        .min(1, "O Número deve possuir mais de 1 caracteres.")
        .max(10, "O Número não pode ter mais de 10 caracteres.")
        .required("Informe o Número."),

    cnh: Yup.string()
        .nullable()
        .max(14, "A CNH não deve possuir mais de 14 caracteres.")
        .when("funcaoFuncionario", (funcaoFuncionario: FuncaoFuncionario, schema: any) => {
            if (!funcaoFuncionario || (funcaoFuncionario && !funcaoFuncionario.requerCNH)) {
                return schema;
            }

            return schema
                .typeError("Informe um valor válido.")
                .required("Informe a CNH.");
        }),

    dataValidadeCNH: Yup.date()
        .nullable()
        .when(["funcaoFuncionario", "cnh"], (funcaoFuncionario: FuncaoFuncionario, cnh: string, schema: any) => {

            if (funcaoFuncionario?.requerCNH === true || cnh?.length > 0) {
                return Yup.date()
                    .typeError("Informe um valor válido.")
                    .required("Informe a Data de Validade.");
            }

            return Yup.date().nullable();
        }),

    funcaoFuncionarioId: Yup.number()
        .nullable()
        .required("Informe a Função do Funcionario")
});
