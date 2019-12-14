import React, { useState, useEffect } from 'react';
import FormLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import ListForm from '../../../../components/ListForm/ListForm';
import { UseListPagined } from '../../../../hoc/UseListPagined';
import { Button } from 'antd';
import { ExcluirCidade } from '../../../../apis/cidades/CidadeApi';

const ListCidade: React.FC<RouteComponentProps> = () => {

    const response = UseListPagined({ URL: "/api/Cidade/list" });

    const columns = [
        {
            title: 'Codigo',
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
        <FormLayout breadcrumbList={[{ displayName: "Cidade", URL: "/cidade" }, { displayName: "Listagem", URL: undefined }]} >

            <ListForm
                tableProps={response}
                deleteFunction={ExcluirCidade}
                columns={columns} />

        </FormLayout>
    );

}

export default withRouter(ListCidade);
