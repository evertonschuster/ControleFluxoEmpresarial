import React, { useMemo } from 'react'
import FormBasicLayout from '../../../layouts/FormBasicLayout/FormBasicLayout'
import ListForm from '../../../components/ListForm/ListForm'
import { OrdemServicoApi } from '../../../apis/OrdemServicos/OrdemServico'
import { UseListPagined } from '../../../hoc/UseListPagined'
import ShowSituation from '../../../components/Situation/ShowSituation/ShowSituation'

const ListOrdemServico: React.FC = () => {
    const response = UseListPagined({ getListPagined: OrdemServicoApi.GetListPagined.bind(OrdemServicoApi) });

    const columns = useMemo(() => [
        {
            title: 'Código',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Situação',
            dataIndex: 'situacao',
            render: ShowSituation
        },
    ], []);

    
    return (
        <FormBasicLayout breadcrumbList={[{ displayName: "OrdemServico", URL: "/OrdemServico" }, { displayName: "Listagem", URL: undefined }]} >

        <ListForm
            tableProps={response}
            columns={columns} />

    </FormBasicLayout>
    )
}

export default ListOrdemServico
