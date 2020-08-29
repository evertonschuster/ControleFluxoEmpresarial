import React, { useMemo } from 'react'
import { Row, Col } from 'antd'
import InputDecimal from '../../../../../components/InputDecimal/InputDecimal'
import { WithItemNone } from '../../../../../hoc/WithFormItem'
import EditableTable, { ColumnEditableProps } from '../../../../../components/EditableTable/EditableTable'
import { formatNumber2 } from '../../../../../utils/FormatNumber'
import { ColumnProps } from 'antd/lib/table'
import InserirProduto from '../innerForm/InserirProduto/InserirProduto'
import { OrdemServicoProduto } from '../../../../../models/OrdemServicos/OrdemServicoItem'
import InserirServico from '../innerForm/InserirServico/InserirServico'
import { OrdemServicoItemServicoSchema, OrdemServicoItemProdutoSchema } from '../../OrdemServicoItemSchema'
import { OrdemServicoServico } from './../../../../../models/OrdemServicos/OrdemServicoItem';
import Separator from './../../../../../components/Separator/Separator';
import { Input } from '../../../../../components/WithFormItem/withFormItem'

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
            key: 'produto-servico-nome',
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
                return formatNumber2(item?.produto?.valorVenda!)
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
            key: 'produto-servico-nome',
            render: (text, item: OrdemServicoServico) => {
                return item?.servico?.nome
            },
        },
        {
            title: 'Funcionário',
            dataIndex: 'items',
            key: 'produto-servico-nome',
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
                return formatNumber2(item?.servico?.valor!)
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
            <InserirProduto />
            <Row>
                <Col>
                    <WithItemNone showLabel={false}>
                        <EditableTable
                            showNewAction={false}
                            columns={columnsProduto}
                            validationSchema={OrdemServicoItemProdutoSchema}
                            name="produtos"
                            initiallValues={{}}
                        />
                    </WithItemNone>
                </Col>
            </Row>

            <Separator />

            <InserirServico />
            <Row>
                <Col>
                    <WithItemNone showLabel={false}>
                        <EditableTable
                            showNewAction={false}
                            columns={columnsServico}
                            validationSchema={OrdemServicoItemServicoSchema}
                            name="servicos"
                            initiallValues={{}}
                        />
                    </WithItemNone>
                </Col>
            </Row>
        </>
    )
}

export default SelecaoProdutosServicos
