import React, { } from 'react';
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';
import { RouteComponentProps } from 'react-router-dom';
import ListForm from '../../../../components/ListForm/ListForm';
import { UseListPagined } from '../../../../hoc/UseListPagined';
import { ExcluirCidade } from '../../../../apis/Cidades/CidadeApi';

const ListCidade: React.FC<RouteComponentProps> = () => {

    const response = UseListPagined({ URL: "/api/Cidade/list" });

    const columns = [
        {
            title: 'Código',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Cidade',
            dataIndex: 'nome',
        },
        {
            title: 'DDD',
            dataIndex: 'ddd',
        },
    ];



    return (
        <FormBasicLayout breadcrumbList={[{ displayName: "Cidade", URL: "/cidade" }, { displayName: "Listagem", URL: undefined }]} >

            <ListForm
                tableProps={response}
                deleteFunction={ExcluirCidade}
                columns={columns} />

        </FormBasicLayout>
    );

}

export default ListCidade;
