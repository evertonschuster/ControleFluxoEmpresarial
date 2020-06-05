import api from '../Api';
import { AxiosResponse } from 'axios';
import { UnidadeMedida } from '../../models/Movimentos/UnidadeMedida';


export const endPoint: string = 'api/unidademedida';

export function SaveUnidadeMedida(unidademedida: UnidadeMedida): Promise<AxiosResponse<any>> {
    return api.post(endPoint, unidademedida);
}

export function UpdateUnidadeMedida(unidademedida: UnidadeMedida): Promise<AxiosResponse<any>> {
    return api.put(endPoint, unidademedida);
}

export function GetUnidadeMedidaById(id: number): Promise<AxiosResponse<UnidadeMedida>> {
    return api.get(`${endPoint}/${id.toString()}`);
}

export function ExcluirUnidadeMedida(id: number): Promise<AxiosResponse<any>> {
    return api.delete(`${endPoint}/${id.toString()}`);
}