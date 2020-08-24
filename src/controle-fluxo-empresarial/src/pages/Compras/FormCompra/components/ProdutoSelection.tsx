import React, { useMemo, useState } from 'react'
import { Row, Col, Table, Divider } from 'antd'
import SelectModelOne from '../../../../components/SelectModel/SelectModelOne'
import { ProdutoApi } from '../../../../apis/Movimentos/ProdutoApi'
import { UnidadeMedidaApi } from '../../../../apis/Movimentos/UnidadeMedidaApi'
import InputDecimal from '../../../../components/InputDecimal/InputDecimal'
import { ColumnProps } from 'antd/lib/table'
import { CompraProduto } from '../../../../models/Compras/CompraProduto'
import { FormikHelpers, useField } from 'formik'
import { CompraProdutoSchema } from '../CompraProdutoSchema'
import { SubmitButton } from 'formik-antd'
import InnerForm from '../../../../components/InnerForm/InnerForm'
import { Produto } from '../../../../models/Movimentos/Produto'
import { UnidadeMedida } from './../../../../models/Movimentos/UnidadeMedida';
import { formatNumber2 } from '../../../../utils/FormatNumber'
import EditableTable, { ColumnEditableProps, RowMode } from '../../../../components/EditableTable/EditableTable'
import { WithItemNone } from '../../../../hoc/WithFormItem'

const ProdutoSelection: React.FC = () => {

    const columns: ColumnProps<CompraProduto>[] = useMemo(() => [
        {
            title: 'Código',
            width: 100,
            dataIndex: 'produto',
            key: 'produto-codigo',
            render: (produto: Produto) => {
                return produto?.id
            },
        },
        {
            title: 'Produto',
            dataIndex: 'produto',
            key: 'produto',
            editable: true,
            render: (produto: Produto) => {
                return produto?.nome
            },
            renderEditable: (text, record) => {
                if (record.rowMode === RowMode.new) {
                    return (<SelectModelOne
                        fetchMethod={ProdutoApi.GetById.bind(ProdutoApi)}
                        name="produtoId"
                        objectName="produto"
                        keyDescription="nome"
                        required={true}
                        showLabel={false}
                        label={{ title: "Seleção de Produto", label: "Produto" }}
                        errorMessage={{ noSelection: "Selecione um Produto!" }}
                        path="Produto" />)
                }

                return record.produto?.nome;
            },
        },
        {
            width: 200,
            title: 'Unidade Medida',
            dataIndex: 'unidadeMedida',
            key: 'unidadeMedida',
            editable: true,
            render: (unidadeMed: UnidadeMedida) => {
                return unidadeMed?.nome
            },
            renderEditable: () => <SelectModelOne
                fetchMethod={UnidadeMedidaApi.GetById.bind(UnidadeMedidaApi)}
                name="unidadeMedidaId"
                keyDescription="nome"
                objectName="unidadeMedida"
                required={true}
                showLabel={false}
                idIsInt={false}
                showDescription={false}
                label={{ title: "Seleção de Unidade de Medida", label: "Unidade de Medida" }}
                errorMessage={{ noSelection: "Selecione uma Unidade de Medida!" }}
                path="unidade-medida" />
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
            dataIndex: 'valor',
            editable: true,
            key: 'valor',
            title: 'Valor',
            render: (valor: number) => {
                return formatNumber2(valor)
            },
            renderEditable: () => <InputDecimal name="valor" placeholder="10,00" required />
        },
        {
            align: "right",
            width: 100,
            title: 'Desconto',
            dataIndex: 'desconto',
            key: 'desconto',
            editable: true,
            render: (desconto: number) => {
                return desconto ? formatNumber2(desconto) : "-"
            },
            renderEditable: () => <InputDecimal name="desconto" placeholder="10,00" required />
        },
        {
            align: "right",
            width: 100,
            title: 'IPI',
            dataIndex: 'ipi',
            key: 'ipi',
            editable: true,
            render: (ipi: number) => {
                return ipi ? formatNumber2(ipi) : "-"
            },
            renderEditable: () => <InputDecimal name="ipi" placeholder="10,00" required />
        },
        {
            align: "right",
            width: 100,
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            render: (_: number, record: CompraProduto) => {
                let total = (record.quantidade! * record.valor!) - record.desconto! + record.ipi!;

                return formatNumber2(total)
            }
        },

    ] as ColumnEditableProps<CompraProduto>[], [])

    const initialValues: CompraProduto = useMemo(() => ({
        produtoId: null,
        desconto: null,
        ipi: null,
        quantidade: null,
        unidadeMedidaId: null,
        valor: null,
    }), [])

    const [compraProduto] = useState<CompraProduto>(initialValues)
    const [field, , helper] = useField<CompraProduto[]>("compraProdutos")


    async function onSubmit(values: CompraProduto, formikHelpers: FormikHelpers<CompraProduto>) {
        let containsErrors = false;


        if (!values.produto) {
            formikHelpers.setFieldError("produtoId", "Produto inválido.")
            containsErrors = true;
        }

        if (!values.unidadeMedida) {
            formikHelpers.setFieldError("unidadeMedidaId", "Unidade de Medida inválido.")
            containsErrors = true;
        }

        if (field?.value?.findIndex(e => e.produtoId === values.produtoId) >= 0) {
            formikHelpers.setFieldError("produtoId", "Produto já Adicionado.")
            containsErrors = true;
        }

        if (containsErrors) {
            return formikHelpers.setSubmitting(false);
        }


        formikHelpers.resetForm({ values: initialValues })
        helper.setValue(field.value.concat(values))
    }


    return (
        <>
            <Divider>Produtos</Divider>

            <InnerForm
                initialValues={compraProduto}
                onSubmit={onSubmit}
                validationSchema={CompraProdutoSchema}
            >
                <Row>

                    <Col span={7}>
                        <SelectModelOne
                            fetchMethod={ProdutoApi.GetById.bind(ProdutoApi)}
                            name="produtoId"
                            objectName="produto"
                            keyDescription="nome"
                            required={true}
                            label={{ title: "Seleção de Produto", label: "Produto" }}
                            errorMessage={{ noSelection: "Selecione um Produto!" }}
                            path="Produto" />
                    </Col>

                    <Col span={3}>
                        <SelectModelOne
                            fetchMethod={UnidadeMedidaApi.GetById.bind(UnidadeMedidaApi)}
                            name="unidadeMedidaId"
                            keyDescription="nome"
                            objectName="unidadeMedida"
                            required={true}
                            idIsInt={false}
                            showDescription={false}
                            label={{ title: "Seleção de Unidade de Medida", label: "Unidade de Medida" }}
                            errorMessage={{ noSelection: "Selecione uma Unidade de Medida!" }}
                            path="unidade-medida" />
                    </Col>

                    <Col span={2}>
                        <InputDecimal name="quantidade" label="Quantidade" placeholder="10,00" required />
                    </Col>

                    <Col span={2}>
                        <InputDecimal name="valor" label="Valor" placeholder="10,00" required />
                    </Col>

                    <Col span={2}>
                        <InputDecimal name="desconto" label="Desconto" placeholder="10,00" />
                    </Col>

                    <Col span={2}>
                        <InputDecimal name="ipi" label="IPI" placeholder="10,00" />
                    </Col>

                    <Col span={3} push={3} >
                        <div className="ant-row ant-form-item ant-form-item-with-help form-custom-item">
                            <div className="ant-col ant-form-item-label">
                                &nbsp;
                            </div>

                            <div className="ant-col ant-form-item-control-wrapper">
                                <div className="ant-form-item-control ">
                                    <span className="ant-form-item-children" style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
                                        <SubmitButton >Adicionar</SubmitButton >
                                    </span>
                                </div>
                            </div>
                        </div>

                    </Col>
                </Row>
            </InnerForm >

            <Row>
                <Col>
                    <WithItemNone showLabel={false}>
                        <EditableTable
                            showNewAction={false}
                            columns={columns}
                            validationSchema={CompraProdutoSchema}
                            name="compraProdutos"
                            initiallValues={initialValues}
                            rowKey="produtoId" />
                    </WithItemNone>
                </Col>
            </Row>
        </>
    )
}

export default ProdutoSelection
