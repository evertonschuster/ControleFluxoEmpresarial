import { AxiosResponse } from 'axios';
import api from './Api.configure';
import { IBaseEntity, PaginationResult, PaginationQuery } from '../models/BaseEntity';

export class ApiBaseGenerics<T extends IBaseEntity<any>, TId> {

    EndPoint: string;

    constructor(endPoint: string) {
        this.EndPoint = endPoint;
    }


    Save(t: T): Promise<AxiosResponse<any>> {
        return api.post(this.EndPoint, t);
    }

    Update(t: T): Promise<AxiosResponse<any>> {
        return api.put(`${this.EndPoint}/${t.id}`, t);
    }

    GetById(id: TId): Promise<AxiosResponse<T>> {
        return api.get(`${this.EndPoint}/${id}`);
    }

    Excluir(id: TId): Promise<AxiosResponse<any>> {
        return api.delete(`${this.EndPoint}/${id}`);
    }

    GetListPagined(query: PaginationQuery): Promise<AxiosResponse<PaginationResult<T>>> {
        return api.post(`${this.EndPoint}/list`, query);
    }

    Desativar(id: TId): Promise<AxiosResponse<any>> {
        return api.put(`${this.EndPoint}/desativar/${id}`);
    }
}

export class ApiBase<T extends IBaseEntity<any>> extends ApiBaseGenerics<T, number> {

}
