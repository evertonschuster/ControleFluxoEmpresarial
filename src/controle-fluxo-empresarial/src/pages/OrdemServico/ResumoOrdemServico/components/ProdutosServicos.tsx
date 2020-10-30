import React, { useMemo } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { formatNumber2 } from '../../../../utils/FormatNumber'
import { OrdemServicoProduto, OrdemServicoServico } from '../../../../models/OrdemServicos/OrdemServicoItem'
import { Row, Col } from 'antd'
import { WithItemNone } from '../../../../hoc/WithFormItem'
import EditableTable, { ColumnEditableProps } from '../../../../components/EditableTable/EditableTable'
import Separator from '../../../../components/Separator/Separator'

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
            <Row>
                <Col>
                    <WithItemNone showLabel={false}>
                        <EditableTable
                            disabled
                            showNewAction={false}
                            rowKey={(item) => item.servicoId}
                            columns={columnsServico}
                            name="servicos"
                            initiallValues={{}}
                        />
                    </WithItemNone>
                </Col>
            </Row>
            
            <Separator />

            <Row>
                <Col>
                    <WithItemNone showLabel={false}>
                        <EditableTable
                            disabled
                            showNewAction={false}
                            rowKey={(item) => item.produtoId}
                            columns={columnsProduto}
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
