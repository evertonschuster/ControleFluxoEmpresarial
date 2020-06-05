import { BaseEntity } from "../BaseEntity";

export interface Pais extends BaseEntity {
    id?: number;
    nome: string ;
    sigla: string;
    ddi: string;
}