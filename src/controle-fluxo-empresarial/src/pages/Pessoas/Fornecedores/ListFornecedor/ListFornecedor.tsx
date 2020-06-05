import React from 'react'
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout'
import { UseListPagined } from '../../../../hoc/UseListPagined';
import ListForm from '../../../../components/ListForm/ListForm';
import { ExcluirFornecedor } from '../../../../apis/Pessoas/Fornecedor.Api';

 const ListFornecedor: React.FC = () => {
    
    const response = UseListPagined({ URL: "/api/fornecedors/list" });

    const columns = [
        {
            title: 'Código',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Funcionário',
            dataIndex: 'fornecedor',
        },
        {
            title: 'Cargo',
            dataIndex: 'cargo',
        },
        {
            title: 'Telefone',
            dataIndex: 'telefone',
        },
    ];

    return (
        <FormBasicLayout breadcrumbList={[{ displayName: "Fornecedores", URL: "/fornecedor" }, { displayName: "Listagem", URL: undefined }]} >

        <ListForm
            tableProps={response}
            deleteFunction={ExcluirFornecedor}
            columns={columns} />

    </FormBasicLayout>
    )
}

export default ListFornecedor;