import React, { useState, useEffect } from 'react';
import FormLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import ListForm from '../../../../components/ListForm/ListForm';
import { UseListPagined } from '../../../../hoc/UseListPagined';
import { Button } from 'antd';
import { ExcluirPais } from '../../../../apis/cidades/PaisApi';

const ListPais: React.FC<RouteComponentProps> = () => {

    const response = UseListPagined({ URL: "/api/pais/list" });

    const columns = [
        {
            title: 'Codigo',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Pais',
            dataIndex: 'nome',
            // key: 'pais',
        },
        {
            title: 'Sigla',
            dataIndex: 'sigla',
            // key: 'sigla',
        },
    ];



    return (
        <FormLayout breadcrumbList={[{ displayName: "Pais", URL: "/pais" }, { displayName: "Listagem", URL: undefined }]} >

            <ListForm
                tableProps={response}
                deleteFunction={ExcluirPais}
                columns={columns} />

        </FormLayout>
    );

}

export default withRouter(ListPais);
