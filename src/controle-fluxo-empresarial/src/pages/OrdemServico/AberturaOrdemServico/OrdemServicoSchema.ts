import * as Yup from 'yup';
import AberturaOrdemServico from '../../../models/OrdemServicos/AberturaOrdemServico';

export const OrdemServicoSchema = Yup.object().shape<AberturaOrdemServico>({
    clienteId: Yup.number()
        .nullable()
        .typeError("Informe o cliente.")
        .required("Informe o cliente.")
        .test("os-fornecedor", "Informe o cliente.", function () {
            return this.parent.cliente
        }),

    telefone: Yup.string()
        .nullable()
        .required("Informe o Telefone.")
        .min(8, "Telefone deve ter mais de 8 caracteres.")
        .max(20, "Telefone não deve ter mais de 20 caracteres."),

    contato: Yup.string()
        .nullable()
        .max(50, "Contato não deve ter mais de 50 caracteres."),

    numeroSerie: Yup.string()
        .nullable()
        .max(50, "Número Serie não deve ter mais de 50 caracteres."),

    descricaoEquipamento: Yup.string()
        .nullable()
        .required("Informe o Equipamento.")
        .min(8, "Equipamento deve ter mais de 8 caracteres.")
        .max(225, "Equipamento não deve ter mais de 225 caracteres."),

    descricaoProblemaRelatado: Yup.string()
        .nullable()
        .required("Informe o Problema Relatado.")
        .min(8, "Problema Relatado deve ter mais de 8 caracteres.")
        .max(225, "Problema Relatado não deve ter mais de 225 caracteres."),

    descricaoAcessorio: Yup.string()
        .nullable()
        .required("Informe os Acessórios.")
        .min(8, "Acessórios deve ter mais de 8 caracteres.")
        .max(225, "Acessórios não deve ter mais de 225 caracteres."),

    descricaoObservacao: Yup.string()
        .nullable()
        .max(225, "Observações não deve ter mais de 225 caracteres."),
});