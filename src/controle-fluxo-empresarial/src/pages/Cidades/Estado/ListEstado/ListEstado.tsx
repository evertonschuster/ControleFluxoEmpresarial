import React from 'react';
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';
import { RouteComponentProps } from 'react-router-dom';
import ListForm from '../../../../components/ListForm/ListForm';
import { UseListPagined } from '../../../../hoc/UseListPagined';
import { ExcluirEstado } from '../../../../apis/Cidades/EstadoApi';

const ListEstado: React.FC<RouteComponentProps> = () => {

    const response = UseListPagined({ URL: "/api/Estado/list" });

    const columns = [
        {
            title: 'Código',
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
        <FormBasicLayout breadcrumbList={[{ displayName: "Estado", URL: "/Estado" }, { displayName: "Listagem", URL: undefined }]} >


            <ListForm
                tableProps={response}
                deleteFunction={ExcluirEstado}
                columns={columns} />


        </FormBasicLayout>
    );

}

export default ListEstado;
