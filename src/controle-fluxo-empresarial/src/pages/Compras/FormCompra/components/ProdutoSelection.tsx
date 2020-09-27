import React, { useMemo, useRef, useState } from 'react'
import { CompraProduto } from '../../../../models/Compras/CompraProduto'
import { CompraProdutoSchema } from '../CompraProdutoSchema'
import { FormCompraMode } from '../FormCompra'
import { FormikHelpers, useField } from 'formik'
import { ProdutoApi } from '../../../../apis/Movimentos/ProdutoApi'
import { Row, Col, Divider } from 'antd'
import { SubmitButton } from 'formik-antd'
import { UnidadeMedidaApi } from '../../../../apis/Movimentos/UnidadeMedidaApi'
import { WithItemNone } from '../../../../hoc/WithFormItem'
import InnerForm from '../../../../components/InnerForm/InnerForm'
import InputDecimal from '../../../../components/InputDecimal/InputDecimal'
import ListDetailsProduto, { ListHandle } from './ListDetailsProduto'
import SelectModelOne from '../../../../components/SelectModel/SelectModelOne'
import Separator from '../../../../components/Separator/Separator'

const ProdutoSelection: React.FC = () => {

    const initialValues: CompraProduto = useMemo(() => ({
        produtoId: null,
        desconto: null,
        ipi: null,
        quantidade: null,
        unidadeMedidaId: null,
        valorUnitario: null,
        custoUnitario: null,
    }), [])

    const [compraProduto] = useState<CompraProduto>(initialValues)
    const [{ value: produtos }] = useField<CompraProduto[]>("produtos")
    const [{ value: formMode }] = useField<FormCompraMode>("formMode");

    const disableForm = formMode === FormCompraMode.CANCELAMENTO || formMode === FormCompraMode.VISUALIZACAO || formMode === FormCompraMode.PAGAMENTO;
    const childRef = useRef<ListHandle>(null);

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

        if (produtos?.findIndex(e => e.produtoId === values.produto?.id) >= 0) {
            formikHelpers.setFieldError("produtoId", "Produto já Adicionado.")
            containsErrors = true;
        }

        if (containsErrors) {
            return formikHelpers.setSubmitting(false);
        }

        formikHelpers.resetForm({ values: initialValues })
        let newProdutos = produtos.concat(values);
        childRef.current?.refeshValues(newProdutos);
    }

    return (
        <>
            <Separator />
            <Separator />
            <Divider orientation={"left"}>Produtos</Divider>

            <InnerForm
                initialValues={compraProduto}
                onSubmit={onSubmit}
                validationSchema={CompraProdutoSchema}
            >
                <Row>

                    <Col span={7}>
                        <SelectModelOne
                            disabled={disableForm}
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
                            disabled={disableForm}
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
                        <InputDecimal name="quantidade" label="Quantidade" placeholder="10,00" required disabled={disableForm} />
                    </Col>

                    <Col span={3}>
                        <InputDecimal name="valorUnitario" label="Valor" placeholder="10,00" required disabled={disableForm} />
                    </Col>

                    <Col span={2}>
                        <InputDecimal name="desconto" label="Desconto" placeholder="10,00" disabled={disableForm} />
                    </Col>

                    <Col span={2}>
                        <InputDecimal name="ipi" label="IPI" placeholder="10,00" disabled={disableForm} />
                    </Col>

                    <Col span={3} push={2} >
                        <div className="ant-row ant-form-item ant-form-item-with-help form-custom-item">
                            <div className="ant-col ant-form-item-label">
                                &nbsp;
                            </div>

                            <div className="ant-col ant-form-item-control-wrapper">
                                <div className="ant-form-item-control ">
                                    <span className="ant-form-item-children" style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
                                        <SubmitButton disabled={disableForm} >Adicionar</SubmitButton >
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
                        <ListDetailsProduto initialValues={initialValues} disabled={disableForm} ref={childRef} />
                    </WithItemNone>
                </Col>
            </Row>
        </>
    )
}

export default ProdutoSelection
