import React from 'react'
import { ColumnProps } from 'antd/lib/table';
import { ContaReceberApi } from '../../../../apis/Movimentos/ContaReceberApi';
import { formatData } from '../../../../utils/FormatNumber';
import { formatNumber2 } from './../../../../utils/FormatNumber';
import { UseListPagined } from '../../../../hoc/UseListPagined';
import ContaReceber from '../../../../models/Movimentos/ContaReceber';
import FilterSimpleHeader, { SituacaoReceberReceber } from './components/FilterSimpleHeader';
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';
import ListForm from '../../../../components/ListForm/ListForm';
import RecordAction from './components/RecordAction';
import ShowSituation from './components/ShowSituation';
import { Cliente } from '../../../../models/Pessoas/Cliente';

const ListContaReceber: React.FC = () => {
    const response = UseListPagined({ getListPagined: ContaReceberApi.GetListPagined.bind(ContaReceberApi) }, { situacao: [SituacaoReceberReceber.PENDENTE] });

    const columns: ColumnProps<ContaReceber>[] = [
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
            title: 'Nota',
            dataIndex: 'numero',
            width: 60,
            align: "right"
        },
        {
            title: 'Parcela',
            dataIndex: 'parcela',
            width: 70,
            align: "right"
        },
        {
            title: 'Cliente',
            dataIndex: 'cliente',
            render: (item: Cliente) => item.nome
        },
        {
            title: "Forma Pg.to.",
            render: (text: any, record: ContaReceber, index: number) => record.formaPagamento?.nome
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
            title: "Par.",
            width: 70,
            align: "right",
            render: (text: any, record: ContaReceber, index: number) => formatNumber2(record.valor!)
        },
        {
            title: 'Situação',
            render: ShowSituation
        },
        {
            title: 'Ações',
            key: 'action',
            width: "210px",
            render: (text: any, record: ContaReceber, index: number) => <RecordAction record={record} index={index} />,
        }
    ];

    return (
        <FormBasicLayout breadcrumbList={[{ displayName: "Contas a Receber", URL: "/conta-receber" }, { displayName: "Listagem", URL: undefined }]} >

            <ListForm
                filterSimpleHeader={<FilterSimpleHeader tableProps={response} />}
                hiddenAction
                keyProp={"dataCriacao"}
                tableProps={response}
                columns={columns} />
        </FormBasicLayout>
    )
}

export default ListContaReceber
