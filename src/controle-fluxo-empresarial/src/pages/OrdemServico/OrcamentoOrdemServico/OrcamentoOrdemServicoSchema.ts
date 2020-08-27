import * as Yup from 'yup';
import OrdemServicoItem from "../../../models/OrdemServicos/OrdemServicoItem";

export const OrdemServicoItemSchema = Yup.object().shape<OrdemServicoItem>({
    quantidade: Yup.number()
        .nullable()
        .typeError("Informe a quantidade")
        .min(1, "Quantidade inválida")
        .required("Informe a quantidade."),
})