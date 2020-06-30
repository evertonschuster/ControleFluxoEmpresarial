import { SEXO, ESTADO_CIVIL, Pessoa, TIPO_PESSOA } from "./Pessoa";

export interface Cliente extends Pessoa {
    limiteCredito?: number | null;
    condicaoPagamentoId?: number | null;


    sexo?: SEXO | null;
    estadoCivil?: ESTADO_CIVIL | null;
    tipo?: TIPO_PESSOA;
    isBrasileiro?: boolean | null;
    nacionalidade?: string | null,
    dataNascimento?: Date | null,

}