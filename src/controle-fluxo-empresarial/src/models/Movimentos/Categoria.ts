import { BaseEntity } from "../BaseEntity";

export interface Categoria extends BaseEntity {
    id?: number,
    nome: string,
}