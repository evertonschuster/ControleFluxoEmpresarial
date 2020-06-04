import { BaseEntity } from "../BaseEntity";

export interface Cidade extends BaseEntity {
    id?: number;
    nome: string;
    ddd: string;
    estadoId?: number | null;
}