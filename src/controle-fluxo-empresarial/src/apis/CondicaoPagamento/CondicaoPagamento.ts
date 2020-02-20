import api from '../Api';
import { AxiosResponse } from 'axios';
import { CondicaoPagamento } from '../../models/CondicaoPagamento/CondicaoPagamento';


export const endPoint: string = 'api/condicao-pagamento';

export function SaveCondicaoPagamento(condicaopagamento: CondicaoPagamento): Promise<AxiosResponse<any>> {
    return api.post(endPoint, condicaopagamento);
}

export function UpdateCondicaoPagamento(condicaopagamento: CondicaoPagamento): Promise<AxiosResponse<any>> {
    return api.put(endPoint, condicaopagamento);
}

export function GetCondicaoPagamentoById(id: number): Promise<AxiosResponse<CondicaoPagamento>> {
    return api.get(`${endPoint}/${id.toString()}`);
}

export function ExcluirCondicaoPagamento(id: number): Promise<AxiosResponse<any>> {
    return api.delete(`${endPoint}/${id.toString()}`);
}