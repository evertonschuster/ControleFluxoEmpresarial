import React from 'react'
import { ContaPagarApi } from '../../../../apis/Movimentos/ContaPagarApi';
import { UseListPagined } from '../../../../hoc/UseListPagined';
import { ColumnProps } from 'antd/lib/table';
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';
import ListForm from '../../../../components/ListForm/ListForm';
import ContaPagar from '../../../../models/Movimentos/ContaPagar';
import { formatData } from '../../../../utils/FormatNumber';
import ShowSituation from './components/ShowSituation';
import { Fornecedor } from './../../../../models/Pessoas/Fornecedor';
import RecordAction from './components/RecordAction';
import { formatNumber2 } from './../../../../utils/FormatNumber';

const ListContaPagar: React.FC = () => {
    const response = UseListPagined({ getListPagined: ContaPagarApi.GetListPagined.bind(ContaPagarApi) });

    const columns: ColumnProps<ContaPagar>[] = [
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
            title: 'Fornecedor',
            dataIndex: 'fornecedor',
            render: (item: Fornecedor) => item.nome
        },
        {
            title: 'Parcela',
            dataIndex: 'parcela',
            width: 70,
        },
        {
            title: "Forma Pg.to.",
            render: (text: any, record: ContaPagar, index: number) => record.formaPagamento?.nome
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
                hiddenAction
                keyProp={"dataCriacao"}
                tableProps={response}
                columns={columns} />
        </FormBasicLayout>
    )
}

export default ListContaPagar
