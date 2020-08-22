import { AxiosResponse } from 'axios';
import api from '../Api.configure';
import { PaginationQuery, PaginationResult } from '../../models/BaseEntity';
import { Compra } from '../../models/Compras/Compra';

class Api {

    EndPoint: string = "";

    Save(t: Compra): Promise<AxiosResponse<any>> {
        return api.post(this.EndPoint, t);
    }

    Update(t: Compra): Promise<AxiosResponse<any>> {
        return api.put(`${this.EndPoint}/${t.numero}`, t);
    }

    GetById(id: number): Promise<AxiosResponse<Compra>> {
        return api.get(`${this.EndPoint}/${id.toString()}`);
    }

    Excluir(id: number): Promise<AxiosResponse<any>> {
        return api.delete(`${this.EndPoint}/${id.toString()}`);
    }

    GetListPagined(query: PaginationQuery): Promise<AxiosResponse<PaginationResult<Compra>>> {
        return api.post(`${this.EndPoint}/list`, query);
    }

    Desativar(id: number): Promise<AxiosResponse<any>> {
        return api.put(`${this.EndPoint}/desativar/${id.toString()}`);
    }
}
export const CompraApi = new Api();