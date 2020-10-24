import React from 'react'
import { ColumnProps } from 'antd/lib/table';
import { Produto } from '../../../../models/Movimentos/Produto';
import { ProdutoApi } from '../../../../apis/Movimentos/ProdutoApi';
import { Typography } from 'antd';
import { UseListPagined } from '../../../../hoc/UseListPagined';
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';
import ListForm from '../../../../components/ListForm/ListForm';
import ShowSituation from '../../../../components/Situation/ShowSituation/ShowSituation';
import { formatNumber2 } from './../../../../utils/FormatNumber';
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
            title: 'Estoque',
            dataIndex: 'quantidade',
            align: "right",
            render: (quantidade: number, record: Produto) => {
                if (record.quantidadeMinima! > quantidade) {
                    return <Text type="warning">{formatNumber2(quantidade)}</Text>
                }
                return formatNumber2(quantidade)
            }
        },
        {
            title: 'Valor de Venda',
            dataIndex: 'valorVenda',
            align: "right",
            render: (valorVenda: number, record: Produto) => {
                if (record.valorVenda && record.valorCompra && record.valorVenda < record.valorCompra) {
                    return <Text type="warning">{formatNumber2(record.valorVenda)}</Text>
                }

                return formatNumber2(record.valorVenda ?? 0)
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
                desativarFunction={ProdutoApi.Desativar.bind(ProdutoApi)}
                columns={columns} />

        </FormBasicLayout>
    )
}

export default ListProduto;