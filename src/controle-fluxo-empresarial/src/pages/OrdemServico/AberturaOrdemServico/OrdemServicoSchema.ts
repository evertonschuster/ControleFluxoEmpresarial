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

    equipamentoId: Yup.number()
        .nullable()
        .required("Informe o Equipamento.")
        .typeError("Informe o Equipamento.")
        .test("os-Equipamento", "Informe o Equipamento.", function () {
            return this.parent.equipamento
        }),

    problemaRelatadoId: Yup.number()
        .nullable()
        .required("Informe o Problema Relatado.")
        .typeError("Informe o Problema Relatado.")
        .test("os-Problema-Relatado", "Informe o Problema Relatado.", function () {
            return this.parent.problemaRelatado
        }),

    descricaoAcessorio: Yup.string()
        .nullable()
        .required("Informe os Acessórios.")
        .min(8, "Acessórios deve ter mais de 8 caracteres.")
        .max(225, "Acessórios não deve ter mais de 225 caracteres."),

    descricaoObservacao: Yup.string()
        .nullable()
        .max(225, "Observações não deve ter mais de 225 caracteres."),
});