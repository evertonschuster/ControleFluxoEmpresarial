import React, { useMemo } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { formatNumber2 } from '../../../../../utils/FormatNumber'
import { OrdemServicoItemServicoSchema, OrdemServicoItemProdutoSchema } from '../../OrdemServicoItemSchema'
import { OrdemServicoProduto } from '../../../../../models/OrdemServicos/OrdemServicoItem'
import { OrdemServicoServico } from './../../../../../models/OrdemServicos/OrdemServicoItem';
import { Row, Col } from 'antd'
import { WithItemNone } from '../../../../../hoc/WithFormItem'
import EditableTable, { ColumnEditableProps } from '../../../../../components/EditableTable/EditableTable'
import InputDecimal from '../../../../../components/InputDecimal/InputDecimal'
import InserirProduto from '../innerForm/InserirProduto/InserirProduto'
import InserirServico from '../innerForm/InserirServico/InserirServico'
import Separator from './../../../../../components/Separator/Separator';

const SelecaoProdutosServicos: React.FC = () => {
    const columnsProduto: ColumnProps<OrdemServicoProduto>[] = useMemo(() => [
        {
            title: 'Código',
            width: 100,
            dataIndex: 'items',
            key: 'produto-servico-codigo',
            render: (text, item: OrdemServicoProduto) => {
                return item?.produtoId
            },
        },
        {
            title: 'Produto',
            dataIndex: 'items',
            key: 'produto-servico-nome1',
            render: (text, item: OrdemServicoProduto) => {
                return item?.produto?.nome
            },
        },
        {
            align: "right",
            dataIndex: 'quantidade',
            width: 100,
            editable: true,
            key: 'quantidade',
            title: 'Quantidade',
            render: (quantidade: number) => {
                return formatNumber2(quantidade)
            },
            renderEditable: () => <InputDecimal name="quantidade" placeholder="10,00" required />
        },
        {
            align: "right",
            width: 100,
            dataIndex: 'tipo',
            key: 'valor',
            title: 'Valor',
            render: (text, item: OrdemServicoProduto) => {
                return formatNumber2(item?.valor!)
            },
        },
        {
            align: "right",
            width: 100,
            title: 'Total',
            dataIndex: 'tipo',
            key: 'total',
            render: (text, item: OrdemServicoProduto) => {
                return formatNumber2(item?.produto?.valorVenda! * item.quantidade!)
            },
        },
    ] as ColumnEditableProps<any>[], [])

    const columnsServico: ColumnProps<OrdemServicoServico>[] = useMemo(() => [
        {
            title: 'Código',
            width: 100,
            dataIndex: 'items',
            key: 'produto-servico-codigo',
            render: (text, item: OrdemServicoServico) => {
                return item?.servicoId
            },
        },
        {
            title: 'Serviço',
            dataIndex: 'items',
            key: 'produto-servico-nome1',
            render: (text, item: OrdemServicoServico) => {
                return item?.servico?.nome
            },
        },
        {
            title: 'Funcionário',
            dataIndex: 'items',
            key: 'produto-servico-nome2',
            render: (text, item: OrdemServicoServico) => {
                return item?.funcionario?.nome
            },
        },
        {
            align: "right",
            dataIndex: 'quantidade',
            width: 100,
            editable: true,
            key: 'quantidade',
            title: 'Quantidade',
            render: (quantidade: number) => {
                return formatNumber2(quantidade)
            },
            renderEditable: () => <InputDecimal name="quantidade" placeholder="10,00" required />
        },
        {
            align: "right",
            width: 100,
            dataIndex: 'tipo',
            key: 'valor',
            title: 'Valor',
            render: (text, item: OrdemServicoServico) => {
                return formatNumber2(item?.valor!)
            },
        },
        {
            align: "right",
            width: 100,
            title: 'Total',
            dataIndex: 'tipo',
            key: 'total',
            render: (text, item: OrdemServicoServico) => {
                return formatNumber2(item?.servico?.valor! * item.quantidade!)
            },
        },
    ] as ColumnEditableProps<any>[], [])

    return (
        <>
            <InserirServico />
            <Row>
                <Col>
                    <WithItemNone showLabel={false}>
                        <EditableTable
                            showNewAction={false}
                            rowKey={(item) => item.servicoId}
                            columns={columnsServico}
                            validationSchema={OrdemServicoItemServicoSchema}
                            name="servicos"
                            initiallValues={{}}
                        />
                    </WithItemNone>
                </Col>
            </Row>


            <Separator />
            <InserirProduto />
            <Row>
                <Col>
                    <WithItemNone showLabel={false}>
                        <EditableTable
                            showNewAction={false}
                            rowKey={(item) => item.produtoId}
                            columns={columnsProduto}
                            validationSchema={OrdemServicoItemProdutoSchema}
                            name="produtos"
                            initiallValues={{}}
                        />
                    </WithItemNone>
                </Col>
            </Row>
        </>
    )
}

export default SelecaoProdutosServicos
