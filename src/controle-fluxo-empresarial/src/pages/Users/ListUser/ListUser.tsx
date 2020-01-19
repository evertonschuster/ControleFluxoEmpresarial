import React from 'react';
import FormLayout from '../../../layouts/FormBasicLayout/FormBasicLayout';
import { RouteComponentProps } from 'react-router-dom';
import ListForm from '../../../components/ListForm/ListForm';
import { UseListPagined } from '../../../hoc/UseListPagined';

const ListUser: React.FC<RouteComponentProps> = () => {

    const response = UseListPagined({ URL: "/api/User/list" });

    const columns = [
        {
            title: 'Codigo',
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
        <FormLayout breadcrumbList={[{ displayName: "Usuários", URL: "/User" }, { displayName: "Listagem", URL: undefined }]} >


            <ListForm
                tableProps={response}
                columns={columns} />


        </FormLayout>
    );

}

export default ListUser;
