import React, { } from 'react';
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';
import ListForm from '../../../../components/ListForm/ListForm';
import { UseListPagined } from '../../../../hoc/UseListPagined';
import { ColumnProps } from 'antd/lib/table';
import { Categoria } from '../../../../models/Movimentos/Categoria';
import { CategoriaApi } from '../../../../apis/Movimentos/CategoriaApi';
import ShowSituation from '../../../../components/Situation/ShowSituation/ShowSituation';

const ListCategoria: React.FC = () => {

    const response = UseListPagined({ getListPagined: CategoriaApi.GetListPagined.bind(CategoriaApi) });

    const columns: ColumnProps<Categoria>[] = [
        {
            title: 'Código',
            dataIndex: 'id',
            key: 'id',
            width: "100px"
        },
        {
            title: 'Categoria',
            dataIndex: 'nome',
        },
        {
            title: 'Situação',
            dataIndex: 'situacao',
            render: ShowSituation
        },
    ];



    return (
        <FormBasicLayout breadcrumbList={[{ displayName: "Categorias", URL: "/categoria" }, { displayName: "Listagem", URL: undefined }]} >

            <ListForm
                tableProps={response}
                deleteFunction={CategoriaApi.Excluir.bind(CategoriaApi)}
                desativarFunction={CategoriaApi.Desativar.bind(CategoriaApi)}
                columns={columns} />

        </FormBasicLayout>
    );

}

export default ListCategoria;
