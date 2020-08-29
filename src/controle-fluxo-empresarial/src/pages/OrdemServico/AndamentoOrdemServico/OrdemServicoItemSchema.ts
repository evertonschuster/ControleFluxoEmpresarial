import * as Yup from 'yup';
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