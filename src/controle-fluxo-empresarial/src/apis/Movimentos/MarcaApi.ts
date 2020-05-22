import api from '../Api';
import { AxiosResponse } from 'axios';
import { Marca } from '../../models/Movimentos/Marca';


export const endPoint: string = 'api/marca';

export function SaveMarca(marca: Marca): Promise<AxiosResponse<any>> {
    return api.post(endPoint, marca);
}

export function UpdateMarca(marca: Marca): Promise<AxiosResponse<any>> {
    return api.put(endPoint, marca);
}

export function GetMarcaById(id: number): Promise<AxiosResponse<Marca>> {
    return api.get(`${endPoint}/${id.toString()}`);
}

export function ExcluirMarca(id: number): Promise<AxiosResponse<any>> {
    return api.delete(`${endPoint}/${id.toString()}`);
}