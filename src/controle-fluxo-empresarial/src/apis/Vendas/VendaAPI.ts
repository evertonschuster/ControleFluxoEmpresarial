import { AxiosResponse } from 'axios';
import api from '../Api.configure';
import { PaginationQuery, PaginationResult } from '../../models/BaseEntity';
import { Venda } from '../../models/Vendas/Venda';
import { CancelarVenda } from '../../models/Vendas/CancelarVenda';

class Api {

    EndPoint: string = "api/vendas";

    Cancelar(venda: CancelarVenda): Promise<AxiosResponse<any>> {
        return api.post(`${this.EndPoint}/cancelar/(${venda.modelo}:${venda.serie}:${venda.numero})`, venda);
    }

    Save(t: Venda): Promise<AxiosResponse<any>> {
        return api.post(this.EndPoint, t);
    }

    Update(t: Venda): Promise<AxiosResponse<any>> {
        return api.put(`${this.EndPoint}/${t.numero}`, t);
    }

    GetById(modelo: string, serie: string, numero: string): Promise<AxiosResponse<Venda>> {
        return api.get(`${this.EndPoint}/(${modelo}:${serie}:${numero})`);
    }

    Excluir(id: number): Promise<AxiosResponse<any>> {
        return api.delete(`${this.EndPoint}/${id.toString()}`);
    }

    GetListPagined(query: PaginationQuery): Promise<AxiosResponse<PaginationResult<Venda>>> {
        return api.post(`${this.EndPoint}/list`, query);
    }

    Desativar(id: number): Promise<AxiosResponse<any>> {
        return api.put(`${this.EndPoint}/desativar/${id.toString()}`);
    }
}
export const VendaApi = new Api();