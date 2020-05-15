import api from '../Api';
import { AxiosResponse } from 'axios';
import { FormaPagamento } from '../../models/CondicaoPagamento/FormaPagamento';


export const endPoint: string = 'api/forma-pagamento';

export function SaveFormaPagamento(formapagamento: FormaPagamento): Promise<AxiosResponse<any>> {
    return api.post(endPoint, formapagamento);
}

export function UpdateFormaPagamento(formapagamento: FormaPagamento): Promise<AxiosResponse<any>> {
    return api.put(endPoint, formapagamento);
}

export function GetFormaPagamentoById(id: number): Promise<AxiosResponse<FormaPagamento>> {
    return api.get(`${endPoint}/${id.toString()}`);
}

export function ExcluirFormaPagamento(id: number): Promise<AxiosResponse<any>> {
    return api.delete(`${endPoint}/${id.toString()}`);
}