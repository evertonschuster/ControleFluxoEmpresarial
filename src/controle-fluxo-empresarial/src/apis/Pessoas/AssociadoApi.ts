import api from '../Api';
import { AxiosResponse } from 'axios';
import { Titular } from '../../models/Pessoas/Titular';

export const endPoint: string = 'api/associados';


export function SaveTitular(titular: Titular): Promise<AxiosResponse<any>> {
    return api.post(endPoint, titular);
}

export function UpdateTitular(titular: Titular): Promise<AxiosResponse<any>> {
    return api.put(endPoint, titular);
}

export function GetTitularById(id: number): Promise<AxiosResponse<Titular>> {
    return api.get(`${endPoint}/${id.toString()}`);
}

export function ExcluirTitular(id: number): Promise<AxiosResponse<any>> {
    return api.delete(`${endPoint}/${id.toString()}`);
}