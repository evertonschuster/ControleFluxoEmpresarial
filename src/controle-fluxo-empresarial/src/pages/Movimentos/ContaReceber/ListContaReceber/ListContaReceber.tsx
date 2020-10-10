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
            title: 'Modelo',
            dataIndex: 'modelo',
            width: 70,
        },
        {
            title: 'Série',
            dataIndex: 'serie',
            width: 50,
        },
        {
            title: 'Número',
            dataIndex: 'numero',
            width: 70,
        },
        {
            title: 'Cliente',
            dataIndex: 'cliente',
            render: (item: Cliente) => item.nome
        },
        {
            title: 'Parcela',
            dataIndex: 'parcela',
            width: 70,
        },
        {
            title: "Forma Pg.to.",
            render: (text: any, record: ContaReceber, index: number) => record.formaPagamento?.nome
        },
        {
            title: 'Dt. Vencimento',
            dataIndex: 'dataVencimento',
            width: 120,
            align: "right",
            render: (data) => formatData(data)
        },
        {
            title: 'Dt. Pagamento',
            dataIndex: 'dataPagamento',
            width: 120,
            align: "right",
            render: (data) => data ? formatData(data) : "-"
        },
        {
            title: "Vlr. Parcela",
            width: 90,
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
