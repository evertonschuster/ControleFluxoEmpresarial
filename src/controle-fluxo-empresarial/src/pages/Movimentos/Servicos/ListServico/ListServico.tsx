import React from 'react'
import ListForm from '../../../../components/ListForm/ListForm';
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';
import { UseListPagined } from '../../../../hoc/UseListPagined';
import { ServicoApi } from '../../../../apis/Movimentos/ServicoApi';
import { Servico } from './../../../../models/Movimentos/Servico';
import { ColumnProps } from 'antd/lib/table';
import ShowSituation from '../../../../components/Situation/ShowSituation/ShowSituation';

const ListServico: React.FC = () => {
    const response = UseListPagined({ getListPagined: ServicoApi.GetListPagined.bind(ServicoApi) });

    const columns:ColumnProps<Servico>[] = [
        {
            title: 'Código',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Serviço',
            dataIndex: 'nome',
        },
        {
            title: 'Categoria',
            dataIndex: 'categoria.nome',
        },
        {
            title: 'Valor',
            dataIndex: 'valor',
            render:(text: any, record: Servico, index: number) =>{
                let format = Intl.NumberFormat(undefined, {
                    minimumFractionDigits: 2
                });

                return format.format(record.valor ?? 0)
            }
        },
        {
            title: 'Situação',
            dataIndex: 'situacao',
            render: ShowSituation
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