import React, { useContext } from 'react'
import { ContaPagarApi } from '../../../../apis/Movimentos/ContaPagarApi';
import { UseListPagined } from '../../../../hoc/UseListPagined';
import { ColumnProps } from 'antd/lib/table';
import FormBasicLayout from '../../../../layouts/FormBasicLayout/FormBasicLayout';
import ListForm from '../../../../components/ListForm/ListForm';
import ContaPagar from '../../../../models/Movimentos/ContaPagar';
import { formatData } from '../../../../utils/FormatNumber';
import { Link } from 'react-router-dom';
import BasicLayoutContext, { FormMode } from '../../../../layouts/BasicLayout/BasicLayoutContext';
import { Tooltip, Tag } from 'antd';
import ShowSituation from './components/ShowSituation';
import { Fornecedor } from './../../../../models/Pessoas/Fornecedor';

const ListContaPagar: React.FC = () => {
    const response = UseListPagined({ getListPagined: ContaPagarApi.GetListPagined.bind(ContaPagarApi) });
    const { setFormMode } = useContext(BasicLayoutContext);

    const columns: ColumnProps<ContaPagar>[] = [
        {
            title: 'Modelo',
            dataIndex: 'modelo',
            width: 80,
        },
        {
            title: 'Série',
            dataIndex: 'serie',
            width: 80,
        },
        {
            title: 'Número',
            dataIndex: 'numero',
            width: 100,
        },
        {
            title: 'Fornecedor',
            dataIndex: 'fornecedor',
            render: (item: Fornecedor) => item.nome
        },
        {
            title: 'Parcela',
            dataIndex: 'parcela',
            width: 80,
        },
        {
            title: 'Data Vencimento',
            dataIndex: 'dataVencimento',
            render: (data) => formatData(data)
        },
        {
            title: 'Data Pagamento',
            dataIndex: 'dataPagamento',
            render: (data) => data ? formatData(data) : "-"
        },
        {
            title: 'Situação',
            dataIndex: 'dataCancelamento',
            render: ShowSituation
        },
        {
            title: 'Ações',
            key: 'action',
            width: "150px",
            render: (text: any, record: ContaPagar, index: number) => (
                <>
                    {!record.dataCancelamento &&
                        <>
                            <Link to={(`contas-pagar/edit/${record.modelo}/${record.serie}/${record.numero}/${record.fornecedorId}/${record.parcela}`)}
                                onClick={() => { setFormMode(FormMode.Edit); }}>
                                <Tooltip placement="top" title="Editar Registro Selecionado."  >
                                    <Tag color="green" key={index + "12"} className="custom-cursor-pointer" >Editar</Tag>
                                </Tooltip>
                            </Link>
                            <Link to={(`contas-pagar/cancel/${record.modelo}/${record.serie}/${record.numero}/${record.fornecedorId}/${record.parcela}`)}
                                onClick={() => { setFormMode(FormMode.CancelarEntity); }}>
                                <Tooltip placement="top" title="Excluir Registro Selecionado." >
                                    <Tag color="red" key={index + "23"} className="custom-cursor-pointer" >Cancelar</Tag>
                                </Tooltip>
                            </Link>
                        </>}
                    {record.dataCancelamento && <Link to={(`contas-pagar/view/${record.modelo}/${record.serie}/${record.numero}/${record.fornecedorId}/${record.parcela}`)}
                        onClick={() => { setFormMode(FormMode.View); }}>
                        <Tooltip placement="top" title="Visualiza Registro Selecionado." >
                            <Tag color="gold" key={index + "23"} className="custom-cursor-pointer" >Ver</Tag>
                        </Tooltip>
                    </Link>
                    }
                </>
            ),
        }
    ];

    return (
        <FormBasicLayout breadcrumbList={[{ displayName: "Contas a Pagar", URL: "/conta-pagar" }, { displayName: "Listagem", URL: undefined }]} >

            <ListForm
                hiddenAction
                keyProp={"dataCriacao"}
                tableProps={response}
                columns={columns} />

        </FormBasicLayout>
    )
}

export default ListContaPagar
