import React, { } from 'react';
import { ColumnProps } from 'antd/lib/table';
import { ProblemaRelatado } from '../../../../models/Movimentos/ProblemaRelatado';
import { ProblemaRelatadoApi } from '../../../../apis/Movimentos/ProblemaRelatadoApi';
import { UseListPagined } from '../../../../hoc/UseListPagined';
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';
import ListForm from '../../../../components/ListForm/ListForm';
import ShowSituation from '../../../../components/Situation/ShowSituation/ShowSituation';

const ListProblemaRelatado: React.FC = () => {

    const response = UseListPagined({ getListPagined: ProblemaRelatadoApi.GetListPagined.bind(ProblemaRelatadoApi) });

    const columns: ColumnProps<ProblemaRelatado>[] = [
        {
            title: 'Código',
            dataIndex: 'id',
            key: 'id',
            width: "100px"
        },
        {
            title: 'Problema Relatado',
            dataIndex: 'nome',
        },
        {
            title: 'Situação',
            dataIndex: 'situacao',
            render: ShowSituation
        },
    ];



    return (
        <FormBasicLayout breadcrumbList={[{ displayName: "Problemas Relatados", URL: "/problemas-relatados" }, { displayName: "Listagem", URL: undefined }]} >

            <ListForm
                tableProps={response}
                deleteFunction={ProblemaRelatadoApi.Excluir.bind(ProblemaRelatadoApi)}
                desativarFunction={ProblemaRelatadoApi.Desativar.bind(ProblemaRelatadoApi)}
                columns={columns} />

        </FormBasicLayout>
    );

}

export default ListProblemaRelatado;
