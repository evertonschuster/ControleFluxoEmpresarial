import React from 'react'
import ListForm from '../../../../components/ListForm/ListForm';
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';
import { UseListPagined } from '../../../../hoc/UseListPagined';
import { ProdutoApi } from '../../../../apis/Movimentos/ProdutoApi';

 const ListProduto: React.FC = () => {
    const response = UseListPagined({ getListPagined: ProdutoApi.GetListPagined.bind(ProdutoApi) 
    });

    const columns = [
        {
            title: 'Código',
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
        <FormBasicLayout breadcrumbList={[{ displayName: "Produtos", URL: "/produto" }, { displayName: "Listagem" }]} >

            <ListForm
                tableProps={response}
                deleteFunction={ProdutoApi.Excluir.bind(ProdutoApi)}
                columns={columns} />

        </FormBasicLayout>
    )
}

export default ListProduto;