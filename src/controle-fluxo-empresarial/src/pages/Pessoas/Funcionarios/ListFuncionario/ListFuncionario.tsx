import React from 'react'
import { FuncionarioApi } from '../../../../apis/Pessoas/FuncionarioApi';
import { UseListPagined } from '../../../../hoc/UseListPagined';
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout'
import ListForm from '../../../../components/ListForm/ListForm';
import ShowSituation from '../../../../components/Situation/ShowSituation/ShowSituation';

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
            dataIndex: 'nome',
        },
        {
            title: 'Cargo',
            dataIndex: 'funcaoFuncionario.nome',
        },
        {
            title: 'Carga Horária',
            dataIndex: 'funcaoFuncionario.cargaHoraria',
        },
        {
            title: 'Telefone',
            dataIndex: 'telefone',
        },
        {
            title: 'Situação',
            dataIndex: 'situacao',
            render: ShowSituation
        },
    ];

    return (
        <FormBasicLayout breadcrumbList={[{ displayName: "Funcionários", URL: "/funcionario" }, { displayName: "Listagem", URL: undefined }]} >

            <ListForm
                tableProps={response}
                deleteFunction={FuncionarioApi.Excluir.bind(FuncionarioApi)}
                desativarFunction={FuncionarioApi.Desativar.bind(FuncionarioApi)}
                columns={columns} />

        </FormBasicLayout>
    )
}

export default ListFuncionario;