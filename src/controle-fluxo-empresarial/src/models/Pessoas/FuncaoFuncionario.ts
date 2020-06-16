import { BaseEntity } from "../BaseEntity";

export interface FuncaoFuncionario extends BaseEntity {
    nome?: String | null;
    cargaHoraria?: number | null;
    requerCNH?: boolean ;
    descricao?: String | null;
    observacao?: String | null;
}