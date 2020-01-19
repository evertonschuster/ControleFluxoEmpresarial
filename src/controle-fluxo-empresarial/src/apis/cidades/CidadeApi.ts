import api from '../Api';
import { Cidade } from '../../models/Cidades/Cidade';
import { AxiosResponse } from 'axios';


export const endPoint: string = 'api/Cidade';

export function SaveCidade(cidade: Cidade): Promise<AxiosResponse<any>> {
    return api.post(endPoint, cidade);
}

export function UpdateCidade(cidade: Cidade): Promise<AxiosResponse<any>> {
    return api.put(endPoint, cidade);
}

export function GetCidadeById(id: number): Promise<AxiosResponse<Cidade>> {
    return api.get(`${endPoint}/${id.toString()}`);
}

export function ExcluirCidade(id: number): Promise<AxiosResponse<any>> {
    return api.delete(`${endPoint}/${id.toString()}`);
}