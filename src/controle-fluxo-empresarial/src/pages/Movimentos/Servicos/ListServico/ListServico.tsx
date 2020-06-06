import React from 'react'
import ListForm from '../../../../components/ListForm/ListForm';
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';
import { UseListPagined } from '../../../../hoc/UseListPagined';
import { ServicoApi } from '../../../../apis/Movimentos/ServicoApi';

const ListServico: React.FC = () => {
    const response = UseListPagined({ getListPagined: ServicoApi.GetListPagined.bind(ServicoApi) });

    const columns = [
        {
            title: 'Código',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Servico',
            dataIndex: 'nome',
        },
        {
            title: 'Valor',
            dataIndex: 'valor',
        },
    ];

    return (
        <FormBasicLayout breadcrumbList={[{ displayName: "Serviços", URL: "/servico" }, { displayName: "Listagem" }]} >

            <ListForm
                tableProps={response}
                deleteFunction={ServicoApi.Excluir.bind(ServicoApi)}
                columns={columns} />

        </FormBasicLayout>
    )
}

export default ListServico;