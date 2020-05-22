import React from 'react'
import { UseListPagined } from '../../../../hoc/UseListPagined';
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';
import ListForm from '../../../../components/ListForm/ListForm';
import { ExcluirUnidadeMedida } from '../../../../apis/Movimentos/UnidadeMedida';

const ListUnidadeMedida: React.FC = () => {
    const response = UseListPagined({ URL: "/api/funcao-funcionarios/list" });

    const columns = [
        {
            title: 'Codigo',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Unidade de Medida',
            dataIndex: 'unidademedida',
        },

    ];

    return (
        <FormBasicLayout breadcrumbList={[{ displayName: "Unidade de Medida", URL: "/unidade-medida" }, { displayName: "Listagem", URL: undefined }]} >

        <ListForm
            tableProps={response}
            deleteFunction={ExcluirUnidadeMedida}
            columns={columns} />

    </FormBasicLayout>
    )
}

export default ListUnidadeMedida
