import { AxiosResponse } from 'axios'
import api from '../Api';
import { Estado } from '../../models/Cidades/Estado';

export const endPoint: string = 'api/Estado';


export function SaveEstado(estado: Estado): Promise<AxiosResponse<any>> {
    return api.post(endPoint, estado);
}

export function UpdateEstado(estado: Estado): Promise<AxiosResponse<any>> {
    return api.put(endPoint, estado);
}

export function GetEstadoById(id: number): Promise<AxiosResponse<Estado>> {
    return api.get(`${endPoint}/${id.toString()}`);
}

export function ExcluirEstado(id: number): Promise<AxiosResponse<any>> {
    return api.delete(`${endPoint}/${id.toString()}`);
}