import React, { useEffect } from 'react'
import { Button, Col, Row } from 'antd';
import { Compra } from '../../../../models/Compras/Compra';
import { DatePicker, Input } from 'formik-antd';
import { FornecedorApi } from '../../../../apis/Pessoas/Fornecedor.Api';
import { ListItem } from '../../../../components/ListForm/ListForm';
import { ProdutoApi } from '../../../../apis/Movimentos/ProdutoApi';
import InnerForm from '../../../../components/InnerForm/InnerForm';
import SelectionGenerics from './components/SelectionGenerics';
import SelectModelMore from '../../../../components/SelectModel/SelectModelMore';
import SelectModelOne from '../../../../components/SelectModel/SelectModelOne';
import { CompraApi } from '../../../../apis/Compras/CompraApi';
import SelectionGenericsFormik from './components/SelectionGenericsFormik';

export interface Props<T> {
    tableProps: ListItem<T>;
}

export enum situationFilter {
    ATIVAS = 1,
    CANCELADA = 2,
    CANCELADA_RECENTEMENTE = 3,
    LANCADA_RECENTEMENTE = 4
}


const ListFilterAdvanced: React.FC<Props<Compra>> = (props) => {


    useEffect(() => {
        props.tableProps.setFilterRequest({
            currentPage: props.tableProps.filterRequest.currentPage,
            pageSize: props.tableProps.filterRequest.pageSize,
        })
        return () => {
            props.tableProps.setFilterRequest({
                currentPage: props.tableProps.filterRequest.currentPage,
                pageSize: props.tableProps.filterRequest.pageSize,
            })
        };
    }, [])

    function onSearch(form: any) {
        props.tableProps.setFilterRequest({
            currentPage: props.tableProps.filterRequest.currentPage,
            pageSize: props.tableProps.filterRequest.pageSize,
            ...form,
            dataCompraInicio: form?.comprado && form?.comprado[0],
            dataCompraFim: form?.comprado && form?.comprado![1],
            produtosId: form?.produtosId?.map((e: any) => e.id)
        })
    }

    return (
        <InnerForm initialValues={{ fornecedorId: null, modelo: "", situacao: [] }} onSubmit={onSearch}>
            <Row>
                <Col span={2} style={{ paddingRight: 16 }}>
                    <Input placeholder="Modelo" name="modelo" />
                </Col>
                <Col span={2} style={{ paddingRight: 16 }}>
                    <Input placeholder="Série" name="serie" />
                </Col>
                <Col span={2}>
                    <Input placeholder="Número" name="numero" />
                </Col>

                <Col span={7}>
                    <SelectModelOne
                        showLabel={false}
                        fetchMethod={FornecedorApi.GetById.bind(FornecedorApi)}
                        name="fornecedorId"
                        objectName="fornecedor"
                        keyDescription="nome"
                        required={true}
                        label={{ title: "Seleção de Fornecedor", label: "Fornecedor", placeholder: "Fornecedor" }}
                        errorMessage={{ noSelection: "Selecione um Fornecedor!" }}
                        path="Fornecedor" />
                </Col>

                <Col span={3} >
                    <SelectionGenericsFormik />
                </Col>

            </Row>

            <Row style={{ paddingTop: 16 }}>
                <Col span={7}>
                    <SelectModelMore
                        fetchMethod={ProdutoApi.GetById.bind(ProdutoApi)}
                        name="produtosId"
                        keyDescription="nome"
                        keyId="id"
                        placeholder="Contendo Produtos"
                        padding={false}
                        required={false}
                        showLabel={false}
                        label={{ label: "", title: "Seleção de produtos" }}
                        errorMessage={{ noSelection: "Selecione um produto" }}
                        getListPagined={ProdutoApi.GetListPagined.bind(ProdutoApi)}
                        path={"produto"} />
                </Col>

                <Col span={5} style={{ paddingLeft: 16 }}>
                    <DatePicker.RangePicker
                        name="comprado"
                        placeholder={["Comprado de", "Até"]}
                        format="DD/MM/yyyy" />
                </Col>

                <Col span={5} push={7} style={{ textAlign: "right" }}>
                    <div style={{ flexDirection: "column" }}>
                        <Button type="default" style={{ marginRight: 16 }} onClick={() => props.tableProps.setAdvancedFilter!(false)}>Cancelar</Button>
                        <Button type="primary" htmlType="submit">
                            Filtrar
                        </Button>
                    </div>
                </Col>

            </Row>

        </InnerForm>)
}

export default ListFilterAdvanced
