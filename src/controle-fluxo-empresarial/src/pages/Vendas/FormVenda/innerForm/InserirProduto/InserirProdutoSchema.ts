import * as Yup from 'yup';
import { VendaProduto } from '../../../../../models/Vendas/VendaProduto';


export const InserirProdutoSchema = (produtos: VendaProduto[]) => Yup.object().shape<VendaProduto>({
    quantidade: Yup.number()
        .nullable()
        .typeError("Informe a quantidade.")
        .min(1, "Quantidade inválida.")
        .required("Informe a quantidade.")
        .test("produto-teste-estoque", "Produto com estoque insuficiente.", function () {
            let form = this.parent as VendaProduto;

            return !form.produto ||  form.produto?.quantidade! >= form.quantidade!;
        }),

    produtoId: Yup.number()
        .nullable()
        .typeError("Informe o produto.")
        .required("Informe o produto.")
        .test("produto-teste-adicionado", "Produto já Adicionado.", function () {
            let form = this.parent as VendaProduto;

            return produtos?.findIndex(e => e.produtoId === form.produtoId) < 0
        })
        .test("produto-teste-estoque", "Produto com estoque insuficiente.", function () {
            let form = this.parent as VendaProduto;

            return !form.produto || form.produto?.quantidade! >= form.quantidade!;
        })
        .test("produto-teste", "Produto não encontrado.", function () {
            return !!(this.parent as VendaProduto).produto;
        }),
})