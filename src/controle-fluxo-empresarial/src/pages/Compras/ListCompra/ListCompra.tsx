import React from 'react'
import ShowSituation from '../../../components/Situation/ShowSituation/ShowSituation';
import { CompraApi } from '../../../apis/Compras/CompraApi';
import { UseListPagined } from '../../../hoc/UseListPagined';
import { Compra } from '../../../models/Compras/Compra';
import { ColumnProps } from 'antd/lib/table';
import FormBasicLayout from '../../../layouts/FormBasicLayout/FormBasicLayout';
import ListForm from '../../../components/ListForm/ListForm';
import { formatData, formatDataWithHour, formatNumber2 } from './../../../utils/FormatNumber';
import { Produto } from './../../../models/Movimentos/Produto';
import { CompraProduto } from '../../../models/Compras/CompraProduto';
import CompraActions from './components/CompraActions';

const ListCompra: React.FC = () => {
    const response = UseListPagined({ getListPagined: CompraApi.GetListPagined.bind(CompraApi) });

    const columns: ColumnProps<Compra>[] = [
        {
            title: 'Modelo',
            dataIndex: 'modelo',
            key: 'modelo',
            align: "right",
            width: 80
        },
        {
            title: 'Série',
            dataIndex: 'serie',
            key: 'serie',
            align: "right",
            width: 80
        },
        {
            title: 'Numero',
            dataIndex: 'numero',
            key: 'numero',
            align: "right",
            width: 100
        },
        {
            title: 'Fornecedor',
            dataIndex: 'fornecedor.nome',
            key: 'fornecedor.nome',
        },
        {
            title: 'Data Emissão',
            dataIndex: 'dataEmissao',
            key: 'dataEmissao',
            width: 110,
            align: "right",
            render: (data) => formatData(data)
        },
        {
            title: 'Data Chegada',
            dataIndex: 'dataChegada',
            key: 'dataChegada',
            width: 110,
            align: "right",
            render: (data) => formatData(data)
        },
        {
            title: 'Qtde. Produtos',
            dataIndex: 'produtos',
            key: 'Qtdeprodutos',
            align: "right",
            render: (produtos: Produto[]) => produtos.length
        },
        {
            title: 'Total Compra',
            dataIndex: 'produtos',
            key: 'Totalprodutos',
            align: "right",
            render: (produtos: CompraProduto[]) => formatNumber2(produtos.reduce((prev, a) => prev + a.valorUnitario!, 0))
        },
        {
            title: 'Situação',
            dataIndex: 'situacao',
            render: ShowSituation
        },
        {
            title: 'Ações',
            key: 'action',
            width: "200px",
            render: (text: any, record: Compra, index: number) => <CompraActions record={record} index={index} />,
        }
    ];

    return (
        <FormBasicLayout breadcrumbList={[{ displayName: "Compras", URL: "/compras" }, { displayName: "Listagem", URL: undefined }]} >

            <ListForm
                hiddenAction
                tableProps={response}
                columns={columns} />

        </FormBasicLayout>
    );
}

export default ListCompra
