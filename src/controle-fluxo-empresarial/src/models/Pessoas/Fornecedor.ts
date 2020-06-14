import { Pessoa, TIPO_PESSOA } from "./Pessoa";

export interface Fornecedor extends Pessoa {
    contato?: string;
    limiteCredito?: number;
    tipo?: TIPO_PESSOA;
}