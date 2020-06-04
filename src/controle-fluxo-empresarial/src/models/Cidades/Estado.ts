import { BaseEntity } from "../BaseEntity";

export interface Estado extends BaseEntity {
    id?: number;
    nome: string;
    uf: string;
    paisId?: number | null;
}