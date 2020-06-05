import api from '../Api';
import { AxiosResponse } from 'axios';
import { Produto } from '../../models/Movimentos/Produto';


export const endPoint: string = 'api/produtos';

export function SaveProduto(produto: Produto): Promise<AxiosResponse<any>> {
    return api.post(endPoint, produto);
}

export function UpdateProduto(produto: Produto): Promise<AxiosResponse<any>> {
    return api.put(endPoint, produto);
}

export function GetProdutoById(id: number): Promise<AxiosResponse<Produto>> {
    return api.get(`${endPoint}/${id.toString()}`);
}

export function ExcluirProduto(id: number): Promise<AxiosResponse<any>> {
    return api.delete(`${endPoint}/${id.toString()}`);
}