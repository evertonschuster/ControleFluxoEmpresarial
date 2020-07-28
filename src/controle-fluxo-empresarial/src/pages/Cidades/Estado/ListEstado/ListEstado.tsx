import React, { useMemo } from 'react';
import { EstadoApi } from '../../../../apis/Cidades/EstadoApi';
import { RouteComponentProps } from 'react-router-dom';
import { UseListPagined } from '../../../../hoc/UseListPagined';
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';
import ListForm from '../../../../components/ListForm/ListForm';
import ShowSituation from '../../../../components/Situation/ShowSituation/ShowSituation';

const ListEstado: React.FC<RouteComponentProps> = () => {

    const response = UseListPagined({ getListPagined: EstadoApi.GetListPagined.bind(EstadoApi)});

    const columns = useMemo(() => [
        {
            title: 'Código',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Estado',
            dataIndex: 'nome',
        },
        {
            title: 'UF',
            dataIndex: 'uf',
        },
        {
            title: 'Pais',
            dataIndex: 'pais.nome',
        },
        {
            title: 'Situação',
            dataIndex: 'situacao',
            render: ShowSituation
        },
    ], []);

    return (
        <FormBasicLayout breadcrumbList={[{ displayName: "Estado", URL: "/Estado" }, { displayName: "Listagem", URL: undefined }]} >


            <ListForm
                tableProps={response}
                desativarFunction={EstadoApi.Desativar.bind(EstadoApi)}
                deleteFunction={EstadoApi.Excluir.bind(EstadoApi)}
                columns={columns} />


        </FormBasicLayout>
    );

}

export default ListEstado;
