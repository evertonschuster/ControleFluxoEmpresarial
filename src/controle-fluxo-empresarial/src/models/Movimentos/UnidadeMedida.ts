import { BaseEntity, IBaseEntity } from "../BaseEntity";

export interface UnidadeMedida extends IBaseEntity<string | null> {
    id?: string | null,
    nome?: string | null,
}