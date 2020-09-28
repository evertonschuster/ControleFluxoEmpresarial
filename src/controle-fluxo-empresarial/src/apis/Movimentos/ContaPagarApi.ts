import { AxiosResponse } from 'axios';
import api from '../Api.configure';
import { PaginationQuery, PaginationResult } from '../../models/BaseEntity';
import ContaPagar, { CancelarContaPagar } from '../../models/Movimentos/ContaPagar';

class Api {

    EndPoint: string = "api/contas-pagar";

    Save(t: ContaPagar): Promise<AxiosResponse<any>> {
        return api.post(this.EndPoint, t);
    }

    Update(conta: ContaPagar): Promise<AxiosResponse<any>> {
        return api.put(`${this.EndPoint}/(${conta.modelo}:${conta.serie}:${conta.numero}:${conta.fornecedorId}:${conta.parcela})`, conta);
    }

    GetById(modelo: string, serie: string, numero: string, fornecedorId: string, parcela: string): Promise<AxiosResponse<ContaPagar>> {
        return api.get(`${this.EndPoint}/(${modelo}:${serie}:${numero}:${fornecedorId}:${parcela})`);
    }

    GetListPagined(query: PaginationQuery): Promise<AxiosResponse<PaginationResult<ContaPagar>>> {
        return api.post(`${this.EndPoint}/list`, query);
    }

    Cancelar(conta: CancelarContaPagar): Promise<AxiosResponse<any>> {
        return api.put(`${this.EndPoint}/cancelar/(${conta.modelo}:${conta.serie}:${conta.numero}:${conta.fornecedorId}:${conta.parcela})`, conta);
    }

    Pagar(conta: ContaPagar): Promise<AxiosResponse<any>> {
        return api.put(`${this.EndPoint}/pagar/(${conta.modelo}:${conta.serie}:${conta.numero}:${conta.fornecedorId}:${conta.parcela})`, conta);
    }

    Ativar(conta: ContaPagar): Promise<AxiosResponse<any>> {
        return api.put(`${this.EndPoint}/ativar/(${conta.modelo}:${conta.serie}:${conta.numero}:${conta.fornecedorId}:${conta.parcela})`, conta);
    }
}
export const ContaPagarApi = new Api();