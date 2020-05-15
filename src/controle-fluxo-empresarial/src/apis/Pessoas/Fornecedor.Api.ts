import api from '../Api';
import { AxiosResponse } from 'axios';
import { Fornecedor } from '../../models/Pessoas/Fornecedor';


export const endPoint: string = 'api/condicao-pagamento';

export function SaveFornecedor(fornecedor: Fornecedor): Promise<AxiosResponse<any>> {
    return api.post(endPoint, fornecedor);
}

export function UpdateFornecedor(fornecedor: Fornecedor): Promise<AxiosResponse<any>> {
    return api.put(endPoint, fornecedor);
}

export function GetFornecedorById(id: number): Promise<AxiosResponse<Fornecedor>> {
    return api.get(`${endPoint}/${id.toString()}`);
}

export function ExcluirFornecedor(id: number): Promise<AxiosResponse<any>> {
    return api.delete(`${endPoint}/${id.toString()}`);
}