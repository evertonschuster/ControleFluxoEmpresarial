import { FormaPagamento } from "./FormaPagamento";

export interface CondicaoPagamentoParcela {
    id?: number;
    formaPagamento?: FormaPagamento | null,
    numeroDias: number,
    porcentual: number,
}