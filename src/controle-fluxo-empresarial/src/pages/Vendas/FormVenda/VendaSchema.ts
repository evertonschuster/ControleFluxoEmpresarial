import * as Yup from "yup"
import { VendaProduto } from "../../../models/Vendas/VendaProduto";
import { Venda } from './../../../models/Vendas/Venda';
import ContaReceber from './../../../models/Movimentos/ContaReceber';

export const VendaSchema = Yup.object().shape<Venda>({
    modelo: Yup.string()
        .nullable()
        .required("Informe o modelo."),

    serie: Yup.string()
        .nullable()
        .required("Informe a série."),

    clienteId: Yup.number()
        .nullable()
        .typeError("Informe o cliente.")
        .required("Informe o cliente.")
        .test("venda-cliente", "Informe o cliente.", function () {
            return this.parent.cliente
        }),


    condicaoPagamentoId: Yup.number()
        .nullable()
        .typeError("Informe a condição pagamento.")
        .required("Informe a condição pagamento.")
        .test("venda-condicaoPagamentoId", "Informe a condição pagamento.", function () {
            return this.parent.condicaoPagamento
        }),

    parcelas: Yup.array<ContaReceber>()
        .nullable()
        .required("Calcule as parcelas."),

    produtos: Yup.array<VendaProduto>()
        .nullable()
        .required("Informe os produtos."),
});



export const VendaItemProdutoSchema = Yup.object().shape<VendaProduto>({

    quantidade: Yup.number()
        .nullable()
        .typeError("Informe a quantidade")
        .min(1, "Quantidade inválida")
        .required("Informe a quantidade.")
        .test("produto-teste-estoque", "Produto com estoque insuficiente.", function () {
            let form = this.parent as VendaProduto;

            return form.produto?.quantidade! >= form.quantidade!;
        }),
})
