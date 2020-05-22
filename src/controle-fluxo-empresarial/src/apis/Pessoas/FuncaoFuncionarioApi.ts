import api from '../Api';
import { AxiosResponse } from 'axios';
import { FuncaoFuncionario } from '../../models/Pessoas/FuncaoFuncionario';


export const endPoint: string = 'api/funcao-funcionario';

export function SaveFuncaoFuncionario(funcaofuncionario: FuncaoFuncionario): Promise<AxiosResponse<any>> {
    return api.post(endPoint, funcaofuncionario);
}

export function UpdateFuncaoFuncionario(funcaofuncionario: FuncaoFuncionario): Promise<AxiosResponse<any>> {
    return api.put(endPoint, funcaofuncionario);
}

export function GetFuncaoFuncionarioById(id: number): Promise<AxiosResponse<FuncaoFuncionario>> {
    return api.get(`${endPoint}/${id.toString()}`);
}

export function ExcluirFuncaoFuncionario(id: number): Promise<AxiosResponse<any>> {
    return api.delete(`${endPoint}/${id.toString()}`);
}