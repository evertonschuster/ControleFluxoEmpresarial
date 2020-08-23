export interface BaseEntity extends IBaseEntity<number> {
}

export interface IBaseEntity<TId> {
    id?: TId;
    dataCriacao?: Date;
    dataAtualizacao?: Date;
}

export interface IBaseEntity2 {
    dataCriacao?: Date;
    dataAtualizacao?: Date;
}

export interface PaginationQuery {
    pageSize: number;
    currentPage: number;
    filter?: string;
    orderByProps?: string;
    situacao?: SITUACAO
}

export interface PaginationResult<TEntity> {
    pageSize: number;
    currentPage: number;
    totalItem: number;
    result: TEntity[]
}

export enum SITUACAO {
    HABILITADO = "Habilitado",
    DESABILITADO = "Desabilitado",
    TODOS = "Todos"
}