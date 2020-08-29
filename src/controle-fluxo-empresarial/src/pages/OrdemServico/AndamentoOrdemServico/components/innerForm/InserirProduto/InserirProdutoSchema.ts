import * as Yup from 'yup';
import { OrdemServicoProduto } from '../../../../../../models/OrdemServicos/OrdemServicoItem';


export const InserirProdutoSchema = Yup.object().shape<OrdemServicoProduto>({
    quantidade: Yup.number()
        .nullable()
        .typeError("Informe a quantidade")
        .min(1, "Quantidade inválida")
        .required("Informe a quantidade."),

    produtoId: Yup.number()
        .nullable()
        .typeError("Informe o produto")
        .required("Informe o produto.")
        .test("produto-teste", "Produto não encontrado", function () {
            return !!(this.parent as  OrdemServicoProduto).produto;
        }),
})