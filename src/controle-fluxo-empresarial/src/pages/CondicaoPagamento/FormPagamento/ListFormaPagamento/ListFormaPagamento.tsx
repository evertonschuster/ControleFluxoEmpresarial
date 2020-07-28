import React, { } from 'react';
import { ColumnProps } from 'antd/lib/table';
import { FormaPagamento } from './../../../../models/CondicaoPagamento/FormaPagamento';
import { FormaPagamentoApi } from '../../../../apis/CondicaoPagamento/FormaPagamentoApi';
import { UseListPagined } from '../../../../hoc/UseListPagined';
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';
import ListForm from '../../../../components/ListForm/ListForm';
import ShowSituation from '../../../../components/Situation/ShowSituation/ShowSituation';

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
                desativarFunction={FormaPagamentoApi.Desativar.bind(FormaPagamentoApi)}
                columns={columns} />

        </FormBasicLayout>
    );

}

export default ListFormaPagamento;
