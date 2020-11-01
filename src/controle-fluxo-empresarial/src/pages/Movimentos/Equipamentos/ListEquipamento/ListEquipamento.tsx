import React, { } from 'react';
import { ColumnProps } from 'antd/lib/table';
import { Equipamento } from '../../../../models/Movimentos/Equipamento';
import { EquipamentoApi } from '../../../../apis/Movimentos/EquipamentoApi';
import { UseListPagined } from '../../../../hoc/UseListPagined';
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';
import ListForm from '../../../../components/ListForm/ListForm';
import ShowSituation from '../../../../components/Situation/ShowSituation/ShowSituation';

const ListEquipamento: React.FC = () => {

    const response = UseListPagined({ getListPagined: EquipamentoApi.GetListPagined.bind(EquipamentoApi) });

    const columns: ColumnProps<Equipamento>[] = [
        {
            title: 'Código',
            dataIndex: 'id',
            key: 'id',
            width: "100px"
        },
        {
            title: 'Equipamento',
            dataIndex: 'nome',
        },
        {
            title: 'Situação',
            dataIndex: 'situacao',
            render: ShowSituation
        },
    ];



    return (
        <FormBasicLayout breadcrumbList={[{ displayName: "Equipamentos", URL: "/equipamentos" }, { displayName: "Listagem", URL: undefined }]} >

            <ListForm
                tableProps={response}
                deleteFunction={EquipamentoApi.Excluir.bind(EquipamentoApi)}
                desativarFunction={EquipamentoApi.Desativar.bind(EquipamentoApi)}
                columns={columns} />

        </FormBasicLayout>
    );

}

export default ListEquipamento;
