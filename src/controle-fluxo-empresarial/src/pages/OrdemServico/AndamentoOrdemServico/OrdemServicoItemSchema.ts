import * as Yup from 'yup';
import OrdemServico from '../../../models/OrdemServicos/OrdemServico';
import { OrdemServicoProduto } from '../../../models/OrdemServicos/OrdemServicoItem';
import { OrdemServicoServico } from './../../../models/OrdemServicos/OrdemServicoItem';

export const OrdemServicoItemProdutoSchema = Yup.object().shape<OrdemServicoProduto>({
    quantidade: Yup.number()
        .nullable()
        .typeError("Informe a quantidade")
        .min(1, "Quantidade inválida")
        .required("Informe a quantidade."),
})


export const OrdemServicoItemServicoSchema = Yup.object().shape<OrdemServicoServico>({
    quantidade: Yup.number()
        .nullable()
        .typeError("Informe a quantidade")
        .min(1, "Quantidade inválida")
        .required("Informe a quantidade."),
})

export const OrdemServicoItemSchema = Yup.object().shape<OrdemServico>({
    descricaoObservacaoTecnico: Yup.string()
        .nullable()
        .max(255, "Observação não deve ter mais de 255 caracteres."),

    descricaoTecnico: Yup.string()
        .nullable()
        .max(255, "Observação não deve ter mais de 255 caracteres."),

    condicaoPagamentoId: Yup.number()
        .nullable()
        .required("Informe a condição de pagamento"),

    servicos: Yup.array<OrdemServicoServico>()
        .nullable()
        .required("Informe os serviços."),
})