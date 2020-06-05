import React, { useState, useEffect } from 'react'
import { Produto } from '../../../../models/Movimentos/Produto';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import { Row, Col } from 'antd';
import { Input, TextArea, InputNumber } from '../../../../components/WithFormItem/withFormItem';
import { RouteComponentProps } from 'react-router-dom';
import { ProdutoSchema } from './ProdutoSchema';
import SelectModelOne from '../../../../components/SelectModel/SelectModelOne';
import { CategoriaApi } from '../../../../apis/Movimentos/CategoriaApi';
import { UnidadeMedidaApi } from '../../../../apis/Movimentos/UnidadeMedidaApi';
import { MarcaApi } from '../../../../apis/Movimentos/MarcaApi';

const FormProduto: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {
    const [produto] = useState<Produto>({
        nome: "",
        categoriaId: undefined,
        quantidade: undefined,
        quantidadeMinima: undefined,
        valorCompra: undefined,
        valorVenda: undefined,
        taxa: undefined,
        unidadeMedidaId: undefined,
        codigoBarra: "",
        referencia: "",
        marcaId: undefined,
    });
    const [loading] = useState(false);


    useEffect(() => {
        getProduto();
    }, [props.match.params.id])


    async function onSubmit() {

    }

    async function getProduto() {

    }

    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/produto"
            breadcrumbList={[{ displayName: "Produtos", URL: "/produto" }, { displayName: "Novo Produto", URL: undefined }]}
            initialValues={produto}
            validationSchema={ProdutoSchema}
            onSubmit={onSubmit}
        >

            <Row>
                <Col span={2}>
                    <Input name="id" label="Código" placeholder="Codigo" readOnly />
                </Col>

                <Col span={10}>
                    <Input name="nome" label="Produto" placeholder="Produto" required />
                </Col>

                <Col span={3}>
                    <SelectModelOne
                        fetchMethod={UnidadeMedidaApi.GetById.bind(UnidadeMedidaApi)}
                        name="unidadeMedidaId"
                        keyDescription="Unidade de Medida"
                        required={true}
                        showDescription={false}
                        label={{ title: "Seleção de Unidade de Medida", label: "Unidade de Medida" }}
                        errorMessage={{ noSelection: "Selecione uma Unidade de Medida!" }}
                        path="unidade-medida" />
                </Col>

                <Col span={3}>
                    <Input name="codigoBarra" label="Codigo Barras" placeholder="Codigo Barras" />
                </Col>

                <Col span={3}>
                    <Input name="referencia" label="Referência" placeholder="Codigo" />
                </Col>

            </Row>

            <Row>
                <Col span={12}>
                    <TextArea name="descricao" label="Descrição" rows={4} />
                </Col>
            
                <Row>
                <Col span={12}>
                    <TextArea name="observacao" label="Observação" rows={4} />
                </Col>
            </Row>
            </Row>

            <Row>
                <Col span={6}>
                    <SelectModelOne
                        fetchMethod={MarcaApi.GetById.bind(MarcaApi)}
                        name="marcaId"
                        keyDescription="nome"
                        required={true}
                        label={{ title: "Seleção de Marca", label: "Marca" }}
                        errorMessage={{ noSelection: "Selecione uma Marca!" }}
                        path="marca" />
                </Col>

                <Col span={6}>
                    <SelectModelOne
                        fetchMethod={CategoriaApi.GetById.bind(CategoriaApi)}
                        name="categoriaId"
                        keyDescription="nome"
                        required={true}
                        label={{ title: "Seleção de Categoria", label: "Categoria" }}
                        errorMessage={{ noSelection: "Selecione ao menos uma Categoria!" }}
                        path="categoria" />
                </Col>
            </Row>

            <Row>
                <Col span={3}>
                    <InputNumber name="quantidadeMinima" label="Quantidade Mínima" placeholder="2" required />
                </Col>

                <Col span={3}>
                    <InputNumber
                        name="valorCompra" label="Valor Compra" placeholder="10,20" required
                        parser={(value) => value?.replace(/\$\s?|(,*)/g, '') || ""}
                    />
                </Col>

                <Col span={3}>
                    <InputNumber name="taxa" label="Margem de lucro (%)" min={0} max={100} placeholder="15,50" />
                </Col>

                <Col span={3}>
                    <InputNumber name="valorVenda" label="Valor Venda" placeholder="15,50" required />
                </Col>

                <Col span={3}>
                    <InputNumber name="quantidade" label="Quantidade" placeholder="10" required />
                </Col>

            </Row>
            



        </CrudFormLayout>)
}

export default FormProduto
