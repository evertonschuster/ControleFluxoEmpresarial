import React from 'react'
import { UnidadeMedidaApi } from '../../../../apis/Movimentos/UnidadeMedidaApi';
import { UseListPagined } from '../../../../hoc/UseListPagined';
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';
import ListForm from '../../../../components/ListForm/ListForm';
import ShowSituation from '../../../../components/Situation/ShowSituation/ShowSituation';

const ListUnidadeMedida: React.FC = () => {
    const response = UseListPagined({ getListPagined: UnidadeMedidaApi.GetListPagined.bind(UnidadeMedidaApi)});

    const columns = [
        {
            title: 'Código',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Unidade de Medida',
            dataIndex: 'nome',
        },
        {
            title: 'Situação',
            dataIndex: 'situacao',
            render: ShowSituation
        },
    ];

    return (
        <FormBasicLayout breadcrumbList={[{ displayName: "Unidades de Medida", URL: "/unidade-medida" }, { displayName: "Listagem", URL: undefined }]} >

        <ListForm
            tableProps={response}
            deleteFunction={UnidadeMedidaApi.Excluir.bind(UnidadeMedidaApi)}
            desativarFunction={UnidadeMedidaApi.Desativar.bind(UnidadeMedidaApi)}
            columns={columns} />

    </FormBasicLayout>
    )
}

export default ListUnidadeMedida
