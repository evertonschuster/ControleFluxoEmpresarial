import React, { useMemo } from 'react'
import { Row, Col } from 'antd'
import InputDecimal from '../../../../../components/InputDecimal/InputDecimal'
import { WithItemNone } from '../../../../../hoc/WithFormItem'
import EditableTable, { ColumnEditableProps } from '../../../../../components/EditableTable/EditableTable'
import { Produto } from '../../../../../models/Movimentos/Produto'
import { formatNumber2 } from '../../../../../utils/FormatNumber'
import { ColumnProps } from 'antd/lib/table'
import InserirProduto from '../innerForm/InserirProduto/InserirProduto'
import InserirServico from '../innerForm/InserirServico/InserirServico'
import OrdemServicoItem, { OrdemServicoItemType } from '../../../../../models/OrdemServicos/OrdemServicoItem'
import { OrdemServicoItemSchema } from '../../OrdemServicoItemSchema'

const SelecaoProdutosServicos: React.FC = () => {
    const columns: ColumnProps<any>[] = useMemo(() => [
        {
            title: 'Código',
            width: 100,
            dataIndex: 'items',
            key: 'produto-servico-codigo',
            render: (text, item: OrdemServicoItem) => {
                if (item?.tipo === OrdemServicoItemType.Produto) {
                    return `${item?.produtoId} P`
                }
                return `${item?.servicoId} S`
            },
        },
        {
            title: 'Produto/Serviço',
            dataIndex: 'items',
            key: 'produto-servico-nome',
            render: (text, item: OrdemServicoItem) => {
                if (item?.tipo === OrdemServicoItemType.Produto) {
                    return item?.produto?.nome
                }
                return item?.servico?.nome
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
            render: (text, item: OrdemServicoItem) => {
                if (item?.tipo === OrdemServicoItemType.Produto) {
                    return formatNumber2(item?.produto?.valorVenda!)
                }
                return formatNumber2(item?.servico?.valor!)
            },
        },
        {
            align: "right",
            width: 100,
            title: 'Total',
            dataIndex: 'tipo',
            key: 'total',
            render: (text, item: OrdemServicoItem) => {
                if (item?.tipo === OrdemServicoItemType.Produto) {
                    return formatNumber2(item?.produto?.valorVenda! * item.quantidade!)
                }
                return formatNumber2(item?.servico?.valor! * item.quantidade!)
            },
        },
    ] as ColumnEditableProps<any>[], [])


    return (
        <>
            <InserirProduto />
            <InserirServico />
            <Row>
                <Col>
                    <WithItemNone showLabel={false}>
                        <EditableTable
                            showNewAction={false}
                            columns={columns}
                            validationSchema={OrdemServicoItemSchema}
                            name="items"
                            initiallValues={{}}
                            rowKey={(item: OrdemServicoItem) => {
                                console.log({ item })
                                if (item?.tipo === OrdemServicoItemType.Produto) {
                                    return `${item?.produtoId}P`
                                }
                                return `${item?.servicoId}S`
                            }} />
                    </WithItemNone>
                </Col>
            </Row>
        </>
    )
}

export default SelecaoProdutosServicos
