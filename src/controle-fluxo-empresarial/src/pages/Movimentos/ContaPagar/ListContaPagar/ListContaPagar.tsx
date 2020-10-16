import React from 'react'
import { ColumnProps } from 'antd/lib/table';
import { ContaPagarApi } from '../../../../apis/Movimentos/ContaPagarApi';
import { formatData } from '../../../../utils/FormatNumber';
import { formatNumber2 } from './../../../../utils/FormatNumber';
import { Fornecedor } from './../../../../models/Pessoas/Fornecedor';
import { UseListPagined } from '../../../../hoc/UseListPagined';
import ContaPagar from '../../../../models/Movimentos/ContaPagar';
import FilterSimpleHeader, { SituacaoContaPagar } from './components/FilterSimpleHeader';
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';
import ListForm from '../../../../components/ListForm/ListForm';
import RecordAction from './components/RecordAction';
import ShowSituation from './components/ShowSituation';

const ListContaPagar: React.FC = () => {
    const response = UseListPagined({ getListPagined: ContaPagarApi.GetListPagined.bind(ContaPagarApi) }, { situacao: [SituacaoContaPagar.PENDENTE] });

    const columns: ColumnProps<ContaPagar>[] = [
        {
            title: 'Mod.',
            dataIndex: 'modelo',
            width: 55,
            align: "right"
        },
        {
            title: 'Série',
            dataIndex: 'serie',
            width: 50,
            align: "right"
        },
        {
            title: 'Número',
            dataIndex: 'numero',
            width: 70,
            align: "right"
        },
        {
            title: 'Par.',
            dataIndex: 'parcela',
            width: 50,
            align: "right"
        },
        {
            title: 'Fornecedor',
            dataIndex: 'fornecedor',
            render: (item: Fornecedor) => item.nome
        },
        {
            title: "Forma Pg.to.",
            render: (text: any, record: ContaPagar, index: number) => record.formaPagamento?.nome
        },
        {
            title: 'Emi.',
            dataIndex: 'dataEmissao',
            width: 90,
            align: "right",
            render: (data) => formatData(data)
        },
        {
            title: 'Ven.',
            dataIndex: 'dataVencimento',
            width: 90,
            align: "right",
            render: (data) => formatData(data)
        },
        {
            title: 'Pag.',
            dataIndex: 'dataPagamento',
            width: 90,
            align: "right",
            render: (data) => data ? formatData(data) : "-"
        },
        {
            title: "Vlr.",
            width: 90,
            align: "right",
            render: (text: any, record: ContaPagar, index: number) => formatNumber2(record.valor!)
        },
        {
            title: 'Situação',
            render: ShowSituation
        },
        {
            title: 'Ações',
            key: 'action',
            width: "200px",
            render: (text: any, record: ContaPagar, index: number) => <RecordAction record={record} index={index} />,
        }
    ];

    return (
        <FormBasicLayout breadcrumbList={[{ displayName: "Contas a Pagar", URL: "/conta-pagar" }, { displayName: "Listagem", URL: undefined }]} >

            <ListForm
                filterSimpleHeader={<FilterSimpleHeader tableProps={response} />}
                hiddenAction
                keyProp={"dataCriacao"}
                tableProps={response}
                columns={columns} />
        </FormBasicLayout>
    )
}

export default ListContaPagar
