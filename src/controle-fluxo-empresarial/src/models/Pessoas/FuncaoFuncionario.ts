import { BaseEntity } from "../BaseEntity";

export interface FuncaoFuncionario extends BaseEntity {
    nome: String;
    cargaHoraria?: number;
    requerCNH?: boolean;
    descricao?: String;
    observacao?: String;
}