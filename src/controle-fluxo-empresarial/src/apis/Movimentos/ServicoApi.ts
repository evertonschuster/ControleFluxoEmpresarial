import api from '../Api';
import { AxiosResponse } from 'axios';
import { Servico } from '../../models/Movimentos/Servico';


export const endPoint: string = 'api/servicos';

export function SaveServico(servico: Servico): Promise<AxiosResponse<any>> {
    return api.post(endPoint, servico);
}

export function UpdateServico(servico: Servico): Promise<AxiosResponse<any>> {
    return api.put(endPoint, servico);
}

export function GetServicoById(id: number): Promise<AxiosResponse<Servico>> {
    return api.get(`${endPoint}/${id.toString()}`);
}

export function ExcluirServico(id: number): Promise<AxiosResponse<any>> {
    return api.delete(`${endPoint}/${id.toString()}`);
}