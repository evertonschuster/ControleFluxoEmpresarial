import React from 'react'
import { ExcluirProduto } from '../../../../apis/Movimentos/ProdutoApi';
import ListForm from '../../../../components/ListForm/ListForm';
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';
import { UseListPagined } from '../../../../hoc/UseListPagined';

 const ListProduto: React.FC = () => {
    const response = UseListPagined({ URL: "/api/produtos/list" });

    const columns = [
        {
            title: 'Codigo',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Produto',
            dataIndex: 'nome',
        },
        {
            title: 'Valor',
            dataIndex: 'valor',
        },
    ];

    return (
        <FormBasicLayout breadcrumbList={[{ displayName: "Produto", URL: "/produto" }, { displayName: "Listagem" }]} >

            <ListForm
                tableProps={response}
                deleteFunction={ExcluirProduto}
                columns={columns} />

        </FormBasicLayout>
    )
}

export default ListProduto;