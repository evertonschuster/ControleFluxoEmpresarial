import React, { } from 'react';
import { ColumnProps } from 'antd/lib/table';
import { CondicaoPagamento } from './../../../../models/CondicaoPagamento/CondicaoPagamento';
import { CondicaoPagamentoApi } from '../../../../apis/CondicaoPagamento/CondicaoPagamentoApi';
import { UseListPagined } from '../../../../hoc/UseListPagined';
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';
import ListForm from '../../../../components/ListForm/ListForm';
import ShowSituation from '../../../../components/Situation/ShowSituation/ShowSituation';

const ListCondicaoPagamento: React.FC = () => {

    const response = UseListPagined({ getListPagined: CondicaoPagamentoApi.GetListPagined.bind(CondicaoPagamentoApi) });

    const columns: ColumnProps<CondicaoPagamento>[] = [
        {
            title: 'Código',
            dataIndex: 'id',
            key: 'id',
            width: "100px"
        },
        {
            title: 'Condição de Pagamento',
            dataIndex: 'nome',
        },
        {
            title: 'Situação',
            dataIndex: 'situacao',
            render: ShowSituation
        },
    ];



    return (
        <FormBasicLayout breadcrumbList={[{ displayName: "Condições de Pagamento", URL: "/condicao-pagamento" }, { displayName: "Listagem", URL: undefined }]} >

            <ListForm
                tableProps={response}
                desativarFunction={CondicaoPagamentoApi.Desativar.bind(CondicaoPagamentoApi)}
                deleteFunction={CondicaoPagamentoApi.Excluir.bind(CondicaoPagamentoApi)}
                columns={columns} />

        </FormBasicLayout>
    );

}

export default ListCondicaoPagamento;
