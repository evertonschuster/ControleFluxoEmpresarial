import React from 'react';
import FormLayout from '../../../layouts/FormBasicLayout/FormBasicLayout';
import { RouteComponentProps } from 'react-router-dom';
import ListForm from '../../../components/ListForm/ListForm';

const ListEstado: React.FC<RouteComponentProps> = () => {

    const data = [
        {
            id: '1',
            estado: 'Parana',
            uF: "PR",
            pais: {
                id: '1',
                pais: 'Brasil',
                sigla: "Br"
            }
        },
        {
            id: '2',
            estado: 'Sao Paulo',
            uF: "SP",
            pais: {
                id: '1',
                pais: 'Brasil',
                sigla: "Br"
            }
        },
        {
            id: '3',
            estado: 'Rio de Janeiro',
            uF: "RJ",
            pais: {
                id: '1',
                pais: 'Brasil',
                sigla: "Br"
            }
        },
    ]

    const columns = [
        {
            title: 'Codigo',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado',
        },
        {
            title: 'UF',
            dataIndex: 'uF',
            key: 'uF',
        },
    ];


    return (
        <FormLayout breadcrumbList={[{ displayName: "Estado", URL: "/Estado" }, { displayName: "Listagem", URL: undefined }]} >


            {/* <ListForm tableProps={{
                current: 2,
                dataSource: data,
                pageSize: 10,
                total: 120
            }} columns={columns} /> */}


        </FormLayout>
    );

}

export default ListEstado;
