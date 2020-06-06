import React, { } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { UseListPagined } from '../../../../hoc/UseListPagined';
import ListForm from '../../../../components/ListForm/ListForm';
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';
import { TitularApi } from '../../../../apis/Pessoas/AssociadoApi';

const ListTitular: React.FC<RouteComponentProps> = () => {

    const response = UseListPagined({ getListPagined: TitularApi.GetListPagined.bind(TitularApi) });

    const columns = [
        {
            title: 'Código',
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
                deleteFunction={TitularApi.Excluir}
                columns={columns} />

        </FormBasicLayout>
    );

}

export default withRouter(ListTitular);
