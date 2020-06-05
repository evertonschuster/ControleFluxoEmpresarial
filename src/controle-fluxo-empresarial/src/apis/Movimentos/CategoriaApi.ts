import api from '../Api';
import { AxiosResponse } from 'axios';
import { Categoria } from '../../models/Movimentos/Categoria';


export const endPoint: string = 'api/categoria';

export function SaveCategoria(categoria: Categoria): Promise<AxiosResponse<any>> {
    return api.post(endPoint, categoria);
}

export function UpdateCategoria(categoria: Categoria): Promise<AxiosResponse<any>> {
    return api.put(endPoint, categoria);
}

export function GetCategoriaById(id: number): Promise<AxiosResponse<Categoria>> {
    return api.get(`${endPoint}/${id.toString()}`);
}

export function ExcluirCategoria(id: number): Promise<AxiosResponse<any>> {
    return api.delete(`${endPoint}/${id.toString()}`);
}