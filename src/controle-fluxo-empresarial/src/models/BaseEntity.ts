export interface BaseEntity extends IBaseEntity<number> {
}

export interface IBaseEntity<TId> {
    id?: TId;
    DataCriacao?: Date;
    DataAtualizacao?: Date;
}

export interface PaginationQuery {
    pageSize: number;
    currentPage: number;
    filter?: string;
    orderByProps?: string;
}

export interface PaginationResult<TEntity> {
    pageSize: number;
    currentPage: number;
    totalItem: number;
    result: TEntity[]
}