import React from 'react';
import FormLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';
import { RouteComponentProps } from 'react-router-dom';
import ListForm from '../../../../components/ListForm/ListForm';
import { UseListPagined } from '../../../../hoc/UseListPagined';

const ListEstado: React.FC<RouteComponentProps> = () => {

    const response = UseListPagined({ URL: "/api/Estado/list" });
    
    const columns = [
        {
            title: 'Codigo',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Estado',
            dataIndex: 'nome',
        },
        {
            title: 'UF',
            dataIndex: 'uf',
        },
    ];


    return (
        <FormLayout breadcrumbList={[{ displayName: "Estado", URL: "/Estado" }, { displayName: "Listagem", URL: undefined }]} >


            <ListForm tableProps={response} columns={columns} />


        </FormLayout>
    );

}

export default ListEstado;
