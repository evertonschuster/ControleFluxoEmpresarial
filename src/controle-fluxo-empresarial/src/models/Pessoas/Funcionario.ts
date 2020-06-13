import { SEXO, ESTADO_CIVIL, Pessoa } from "./Pessoa";

export interface Funcionario extends Pessoa{
    sexo?: SEXO,
    estadoCivil?: ESTADO_CIVIL,
    cnh?:String,
    nacionalidade?: string,
    dataNascimento?: Date,

}