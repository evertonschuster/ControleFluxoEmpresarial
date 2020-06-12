import React from 'react'
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout'
import ListForm from '../../../../components/ListForm/ListForm'
import { UseListPagined } from '../../../../hoc/UseListPagined';
import { ClienteApi } from '../../../../apis/Pessoas/ClienteApi';

const ListCliente:React.FC = () => {

    const response = UseListPagined({ getListPagined: ClienteApi.GetListPagined.bind(ClienteApi)  });

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
            dataIndex: 'cpfcpnj',
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
            deleteFunction={ClienteApi.Excluir.bind(ClienteApi)}
            columns={columns} />

    </FormBasicLayout>
    )
}

export default ListCliente

