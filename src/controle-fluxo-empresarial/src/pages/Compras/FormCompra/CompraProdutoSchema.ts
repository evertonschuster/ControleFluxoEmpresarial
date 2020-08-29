import * as Yup from 'yup';
import { CompraProduto } from '../../../models/Compras/CompraProduto';


export const CompraProdutoSchema = Yup.object().shape<CompraProduto>({
    produtoId: Yup.number()
        .nullable()
        .typeError("Código inválido")
        .required("Informe o Produto."),

    unidadeMedidaId: Yup.string()
        .nullable()
        .typeError("Código inválido")
        .required("Informe a Unidade de medida.")
        .test("unidade-medida-invalida", "Código inválido", function () {
            let form = this.parent as CompraProduto
            return form.unidadeMedida ? true : false
        }),

    quantidade: Yup.number()
        .nullable()
        .typeError("Informe a Quantidade.")
        .required("Informe a Quantidade."),

    valor: Yup.number()
        .nullable()
        .typeError("Informe o Valor.")
        .required("Informe o Valor."),

    desconto: Yup.number()
        .nullable()
        .typeError("Informe o Desconto"),

    ipi: Yup.number()
        .nullable()
        .typeError("Informe o IPI")

});