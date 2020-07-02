import React from 'react'
import { UseListPagined } from '../../../../hoc/UseListPagined';
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';
import ListForm from '../../../../components/ListForm/ListForm';
import { FuncaoFuncionarioApi } from '../../../../apis/Pessoas/FuncaoFuncionarioApi';
import { FuncaoFuncionario } from '../../../../models/Pessoas/FuncaoFuncionario';
import { ColumnProps } from 'antd/lib/table';
import ShowSituation from '../../../../components/Situation/ShowSituation';

const ListFuncaoFuncionario: React.FC = () => {
    const response = UseListPagined({ getListPagined: FuncaoFuncionarioApi.GetListPagined.bind(FuncaoFuncionarioApi) });

    const columns: ColumnProps<FuncaoFuncionario>[] = [
        {
            title: 'Código',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Função Funcionário',
            dataIndex: 'nome',
        },
        {
            title: 'Carga Horária',
            dataIndex: 'cargaHoraria',
        },
        {
            title: 'CNH?',
            dataIndex: 'requerCNH',
            render: (text: any, record: FuncaoFuncionario, index: number) => record.requerCNH ? "Sim" : "Não"
        },
        {
            title: 'Situação',
            dataIndex: 'situacao',
            render: ShowSituation
        },
    ];

    return (
        <FormBasicLayout breadcrumbList={[{ displayName: "Funções Funcionário", URL: "/funcao-funcionario" }, { displayName: "Listagem", URL: undefined }]} >

            <ListForm
                tableProps={response}
                deleteFunction={FuncaoFuncionarioApi.Excluir.bind(FuncaoFuncionarioApi)}
                columns={columns} />

        </FormBasicLayout>
    )
}

export default ListFuncaoFuncionario
