import * as Yup from 'yup';
import LoginUserModel from '../../../../models/Pessoas/LoginUser';


export const LoginUserSchema = Yup.object().shape<LoginUserModel>({
    userName: Yup.string().required("Infrome o login."),
    password: Yup.string().required("Infrome a senha."),
});