import { FormaPagamento } from "./FormaPagamento";

export interface ParcelaPagamento {
    numeroParcela: number;
    formaPagamentoId: number;
    formaPagamento: FormaPagamento;
    dataVencimento: Date

    valor: number;
    desconto: number;
    valorTotal: number;
}