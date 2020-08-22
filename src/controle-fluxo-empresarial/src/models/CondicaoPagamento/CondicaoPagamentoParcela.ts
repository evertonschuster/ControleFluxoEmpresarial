import { FormaPagamento } from "./FormaPagamento";

export interface CondicaoPagamentoParcela {
    id?: number;
    formaPagamentoId: number,
    formaPagamento?: FormaPagamento,
    numeroDias: number,
    percentual: number,
}