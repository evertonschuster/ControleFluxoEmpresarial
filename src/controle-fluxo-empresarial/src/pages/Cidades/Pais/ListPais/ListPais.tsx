import React, { useMemo } from 'react';
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import ListForm from '../../../../components/ListForm/ListForm';
import { UseListPagined } from '../../../../hoc/UseListPagined';
import { PaisApi } from '../../../../apis/Cidades/PaisApi';
import { ColumnProps } from 'antd/lib/table';
import { Pais } from '../../../../models/Cidades/Pais';
import ShowSituation from '../../../../components/Situation/ShowSituation/ShowSituation';

const ListPais: React.FC<RouteComponentProps> = () => {

    const response = UseListPagined({ getListPagined: PaisApi.GetListPagined.bind(PaisApi) });

    const columns: ColumnProps<Pais>[] = useMemo(() => [
        {
            title: 'Código',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Pais',
            dataIndex: 'nome',
            // key: 'pais',
        },
        {
            title: 'Sigla',
            dataIndex: 'sigla',
            // key: 'sigla',
        },
        {
            title: 'Situação',
            dataIndex: 'situacao',
            render: ShowSituation
        },
    ] as ColumnProps<Pais>[], []);

    return (
        <FormBasicLayout breadcrumbList={[{ displayName: "Pais", URL: "/pais" }, { displayName: "Listagem", URL: undefined }]} >

            <ListForm
                tableProps={response}
                desativarFunction={PaisApi.Desativar.bind(PaisApi)}
                deleteFunction={PaisApi.Excluir.bind(PaisApi)}
                columns={columns} />

        </FormBasicLayout>
    );

}

export default withRouter(ListPais);
