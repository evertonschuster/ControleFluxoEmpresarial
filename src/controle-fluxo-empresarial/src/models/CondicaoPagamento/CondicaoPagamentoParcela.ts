import { FormaPagamento } from "./FormaPagamento";

export interface CondicaoPagamentoParcela {
    id?: number;
    formaPagamento: FormaPagamento,
    numeroDias: number,
    porcentual: number,
}