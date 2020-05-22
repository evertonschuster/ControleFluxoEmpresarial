import React from 'react'
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout'
import ListForm from '../../../../components/ListForm/ListForm'
import { ExcluirCliente } from '../../../../apis/Pessoas/ClienteApi';
import { UseListPagined } from '../../../../hoc/UseListPagined';

const ListCliente:React.FC = () => {

    const response = UseListPagined({ URL: "/api/clientes/list" });

    const columns = [
        {
            title: 'Código',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Cliente',
            dataIndex: 'nome',
        },
        {
            title: 'CPF/CNPJ',
            dataIndex: 'cpfcnpj',
        },
        {
            title: 'Telefone',
            dataIndex: 'telefone',
        },
    ];
    
    return (
        <FormBasicLayout breadcrumbList={[{ displayName: "Clientes", URL: "/cliente" }, { displayName: "Listagem", URL: undefined }]} >

        <ListForm
            tableProps={response}
            deleteFunction={ExcluirCliente}
            columns={columns} />

    </FormBasicLayout>
    )
}

export default ListCliente

