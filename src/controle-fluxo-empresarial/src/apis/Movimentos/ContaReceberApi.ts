import { AxiosResponse } from 'axios';
import api from '../Api.configure';
import { PaginationQuery, PaginationResult } from '../../models/BaseEntity';
import ContaReceber, { CancelarContaReceber } from '../../models/Movimentos/ContaReceber';

class Api {

    EndPoint: string = "api/contas-receber";
    
    Save(t: ContaReceber): Promise<AxiosResponse<any>> {
        return api.post(this.EndPoint, t);
    }
    
    Update(conta: ContaReceber): Promise<AxiosResponse<any>> {
        return api.put(`${this.EndPoint}/(${conta.modelo}:${conta.serie}:${conta.numero}:${conta.parcela})`, conta);
    }
    
    GetById(modelo: string, serie: string, numero: string, parcela: string): Promise<AxiosResponse<ContaReceber>> {
        return api.get(`${this.EndPoint}/(${modelo}:${serie}:${numero}:${parcela})`);
    }
    
    GetListPagined(query: PaginationQuery): Promise<AxiosResponse<PaginationResult<ContaReceber>>> {
        return api.post(`${this.EndPoint}/list`, query);
    }
    
    Cancelar(conta: CancelarContaReceber): Promise<AxiosResponse<any>> {
        return api.put(`${this.EndPoint}/cancelar/(${conta.modelo}:${conta.serie}:${conta.numero}:${conta.parcela})`, conta);
    }
    CancelarBaixa(conta: CancelarContaReceber): Promise<AxiosResponse<any>> {
        return api.put(`${this.EndPoint}/cancelar-baixa/(${conta.modelo}:${conta.serie}:${conta.numero}:${conta.parcela})`, conta);
    }

    Receber(conta: ContaReceber): Promise<AxiosResponse<any>> {
        return api.put(`${this.EndPoint}/receber/(${conta.modelo}:${conta.serie}:${conta.numero}:${conta.parcela})`, conta);
    }

    Ativar(conta: ContaReceber): Promise<AxiosResponse<any>> {
        return api.put(`${this.EndPoint}/ativar/(${conta.modelo}:${conta.serie}:${conta.numero}:${conta.parcela})`, conta);
    }
}
export const ContaReceberApi = new Api();