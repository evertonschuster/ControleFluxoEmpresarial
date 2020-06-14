import React from 'react'
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout'
import { UseListPagined } from '../../../../hoc/UseListPagined';
import ListForm from '../../../../components/ListForm/ListForm';
import { FornecedorApi } from '../../../../apis/Pessoas/Fornecedor.Api';
import { Fornecedor } from '../../../../models/Pessoas/Fornecedor';
import { ColumnProps } from 'antd/lib/table';

const ListFornecedor: React.FC = () => {

    const response = UseListPagined({ getListPagined: FornecedorApi.GetListPagined.bind(FornecedorApi) });

    const columns: ColumnProps<Fornecedor>[] = [
        {
            title: 'Código',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Fornecedor',
            dataIndex: 'nome',
        },
        {
            title: 'Nome Fantasia/Apelido',
            dataIndex: 'bairro',
        },
        {
            title: 'Crédito',
            dataIndex: 'limiteCredito',
            render: (text: any, record: Fornecedor, index: number) => {
                var nf = Intl.NumberFormat(undefined, {
                    minimumFractionDigits: 2,
                });
                return nf.format(record.limiteCredito ?? 0)
            }
        },
        {
            title: 'Telefone',
            dataIndex: 'telefone',
        },
    ];

    return (
        <FormBasicLayout breadcrumbList={[{ displayName: "Fornecedores", URL: "/fornecedor" }, { displayName: "Listagem", URL: undefined }]} >

            <ListForm
                tableProps={response}
                deleteFunction={FornecedorApi.Excluir.bind(FornecedorApi)}
                columns={columns} />

        </FormBasicLayout>
    )
}

export default ListFornecedor;