import React, { } from 'react';
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';
import ListForm from '../../../../components/ListForm/ListForm';
import { UseListPagined } from '../../../../hoc/UseListPagined';
import { FormaPagamento } from './../../../../models/CondicaoPagamento/FormaPagamento';
import { ColumnProps } from 'antd/lib/table';
import { FormaPagamentoApi } from '../../../../apis/CondicaoPagamento/FormaPagamentoApi';
import ShowSituation from '../../../../components/Situation/ShowSituation';

const ListFormaPagamento: React.FC = () => {

    const response = UseListPagined({ getListPagined: FormaPagamentoApi.GetListPagined.bind(FormaPagamentoApi) });

    const columns: ColumnProps<FormaPagamento>[] = [
        {
            title: 'Código',
            dataIndex: 'id',
            key: 'id',
            width: "100px"
        },
        {
            title: 'Forma de Pagamento',
            dataIndex: 'nome',
        },
        {
            title: 'Situação',
            dataIndex: 'situacao',
            render: ShowSituation
        },
    ];



    return (
        <FormBasicLayout breadcrumbList={[{ displayName: "Formas de Pagamento", URL: "/forma-pagamento" }, { displayName: "Listagem", URL: undefined }]} >

            <ListForm
                tableProps={response}
                deleteFunction={FormaPagamentoApi.Excluir.bind(FormaPagamentoApi)}
                columns={columns} />

        </FormBasicLayout>
    );

}

export default ListFormaPagamento;
