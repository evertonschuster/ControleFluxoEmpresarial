import { AxiosResponse } from 'axios';
import api from '../Api.configure';
import { PaginationQuery, PaginationResult } from '../../models/BaseEntity';
import { Compra } from '../../models/Compras/Compra';
import { CompraProduto } from '../../models/Compras/CompraProduto';

class Api {

    EndPoint: string = "api/compras";

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

    CalcularValorRatiado(produtos: CompraProduto[], frete?: number, seguro?: number, outrasDespesas?: number): Promise<AxiosResponse<CompraProduto[]>> {
        return api.post(`${this.EndPoint}/calcular-valor-ratiado`, { produtos, frete, seguro, outrasDespesas });
    }
}
export const CompraApi = new Api();