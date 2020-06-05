import api from '../Api';
import { AxiosResponse } from 'axios';
import LoginUserModel from '../../models/Pessoas/LoginUser';
import AuthenticatedUser from '../../models/Pessoas/AuthenticatedUser';
import UserModel from '../../models/Pessoas/UserModel';
import UserChangePasswordModel from '../../models/Pessoas/UserChangePasswordModel';

export const endPoint: string = 'api/user';


export function tryLoginUser(user: LoginUserModel): Promise<AxiosResponse<AuthenticatedUser>> {
    return api.post(endPoint + "/authorize", user);
}

export function UpdateUser(user: UserModel): Promise<AxiosResponse<any>> {
    return api.put(endPoint, user);
}

export function ChangePasswordUser(user: UserChangePasswordModel): Promise<AxiosResponse<any>> {
    return api.put(endPoint + "/Change-Password", user);
}


export function SaveUser(user: UserModel): Promise<AxiosResponse<any>> {
    return api.post(endPoint, user);
}


export function GetUserById(id: number): Promise<AxiosResponse<UserModel>> {
    return api.get(`${endPoint}/${id.toString()}`);
}
