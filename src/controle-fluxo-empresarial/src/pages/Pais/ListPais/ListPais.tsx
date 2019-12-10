import React from 'react';
import FormLayout from '../../../layouts/FormBasicLayout/FormBasicLayout';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import ListForm from '../../../components/ListForm/ListForm';

const ListPais: React.FC<RouteComponentProps> = () => {

    const data = [
        {
            id: 1,
            pais: 'Brasil',
            sigla: "Br"
        },
        {
            id: 2,
            pais: 'Argentina',
            sigla: "Agr"
        },
        {
            id: 3,
            pais: 'Paraguai',
            sigla: "Py"
        },
    ]

    const columns = [
        {
            title: 'Codigo',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Pais',
            dataIndex: 'pais',
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

            <ListForm tableProps={{
                current: 2,
                dataSource: data,
                pageSize: 10,
                total: 120
            }}
                columns={columns} />

        </FormLayout>
    );

}

export default withRouter(ListPais);
