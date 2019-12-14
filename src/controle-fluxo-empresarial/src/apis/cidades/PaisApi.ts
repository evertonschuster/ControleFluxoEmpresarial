import { AxiosResponse } from 'axios'
import api from './../Api';
import moment from 'moment';
import { Pais } from './../../models/Cidades/Pais';

export const endPoint: string = 'api/pais';


export function SavePais(pais: Pais): Promise<AxiosResponse<any>> {
    return api.post(endPoint, pais);
}

export function UpdatePais(pais: Pais): Promise<AxiosResponse<any>> {
    return api.put(endPoint, pais);
}

export function GetPais(id: number): Promise<AxiosResponse<Pais>> {
    return api.get(`${endPoint}/${id.toString()}`);
}

