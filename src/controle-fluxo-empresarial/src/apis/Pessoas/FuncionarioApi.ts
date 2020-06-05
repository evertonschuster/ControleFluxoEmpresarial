import api from '../Api';
import { AxiosResponse } from 'axios';
import { Funcionario } from '../../models/Pessoas/Funcionario';


export const endPoint: string = 'api/condicao-pagamento';

export function SaveFuncionario(funcionario: Funcionario): Promise<AxiosResponse<any>> {
    return api.post(endPoint, funcionario);
}

export function UpdateFuncionario(funcionario: Funcionario): Promise<AxiosResponse<any>> {
    return api.put(endPoint, funcionario);
}

export function GetFuncionarioById(id: number): Promise<AxiosResponse<Funcionario>> {
    return api.get(`${endPoint}/${id.toString()}`);
}

export function ExcluirFuncionario(id: number): Promise<AxiosResponse<any>> {
    return api.delete(`${endPoint}/${id.toString()}`);
}