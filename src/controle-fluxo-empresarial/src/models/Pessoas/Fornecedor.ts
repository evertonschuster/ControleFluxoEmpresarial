import { Pessoa, TIPO_PESSOA } from "./Pessoa";

export interface Fornecedor extends Pessoa {
    condicaoPagamentoId?: number

    contato?: string;
    limiteCredito?: number;
    tipo?: TIPO_PESSOA;
}