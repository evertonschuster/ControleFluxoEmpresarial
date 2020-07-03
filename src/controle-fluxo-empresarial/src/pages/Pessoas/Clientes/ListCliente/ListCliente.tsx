import React from 'react'
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout'
import ListForm from '../../../../components/ListForm/ListForm'
import { UseListPagined } from '../../../../hoc/UseListPagined';
import { ClienteApi } from '../../../../apis/Pessoas/ClienteApi';
import { ColumnProps } from 'antd/lib/table';
import { Cliente } from '../../../../models/Pessoas/Cliente';
import ShowSituation from '../../../../components/Situation/ShowSituation/ShowSituation';

const ListCliente: React.FC = () => {

    const response = UseListPagined({ getListPagined: ClienteApi.GetListPagined.bind(ClienteApi) });

    const columns: ColumnProps<Cliente>[] = [
        {
            title: 'Código',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Cliente',
            dataIndex: 'nome',
        },
        {
            title: 'Apelido/Nome Fantasia',
            dataIndex: 'apelido',
        },
        {
            title: 'CPF/CNPJ',
            dataIndex: 'cpfcpnj',
            render: (text: any, record: Cliente, index: number) => {
                if (record.isBrasileiro) {
                    return text;
                }

                return text + " (estrangeiro)";
            }
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
        <FormBasicLayout breadcrumbList={[{ displayName: "Clientes", URL: "/cliente" }, { displayName: "Listagem", URL: undefined }]} >

            <ListForm
                tableProps={response}
                deleteFunction={ClienteApi.Excluir.bind(ClienteApi)}
                columns={columns} />

        </FormBasicLayout>
    )
}

export default ListCliente

