import { AxiosResponse } from 'axios';
import api from '../../Api.configure';
import { PaginationQuery, PaginationResult } from '../../../models/BaseEntity';
import ContaPagar from '../../../models/Movimentos/ContaPagar';

class Api {

    EndPoint: string = "";

    Save(t: ContaPagar): Promise<AxiosResponse<any>> {
        return api.post(this.EndPoint, t);
    }

    Update(t: ContaPagar): Promise<AxiosResponse<any>> {
        return api.put(`${this.EndPoint}/${t.numero}`, t);
    }

    GetById(id: string): Promise<AxiosResponse<ContaPagar>> {
        return api.get(`${this.EndPoint}/${id.toString()}`);
    }

    Excluir(id: number): Promise<AxiosResponse<any>> {
        return api.delete(`${this.EndPoint}/${id.toString()}`);
    }

    GetListPagined(query: PaginationQuery): Promise<AxiosResponse<PaginationResult<ContaPagar>>> {
        return api.post(`${this.EndPoint}/list`, query);
    }

    Desativar(id: number): Promise<AxiosResponse<any>> {
        return api.put(`${this.EndPoint}/desativar/${id.toString()}`);
    }
}
export const ContaPagarApi = new Api();