import { SEXO, ESTADO_CIVIL, Pessoa } from "./Pessoa";

export interface Funcionario extends Pessoa {
    estadoCivil?: ESTADO_CIVIL;
    sexo?: SEXO | null,
    nacionalidade?: string | null,
    isBrasileiro?: boolean;
    dataNascimento?: Date | null,

    cnh?: String | null,
    dataValidadeCNH?: Date | null;
    funcaoFuncionarioId?: number | null;
}