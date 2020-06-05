import React from 'react'
import { ExcluirServico } from '../../../../apis/Movimentos/ServicoApi';
import ListForm from '../../../../components/ListForm/ListForm';
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';
import { UseListPagined } from '../../../../hoc/UseListPagined';

const ListServico: React.FC = () => {
    const response = UseListPagined({ URL: "/api/servicos/list" });

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
                deleteFunction={ExcluirServico}
                columns={columns} />

        </FormBasicLayout>
    )
}

export default ListServico;