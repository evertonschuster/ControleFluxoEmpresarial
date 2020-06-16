import { Pessoa, TIPO_PESSOA } from "./Pessoa";

export interface Fornecedor extends Pessoa {
    condicaoPagamentoId?: number | null

    contato?: string | null;
    limiteCredito?: number | null;
    tipo?: TIPO_PESSOA;
}