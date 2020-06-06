import React, { useMemo } from 'react';
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import ListForm from '../../../../components/ListForm/ListForm';
import { UseListPagined } from '../../../../hoc/UseListPagined';
import { PaisApi } from '../../../../apis/Cidades/PaisApi';

const ListPais: React.FC<RouteComponentProps> = () => {

    const response = UseListPagined({ getListPagined: PaisApi.GetListPagined.bind(PaisApi) });

    const columns = useMemo(() => [
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
    ], []);

    return (
        <FormBasicLayout breadcrumbList={[{ displayName: "Pais", URL: "/pais" }, { displayName: "Listagem", URL: undefined }]} >

            <ListForm
                tableProps={response}
                deleteFunction={PaisApi.Excluir.bind(PaisApi)}
                columns={columns} />

        </FormBasicLayout>
    );

}

export default withRouter(ListPais);
