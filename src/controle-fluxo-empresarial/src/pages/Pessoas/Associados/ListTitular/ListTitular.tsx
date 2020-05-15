import React, { } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { UseListPagined } from '../../../../hoc/UseListPagined';
import { ExcluirTitular } from '../../../../apis/Pessoas/AssociadoApi';
import ListForm from '../../../../components/ListForm/ListForm';
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';

const ListTitular: React.FC<RouteComponentProps> = () => {

    const response = UseListPagined({ URL: "/api/associados/list" });

    const columns = [
        {
            title: 'Codigo',
            dataIndex: 'id',
        },
        {
            title: 'Nome',
            dataIndex: 'nome',
        },
        {
            title: 'CPF',
            dataIndex: 'cpf',
        },
        {
            title: 'RG',
            dataIndex: 'rg',
        },
        {
            title: 'Telefone',
            dataIndex: 'telefone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Bairro',
            dataIndex: 'bairro',
        },
    ];



    return (
        <FormBasicLayout breadcrumbList={[{ displayName: "Associados", URL: "/associados" }, { displayName: "Listagem", URL: undefined }]} >

            <ListForm
                tableProps={response}
                deleteFunction={ExcluirTitular}
                columns={columns} />

        </FormBasicLayout>
    );

}

export default withRouter(ListTitular);
