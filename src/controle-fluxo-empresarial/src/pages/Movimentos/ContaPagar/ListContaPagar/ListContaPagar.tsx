import React from 'react'
import { ContaPagarApi } from '../../../../apis/Movimentos/ContasPagar/ContaPagarApi';
import { UseListPagined } from '../../../../hoc/UseListPagined';
import { ColumnProps } from 'antd/lib/table';
import ShowSituation from '../../../../components/Situation/ShowSituation/ShowSituation';
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';
import ListForm from '../../../../components/ListForm/ListForm';
import ContaPagar from '../../../../models/Movimentos/ContaPagar';

const ListContaPagar: React.FC = () => {

    const response = UseListPagined({ getListPagined: ContaPagarApi.GetListPagined.bind(ContaPagarApi) });

    const columns: ColumnProps<ContaPagar>[] = [
        {
            title: 'Modelo',
            dataIndex: 'modelo',
        },
        {
            title: 'Série',
            dataIndex: 'serie',
        },
        {
            title: 'Número',
            dataIndex: 'numero',
        },
        {
            title: 'Fornecedor',
            dataIndex: 'fornecedor',
        },
        {
            title: 'Parcela',
            dataIndex: 'parcela',
        },
        {
            title: 'Data Vencimento',
            dataIndex: 'dataVencimento',
        },
        {
            title: 'Data Pagamento',
            dataIndex: 'dataPagamento',
        },
        {
            title: 'Situação',
            dataIndex: 'situacao',
            render: ShowSituation
        },
    ];

    return (
        <FormBasicLayout breadcrumbList={[{ displayName: "Contas a Pagar", URL: "/conta-pagar" }, { displayName: "Listagem", URL: undefined }]} >

        <ListForm
            tableProps={response}
            // desativarFunction={ClienteApi.Desativar.bind(ClienteApi)}
            // deleteFunction={ClienteApi.Excluir.bind(ClienteApi)}
            columns={columns} />

    </FormBasicLayout>
    )
}

export default ListContaPagar
