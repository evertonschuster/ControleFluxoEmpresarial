import api from '../Api.configure';
import { AxiosResponse } from 'axios';
import LoginUserModel from '../../models/Pessoas/LoginUser';
import AuthenticatedUser from '../../models/Pessoas/AuthenticatedUser';
import UserModel from '../../models/Pessoas/UserModel';
import UserChangePasswordModel from '../../models/Pessoas/UserChangePasswordModel';
import { ApiBaseGenerics } from '../Api';

export const endPoint: string = 'api/user';

class Api extends ApiBaseGenerics<UserModel, string>{

    constructor() {
        super(endPoint);
    }

    TryLoginUser(user: LoginUserModel): Promise<AxiosResponse<AuthenticatedUser>> {
        return api.post(endPoint + "/authorize", user);
    }

    ChangePasswordUser(user: UserChangePasswordModel): Promise<AxiosResponse<any>> {
        return api.put(endPoint + "/Change-Password", user);
    }
}
export const UserApi = new Api();



