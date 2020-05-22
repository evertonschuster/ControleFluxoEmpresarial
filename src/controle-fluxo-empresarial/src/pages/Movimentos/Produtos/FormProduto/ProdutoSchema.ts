import * as Yup from 'yup';
import { Produto } from '../../../../models/Movimentos/Produto';


export const ProdutoSchema = Yup.object().shape<Produto>({
    id: Yup.number(),

    nome: Yup.string()
        .max(50, "O campo [Nome] não deve possuir mais de 50 caracteres.")
        .required('[Nome] do produto não pode ser vaziu.'),

    marcaId: Yup.number()
        .required("Informe uma Marca ao produto.")
        .min(0, "Informe uma Marca ao produto."),

    quantidade: Yup.number()
        .required("Informe a Quantidade.")
        .min(0, "Informe a Quantidade."),

    quantidadeMinima: Yup.number()
        .required("Informe a Quantidade Mínima.")
        .min(0, "Informe a Quantidade Mínima."),

    valorCompra: Yup.number()
        .required("Informe o Valor de Compra.")
        .min(0, "Informe o Valor de Compra."),

    valorVenda: Yup.number()
        .required("Informe o Valor de Venda.")
        .min(0, "Informe o Valor de Venda."),

    categoriaId: Yup.number()
        .required("Informe uma Categoria ao produto.")
        .min(0, "Informe uma Categoria ao produto."),

    unidadeMedidaId: Yup.number()
        .required("Informe uma Unidade Medida ao produto.")
        .min(0, "Informe uma Unidade de Medida ao produto."),
});
