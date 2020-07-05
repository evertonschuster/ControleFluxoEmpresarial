import React from 'react';
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';
import { RouteComponentProps } from 'react-router-dom';
import ListForm from '../../../../components/ListForm/ListForm';
import { UseListPagined } from '../../../../hoc/UseListPagined';
import { UserApi } from '../../../../apis/Pessoas/UserApi';

const ListUser: React.FC<RouteComponentProps> = () => {

    const response = UseListPagined({ getListPagined: UserApi.GetListPagined.bind(UserApi) });

    const columns = [
        {
            title: 'Código',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Usuário',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Telefone',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },

    ];


    return (
        <FormBasicLayout breadcrumbList={[{ displayName: "Usuários", URL: "/User" }, { displayName: "Listagem", URL: undefined }]} >


            <ListForm
                tableProps={response}
                desativarFunction={UserApi.Desativar.bind(UserApi)}
                columns={columns} />


        </FormBasicLayout>
    );

}

export default ListUser;
