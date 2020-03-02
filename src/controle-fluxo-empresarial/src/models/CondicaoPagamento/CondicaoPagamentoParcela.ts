import { FormaPagamento } from "./FormaPagamento";

export interface CondicaoPagamentoParcela {
    id?: number;
    formaPagamento: FormaPagamento,
    numeroDias: number,
    percentual: number,
}