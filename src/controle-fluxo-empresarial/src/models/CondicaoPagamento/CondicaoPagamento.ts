import { CondicaoPagamentoParcela } from "./CondicaoPagamentoParcela";

export interface CondicaoPagamento {
    id?: number;
    nome: string;
    juro?: number;
    multa?: number;
    desconto?: number;
    parcela: CondicaoPagamentoParcela[]
}