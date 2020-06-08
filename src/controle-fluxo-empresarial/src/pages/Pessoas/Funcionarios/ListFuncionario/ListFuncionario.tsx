import React from 'react'
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout'
import { UseListPagined } from '../../../../hoc/UseListPagined';
import ListForm from '../../../../components/ListForm/ListForm';
import { FuncionarioApi } from '../../../../apis/Pessoas/FuncionarioApi';

const ListFuncionario: React.FC = () => {

    const response = UseListPagined({ getListPagined: FuncionarioApi.GetListPagined.bind(FuncionarioApi) });

    const columns = [
        {
            title: 'Código',
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
        <FormBasicLayout breadcrumbList={[{ displayName: "Funcionários", URL: "/funcionario" }, { displayName: "Listagem", URL: undefined }]} >

            <ListForm
                tableProps={response}
                deleteFunction={FuncionarioApi.Excluir.bind(FuncionarioApi)}
                columns={columns} />

        </FormBasicLayout>
    )
}

export default ListFuncionario;