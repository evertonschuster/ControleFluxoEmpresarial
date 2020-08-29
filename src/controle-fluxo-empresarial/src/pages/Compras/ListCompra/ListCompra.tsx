import React from 'react'
import ShowSituation from '../../../components/Situation/ShowSituation/ShowSituation';
import { CompraApi } from '../../../apis/Compras/CompraApi';
import { UseListPagined } from '../../../hoc/UseListPagined';
import { Compra } from '../../../models/Compras/Compra';
import { ColumnProps } from 'antd/lib/table';
import FormBasicLayout from '../../../layouts/FormBasicLayout/FormBasicLayout';
import ListForm from '../../../components/ListForm/ListForm';

const ListCompra: React.FC = () => {
    const response = UseListPagined({ getListPagined: CompraApi.GetListPagined.bind(CompraApi) });

    const columns: ColumnProps<Compra>[] = [
        {
            title: 'Código',
            dataIndex: 'id',
            key: 'id',
            width: "100px"
        },
        {
            title: 'Situação',
            dataIndex: 'situacao',
            render: ShowSituation
        },
    ];

    return (
        <FormBasicLayout breadcrumbList={[{ displayName: "Compras", URL: "/compras" }, { displayName: "Listagem", URL: undefined }]} >

            <ListForm
                tableProps={response}
                columns={columns} />

        </FormBasicLayout>
    );
}

export default ListCompra
