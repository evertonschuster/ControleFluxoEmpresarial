import * as Yup from 'yup';
import { CompraProduto } from '../../../models/Compras/CompraProduto';

export const CompraProdutoSchema = Yup.object().shape<CompraProduto>({
    produtoId: Yup.number()
        .nullable()
        .typeError("Código inválido")
        .required("Informe o Produto."),

    quantidade: Yup.number()
        .nullable()
        .typeError("Informe a Quantidade.")
        .min(0.001, "Informe a Quantidade.")
        .required("Informe a Quantidade."),

    valorUnitario: Yup.number()
        .nullable()
        .typeError("Informe o Valor.")
        .required("Informe o Valor.")
        .min(0.001, "Informe o Valor."),

    desconto: Yup.number()
        .nullable()
        .typeError("Informe o Desconto")
        .test("desconto-produto", "O desconto não pode ser maior que o valor.", function () {
            let form = this.parent as CompraProduto;
            if (!!!form.desconto) {
                return true;
            }

            var valor = form.quantidade! * form.valorUnitario!;
            return form.desconto! < valor;
        }),

    ipi: Yup.number()
        .nullable()
        .typeError("Informe o IPI")

});