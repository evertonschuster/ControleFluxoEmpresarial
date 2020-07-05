import React, { useMemo } from 'react';
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';
import { RouteComponentProps } from 'react-router-dom';
import ListForm from '../../../../components/ListForm/ListForm';
import { UseListPagined } from '../../../../hoc/UseListPagined';
import { CidadeApi } from '../../../../apis/Cidades/CidadeApi';
import ShowSituation from '../../../../components/Situation/ShowSituation/ShowSituation';

const ListCidade: React.FC<RouteComponentProps> = () => {

    const response = UseListPagined({ getListPagined: CidadeApi.GetListPagined.bind(CidadeApi) });

    const columns = useMemo(() => [
        {
            title: 'Código',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Cidade',
            dataIndex: 'nome',
        },
        {
            title: 'DDD',
            dataIndex: 'ddd',
        },
        {
            title: 'Estado',
            dataIndex: 'estado.nome',
        },
        {
            title: 'Situação',
            dataIndex: 'situacao',
            render: ShowSituation
        },
    ], []);



    return (
        <FormBasicLayout breadcrumbList={[{ displayName: "Cidade", URL: "/cidade" }, { displayName: "Listagem", URL: undefined }]} >

            <ListForm
                tableProps={response}
                desativarFunction={CidadeApi.Desativar.bind(CidadeApi)}
                deleteFunction={CidadeApi.Excluir.bind(CidadeApi)}
                columns={columns} />

        </FormBasicLayout>
    );

}

export default ListCidade;
