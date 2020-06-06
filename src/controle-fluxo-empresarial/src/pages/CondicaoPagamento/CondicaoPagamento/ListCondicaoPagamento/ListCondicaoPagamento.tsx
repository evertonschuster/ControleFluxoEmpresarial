import React, { } from 'react';
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';
import ListForm from '../../../../components/ListForm/ListForm';
import { UseListPagined } from '../../../../hoc/UseListPagined';
import { CondicaoPagamento } from './../../../../models/CondicaoPagamento/CondicaoPagamento';
import { ColumnProps } from 'antd/lib/table';
import { CondicaoPagamentoApi } from '../../../../apis/CondicaoPagamento/CondicaoPagamentoApi';

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
    ];



    return (
        <FormBasicLayout breadcrumbList={[{ displayName: "Condições de Pagamento", URL: "/condicao-pagamento" }, { displayName: "Listagem", URL: undefined }]} >

            <ListForm
                tableProps={response}
                deleteFunction={CondicaoPagamentoApi.Excluir.bind(CondicaoPagamentoApi)}
                columns={columns} />

        </FormBasicLayout>
    );

}

export default ListCondicaoPagamento;
