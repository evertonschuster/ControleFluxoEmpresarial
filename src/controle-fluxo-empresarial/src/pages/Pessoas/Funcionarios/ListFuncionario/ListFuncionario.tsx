import React from 'react'
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout'
import { UseListPagined } from '../../../../hoc/UseListPagined';
import ListForm from '../../../../components/ListForm/ListForm';
import { ExcluirFuncionario } from '../../../../apis/Pessoas/FuncionarioApi';

export const ListFuncionario: React.FC = () => {
    
    const response = UseListPagined({ URL: "/api/funcionarios/list" });

    const columns = [
        {
            title: 'Codigo',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Funcionário',
            dataIndex: 'funcionario',
        },
        {
            title: 'Cargo',
            dataIndex: 'cargo',
        },
        {
            title: 'Telefone',
            dataIndex: 'telefone',
        },
    ];

    return (
        <FormBasicLayout breadcrumbList={[{ displayName: "Funcionarios", URL: "/funcionario" }, { displayName: "Listagem", URL: undefined }]} >

        <ListForm
            tableProps={response}
            deleteFunction={ExcluirFuncionario}
            columns={columns} />

    </FormBasicLayout>
    )
}
