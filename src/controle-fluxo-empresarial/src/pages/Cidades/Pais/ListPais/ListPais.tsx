import React, {  } from 'react';
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import ListForm from '../../../../components/ListForm/ListForm';
import { UseListPagined } from '../../../../hoc/UseListPagined';
import { ExcluirPais } from '../../../../apis/Cidades/PaisApi';

const ListPais: React.FC<RouteComponentProps> = () => {

    const response = UseListPagined({ URL: "/api/pais/list" });

    const columns = [
        {
            title: 'Codigo',
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
    ];



    return (
        <FormBasicLayout breadcrumbList={[{ displayName: "Pais", URL: "/pais" }, { displayName: "Listagem", URL: undefined }]} >

            <ListForm
                tableProps={response}
                deleteFunction={ExcluirPais}
                columns={columns} />

        </FormBasicLayout>
    );

}

export default withRouter(ListPais);
