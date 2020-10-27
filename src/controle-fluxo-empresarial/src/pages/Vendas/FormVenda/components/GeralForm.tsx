import { Col, Row } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import React, { useMemo } from 'react'
import { ClienteApi } from '../../../../apis/Pessoas/ClienteApi'
import EditableTable, { ColumnEditableProps } from '../../../../components/EditableTable/EditableTable'
import InputDecimal from '../../../../components/InputDecimal/InputDecimal'
import SelectModelOne from '../../../../components/SelectModel/SelectModelOne'
import Separator from '../../../../components/Separator/Separator'
import { Input } from '../../../../components/WithFormItem/withFormItem'
import { WithItemNone } from '../../../../hoc/WithFormItem'
import { VendaProduto } from '../../../../models/Vendas/VendaProduto'
import { formatNumber2 } from '../../../../utils/FormatNumber'
import InserirProduto from '../innerForm/InserirProduto/InserirProduto'
import { VendaItemProdutoSchema } from '../VendaSchema'
import CondicaoPagamento from './CondicaoPagamento'
import { useField } from 'formik';
import { useEffect } from 'react';
import { FormModeVenda } from '../FormVenda'

const GeralForm: React.FC = () => {

    const columnsProduto: ColumnProps<VendaProduto>[] = useMemo(() => [
        {
            title: 'Código',
            width: 100,
            dataIndex: 'items',
            key: 'produto-servico-codigo',
            render: (text, item: VendaProduto) => {
                return item?.produtoId
            },
        },
        {
            title: 'Produto',
            dataIndex: 'items',
            key: 'produto-servico-nome1',
            render: (text, item: VendaProduto) => {
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
            render: (text, item: VendaProduto) => {
                return formatNumber2(item?.valor!)
            },
        },
        {
            align: "right",
            width: 100,
            title: 'Total',
            dataIndex: 'tipo',
            key: 'total',
            render: (text, item: VendaProduto) => {
                return formatNumber2(item?.produto?.valorVenda! * item.quantidade!)
            },
        },
    ] as ColumnEditableProps<any>[], [])


    const [{ value: formMode }] = useField<FormModeVenda>("forMode");
    const [, , { setValue: SetTotalCompra }] = useField("totalCompra");
    const [{ value: produtos }] = useField<VendaProduto[]>("produtos");


    const disablePK = formMode === FormModeVenda.PAGAMENTO || formMode === FormModeVenda.CANCELAMENTO || formMode === FormModeVenda.VISUALIZACAO;
    const disableForm = formMode === FormModeVenda.PAGAMENTO || formMode === FormModeVenda.CANCELAMENTO || formMode === FormModeVenda.VISUALIZACAO;

    useEffect(() => {
        let totalProduto = (produtos ?? []).reduce((a, e) => a + (e.quantidade! * e.valor!), 0);
        SetTotalCompra(totalProduto)
    }, [produtos])

    return (
        <>
            <Row>
                <Col span={2}>
                    <Input name="modelo" label="Modelo" placeholder="05" required disabled={disablePK} fast={false} />
                </Col>
                <Col span={2}>
                    <Input name="serie" label="Série" placeholder="1" required disabled={disablePK} fast={false} />
                </Col>
                <Col span={2}>
                    <Input name="numero" label="Número" disabled />
                </Col>
                <Col span={7}>
                    <SelectModelOne
                        disabled={disableForm}
                        fetchMethod={ClienteApi.GetById.bind(ClienteApi)}
                        name="clienteId"
                        keyDescription="nome"
                        objectName="cliente"
                        required={true}
                        label={{ title: "Seleção de Cliente", label: "Cliente" }}
                        errorMessage={{ noSelection: "Selecione um Cliente!" }}
                        path="cliente" />
                </Col>
            </Row>


            <Separator />
            <InserirProduto disableForm={disableForm} />
            <Row>
                <Col>
                    <WithItemNone showLabel={false}>
                        <EditableTable
                            disabled={disableForm}
                            showNewAction={false}
                            rowKey={(item) => item.produtoId}
                            columns={columnsProduto}
                            validationSchema={VendaItemProdutoSchema}
                            name="produtos"
                            initiallValues={{}}
                        />
                    </WithItemNone>
                </Col>
            </Row>

            <Row>
                <Col push={21} span={3}>
                    <InputDecimal name="totalCompra" label="Total" placeholder="0,00" disabled />
                </Col>
            </Row>

            <CondicaoPagamento />
        </>
    )
}

export default GeralForm
