import React, { useMemo } from 'react'
import { InserirProdutoSchema } from './InserirProdutoSchema'
import { OrdemServicoProduto } from '../../../../../../models/OrdemServicos/OrdemServicoItem'
import { ProdutoApi } from '../../../../../../apis/Movimentos/ProdutoApi'
import { Row, Col } from 'antd'
import { SubmitButton } from 'formik-antd'
import { useField, FormikHelpers } from 'formik'
import InnerForm from '../../../../../../components/InnerForm/InnerForm'
import InputDecimal from '../../../../../../components/InputDecimal/InputDecimal'
import SelectModelOne from '../../../../../../components/SelectModel/SelectModelOne'

const InserirProduto: React.FC = () => {

    const initialValues = useMemo(() => ({
        id: null,
        valor: null,
        quantidade: 1,
    } as OrdemServicoProduto), []);

    const [{ value: produtos }, , { setValue: setProdutos }] = useField<OrdemServicoProduto[]>("produtos");

    function onSave(item: OrdemServicoProduto, formikHelpers: FormikHelpers<OrdemServicoProduto>) {

        if (produtos?.findIndex(e => e.produtoId === item.produtoId) >= 0) {
            formikHelpers.setFieldError("produtoId", "Produto já Adicionado.")
            return formikHelpers.setSubmitting(false);
        }

        debugger;
        item.valor = item.produto?.valorVenda!;
        setProdutos([...produtos, item]);
        formikHelpers.resetForm({ values: initialValues })
    }

    return (
        <InnerForm
            key="produto-form"
            initialValues={initialValues}
            onSubmit={onSave}
            validationSchema={InserirProdutoSchema}
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
                    <InputDecimal name="quantidade" label="Quantidade" placeholder="10,00" required />
                </Col>

                <Col span={2}  >
                    <div className="ant-row ant-form-item ant-form-item-with-help form-custom-item">
                        <div className="ant-col ant-form-item-label">
                            &nbsp;
                            </div>

                        <div className="ant-col ant-form-item-control-wrapper">
                            <div className="ant-form-item-control ">
                                <span className="ant-form-item-children" style={{ display: "flex", flex: 1, justifyContent: "flex-end", paddingTop: 4 }}>
                                    <SubmitButton >Adicionar</SubmitButton >
                                </span>
                            </div>
                        </div>
                    </div>

                </Col>
            </Row>
        </InnerForm >
    )
}

export default InserirProduto
