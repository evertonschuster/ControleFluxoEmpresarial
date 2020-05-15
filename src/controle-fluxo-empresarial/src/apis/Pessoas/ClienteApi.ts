import api from '../Api';
import { AxiosResponse } from 'axios';
import { Cliente } from '../../models/Pessoas/Cliente';


export const endPoint: string = 'api/condicao-pagamento';

export function SaveCliente(cliente: Cliente): Promise<AxiosResponse<any>> {
    return api.post(endPoint, cliente);
}

export function UpdateCliente(cliente: Cliente): Promise<AxiosResponse<any>> {
    return api.put(endPoint, cliente);
}

export function GetClienteById(id: number): Promise<AxiosResponse<Cliente>> {
    return api.get(`${endPoint}/${id.toString()}`);
}

export function ExcluirCliente(id: number): Promise<AxiosResponse<any>> {
    return api.delete(`${endPoint}/${id.toString()}`);
}