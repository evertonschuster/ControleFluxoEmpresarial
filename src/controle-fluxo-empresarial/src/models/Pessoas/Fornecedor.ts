import { Pessoa, TIPO_PESSOA } from "./Pessoa";

export interface Fornecedor extends Pessoa {
    responsavel?: string;
    tipo?: TIPO_PESSOA
}