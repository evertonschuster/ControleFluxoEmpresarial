import * as Yup from 'yup';
import { Produto } from '../../../../models/Movimentos/Produto';


export const ProdutoSchema = Yup.object().shape<Produto>({
    id: Yup.number(),

    nome: Yup.string()
        .nullable()
        .max(60, "Produto não deve possuir mais de 60 caracteres.")
        .min(5, "Produto deve possuir mais de 5 caracteres.")
        .required('Produto não pode estar vazio.'),

    marcaId: Yup.number()
        .nullable()
        .typeError("Informe a Marca.")
        .required("Informe a Marca.")
        .min(0, "Informe a Marca."),

    quantidade: Yup.number()
        .nullable()
        .required("Informe a Quantidade.")
        .min(0, "Informe a Quantidade."),

    quantidadeMinima: Yup.number()
        .nullable()
        .required("Informe a Quantidade Mínima.")
        .min(0, "Informe a Quantidade Mínima."),

    valorCompra: Yup.number()
        .nullable()
        .required("Informe o Valor de Compra.")
        .min(0, "Informe o Valor de Compra."),

    valorVenda: Yup.number()
        .nullable()
        .required("Informe o Valor de Venda.")
        .min(0, "Informe o Valor de Venda."),

    categoriaId: Yup.number()
        .nullable()
        .typeError("Informe a Categoria")
        .required("Informe a Categoria.")
        .min(0, "Informe a Categoria."),

    unidadeMedidaId: Yup.string()
        .nullable()
        .required("Informe uma Unidade de Medida."),

    codigoBarras: Yup.string()
        .nullable()
        .max(20, "Código de Barras não deve possuir mais de 20 caracteres."),

    referencia: Yup.string()
        .nullable()
        .max(60, "Referência não deve possuir mais de 60 caracteres.")
        .min(5, "Referência deve possuir mais de 5 caracteres.")
        .required('Referência não pode estar vazia.'),

    descricao: Yup.string()
        .nullable()
        .max(255, "Descrição não deve possuir mais de 255 caracteres."),

    observacao: Yup.string()
        .nullable()
        .max(255, "Observação não deve possuir mais de 255 caracteres."),
});
