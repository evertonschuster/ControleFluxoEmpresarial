import React from 'react'
import ListForm from '../../../../components/ListForm/ListForm';
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';
import { UseListPagined } from '../../../../hoc/UseListPagined';
import { ProdutoApi } from '../../../../apis/Movimentos/ProdutoApi';
import { ColumnProps } from 'antd/lib/table';
import { Produto } from '../../../../models/Movimentos/Produto';
import { Typography } from 'antd';
import ShowSituation from '../../../../components/Situation/ShowSituation';
const { Text } = Typography;

const ListProduto: React.FC = () => {
    const response = UseListPagined({
        getListPagined: ProdutoApi.GetListPagined.bind(ProdutoApi)
    });

    const columns: ColumnProps<Produto>[] = [
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
            title: 'Categoria',
            dataIndex: 'categoria.nome',
        },
        {
            title: 'Marca',
            dataIndex: 'marca.nome',
        },
        {
            title: 'Valor de Venda',
            dataIndex: 'valorVenda',
            align:"right",
            render: (valorVenda: number, record: Produto) => {
                let format = Intl.NumberFormat(undefined, {
                    minimumFractionDigits: 2
                });

                if (record.valorVenda && record.valorCompra && record.valorVenda < record.valorCompra) {
                    return <Text type="warning">{format.format(record.valorVenda)}</Text>
                }

                return format.format(record.valorVenda ?? 0)
            }
        },
        {
            title: 'Situação',
            dataIndex: 'situacao',
            render: ShowSituation
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