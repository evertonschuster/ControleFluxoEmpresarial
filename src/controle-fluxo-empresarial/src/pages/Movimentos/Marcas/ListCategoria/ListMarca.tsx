import React, { } from 'react';
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';
import ListForm from '../../../../components/ListForm/ListForm';
import { UseListPagined } from '../../../../hoc/UseListPagined';
import { ColumnProps } from 'antd/lib/table';
import { Marca } from '../../../../models/Movimentos/Marca';
import { ExcluirMarca } from '../../../../apis/Movimentos/MarcaApi';

const ListMarca: React.FC = () => {

    const response = UseListPagined({ URL: "/api/marcas/list" });

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
    ];



    return (
        <FormBasicLayout breadcrumbList={[{ displayName: "Marca", URL: "/marca" }, { displayName: "Listagem", URL: undefined }]} >

            <ListForm
                tableProps={response}
                deleteFunction={ExcluirMarca}
                columns={columns} />

        </FormBasicLayout>
    );

}

export default ListMarca;
