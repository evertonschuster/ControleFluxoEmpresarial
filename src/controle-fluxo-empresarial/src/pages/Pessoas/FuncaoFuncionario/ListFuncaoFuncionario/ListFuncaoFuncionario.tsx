import React from 'react'
import { UseListPagined } from '../../../../hoc/UseListPagined';
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';
import ListForm from '../../../../components/ListForm/ListForm';
import { ExcluirFuncaoFuncionario } from '../../../../apis/Pessoas/FuncaoFuncionarioApi';

const ListFuncaoFuncionario: React.FC = () => {
    const response = UseListPagined({ URL: "/api/funcao-funcionarios/list" });

    const columns = [
        {
            title: 'Código',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Funcionário',
            dataIndex: 'funcaofuncionario',
        },
        {
            title: 'CNH?',
            dataIndex: 'requerCNH',
        },
    ];

    return (
        <FormBasicLayout breadcrumbList={[{ displayName: "Função Funcionarios", URL: "/funcao-funcionario" }, { displayName: "Listagem", URL: undefined }]} >

        <ListForm
            tableProps={response}
            deleteFunction={ExcluirFuncaoFuncionario}
            columns={columns} />

    </FormBasicLayout>
    )
}

export default ListFuncaoFuncionario
