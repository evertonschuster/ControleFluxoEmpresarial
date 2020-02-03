import * as Yup from 'yup';
import UserModel from '../../../models/Users/UserModel';
import { FormMode } from '../../../layouts/BasicLayout/BasicLayoutContext';
import UserChangePasswordModel from '../../../models/Users/UserChangePasswordModel';


export const UserSchema = (formMode: FormMode) => Yup.object().shape<UserModel>({

    userName: Yup
        .string()
        .required("Informe o nome do usuário."),

    phoneNumber: Yup
        .string()
        .nullable()
        .required("Informe o número de telefone."),

    email: Yup
        .string()
        .email("Informe um email válido.")
        .required("Informe o email."),

    password: Yup
        .string()
        .required(() => formMode == FormMode.New ? "Informe uma senha." : undefined),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], "Senha e Confirmar senha não coincidem.")
        .required((e) => formMode == FormMode.New ? "Informe uma senha." : undefined)
});

export const UserChangePasswor = Yup.object().shape<UserChangePasswordModel>({

    currentPassword: Yup
        .string()
        .required("Informe a senha atual."),

    newPassword: Yup
        .string()
        .required("Informe a nova senha."),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], "Senha e Confirmar senha não coincidem.")
        .required("Informe a nova senha.")
});