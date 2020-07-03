import React, { } from 'react';
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';
import ListForm from '../../../../components/ListForm/ListForm';
import { UseListPagined } from '../../../../hoc/UseListPagined';
import { ColumnProps } from 'antd/lib/table';
import { Marca } from '../../../../models/Movimentos/Marca';
import { MarcaApi } from '../../../../apis/Movimentos/MarcaApi';
import ShowSituation from '../../../../components/Situation/ShowSituation/ShowSituation';

const ListMarca: React.FC = () => {

    const response = UseListPagined({ getListPagined: MarcaApi.GetListPagined.bind(MarcaApi) });

    const columns: ColumnProps<Marca>[] = [
        {
            title: 'Código',
            dataIndex: 'id',
            key: 'id',
            width: "100px"
        },
        {
            title: 'Marca',
            dataIndex: 'nome',
        },
        {
            title: 'Situação',
            dataIndex: 'situacao',
            render: ShowSituation
        },
    ];



    return (
        <FormBasicLayout breadcrumbList={[{ displayName: "Marcas", URL: "/marca" }, { displayName: "Listagem", URL: undefined }]} >

            <ListForm
                tableProps={response}
                deleteFunction={MarcaApi.Excluir.bind(MarcaApi)}
                columns={columns} />

        </FormBasicLayout>
    );

}

export default ListMarca;
