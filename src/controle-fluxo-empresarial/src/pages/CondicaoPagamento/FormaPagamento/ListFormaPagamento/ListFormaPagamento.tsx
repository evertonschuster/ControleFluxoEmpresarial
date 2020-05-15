import React, { } from 'react';
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';
import ListForm from '../../../../components/ListForm/ListForm';
import { UseListPagined } from '../../../../hoc/UseListPagined';
import { ExcluirFormaPagamento } from '../../../../apis/CondicaoPagamento/FormaPagamentoApi';
import { FormaPagamento } from './../../../../models/CondicaoPagamento/FormaPagamento';
import { ColumnProps } from 'antd/lib/table';

const ListFormaPagamento: React.FC = () => {

    const response = UseListPagined({ URL: "/api/forma-pagamento/list" });

    const columns: ColumnProps<FormaPagamento>[] = [
        {
            title: 'Codigo',
            dataIndex: 'id',
            key: 'id',
            width: "100px"
        },
        {
            title: 'Forma de Pagamento',
            dataIndex: 'nome',
        },
    ];



    return (
        <FormBasicLayout breadcrumbList={[{ displayName: "Forma de Pagamento", URL: "/forma-pagamento" }, { displayName: "Listagem", URL: undefined }]} >

            <ListForm
                tableProps={response}
                deleteFunction={ExcluirFormaPagamento}
                columns={columns} />

        </FormBasicLayout>
    );

}

export default ListFormaPagamento;
