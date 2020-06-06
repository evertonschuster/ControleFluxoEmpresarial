import React from 'react'
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout'
import { UseListPagined } from '../../../../hoc/UseListPagined';
import ListForm from '../../../../components/ListForm/ListForm';
import { FornecedorApi } from '../../../../apis/Pessoas/Fornecedor.Api';

const ListFornecedor: React.FC = () => {

    const response = UseListPagined({ getListPagined: FornecedorApi.GetListPagined.bind(FornecedorApi) });

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
                deleteFunction={FornecedorApi.Excluir.bind(FornecedorApi)}
                columns={columns} />

        </FormBasicLayout>
    )
}

export default ListFornecedor;