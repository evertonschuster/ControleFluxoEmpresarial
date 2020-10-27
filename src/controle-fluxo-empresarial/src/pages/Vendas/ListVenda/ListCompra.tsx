import React from 'react'
import { ColumnProps } from 'antd/lib/table';
import { Produto } from './../../../models/Movimentos/Produto';
import { UseListPagined } from '../../../hoc/UseListPagined';
import { Venda } from '../../../models/Vendas/Venda';
import { VendaApi } from '../../../apis/Vendas/VendaAPI';
import FormBasicLayout from '../../../layouts/FormBasicLayout/FormBasicLayout';
import ListForm from '../../../components/ListForm/ListForm';
import ShowSituation from './componets/ShowSituation';
import { formatData, formatNumber2 } from '../../../utils/FormatNumber';
import { VendaProduto } from '../../../models/Vendas/VendaProduto';
import VendaActions from './componets/VendaActions';


const ListVenda: React.FC = () => {
    const requestProps = UseListPagined({ getListPagined: VendaApi.GetListPagined.bind(VendaApi) }, { pageSize: 10, currentPage: 1 });

    const columns: ColumnProps<Venda>[] = [
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
            title: 'Número',
            dataIndex: 'numero',
            key: 'numero',
            align: "right",
            width: 100
        },
        {
            title: 'Cliente',
            dataIndex: 'cliente.nome',
            key: 'cliente.nome',
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
            title: 'Total Compra',
            dataIndex: 'produtos',
            key: 'Totalprodutos',
            align: "right",
            render: (produtos: VendaProduto[]) => formatNumber2((produtos ?? []).reduce((prev, a) => prev + a.valor!, 0))
        },
        {
            title: 'Qtde. Produtos',
            dataIndex: 'produtos',
            key: 'Qtdeprodutos',
            align: "right",
            render: (produtos: Produto[]) => (produtos ?? []).length
        },
        {
            title: 'Situação',
            key: 'situacao',
            render: (record) => <ShowSituation {...record} />
        },
        {
            title: 'Ações',
            key: 'action',
            width: "200px",
            render: (text: any, record: Venda, index: number) => <VendaActions record={record} index={index} />,
        }
    ];

    return (
        <FormBasicLayout breadcrumbList={[{ displayName: "Vendas", URL: "/vendas" }, { displayName: "Listagem", URL: undefined }]} >

            <ListForm
                // filterAdvancedHeader={<ListFilterAdvanced tableProps={requestProps} />}
                // filterSimpleHeader={<ListFilter tableProps={requestProps} />}
                hiddenAction
                tableProps={requestProps}
                columns={columns} />

        </FormBasicLayout>
    );
}

export default ListVenda
