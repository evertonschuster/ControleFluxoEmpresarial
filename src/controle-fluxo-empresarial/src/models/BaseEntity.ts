export interface BaseEntity extends IBaseEntity<number> {
}

export interface IBaseEntity<TId> {
    id?: TId;
    DataCriacao?: Date;
    DataAtualizacao?: Date;
}