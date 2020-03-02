import React, { } from 'react';
import FormLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';
import ListForm from '../../../../components/ListForm/ListForm';
import { UseListPagined } from '../../../../hoc/UseListPagined';
import { CondicaoPagamento } from './../../../../models/CondicaoPagamento/CondicaoPagamento';
import { ColumnProps } from 'antd/lib/table';
import { ExcluirCondicaoPagamento } from '../../../../apis/CondicaoPagamento/CondicaoPagamento';

const ListCondicaoPagamento: React.FC = () => {

    const response = UseListPagined({ URL: "/api/condicao-pagamento/list" });

    const columns: ColumnProps<CondicaoPagamento>[] = [
        {
            title: 'Codigo',
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
        <FormLayout breadcrumbList={[{ displayName: "Condição de Pagamento", URL: "/condicao-pagamento" }, { displayName: "Listagem", URL: undefined }]} >

            <ListForm
                tableProps={response}
                deleteFunction={ExcluirCondicaoPagamento}
                columns={columns} />

        </FormLayout>
    );

}

export default ListCondicaoPagamento;
