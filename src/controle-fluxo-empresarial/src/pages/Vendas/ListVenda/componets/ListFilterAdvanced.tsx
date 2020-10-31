import React, { useEffect } from 'react'
import { Button, Col, Row } from 'antd';
import { DatePicker, Input } from 'formik-antd';
import { ListItem } from '../../../../components/ListForm/ListForm';
import { ProdutoApi } from '../../../../apis/Movimentos/ProdutoApi';
import InnerForm from '../../../../components/InnerForm/InnerForm';
import SelectModelMore from '../../../../components/SelectModel/SelectModelMore';
import SelectModelOne from '../../../../components/SelectModel/SelectModelOne';
import { Venda } from '../../../../models/Vendas/Venda';
import { FormikHelpers } from 'formik';
import SelectionGenericsFormik from './components/SelectionGenericsFormik';
import { ClienteApi } from '../../../../apis/Pessoas/ClienteApi';

export interface Props<T> {
    tableProps: ListItem<T>;
}

export enum situationFilter {
    ATIVAS = 1,
    CANCELADA = 2,
    CANCELADA_RECENTEMENTE = 3,
    LANCADA_RECENTEMENTE = 4
}


const ListFilterAdvanced: React.FC<Props<Venda>> = (props) => {

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

    function onSearch(form: any, formik: FormikHelpers<any>) {
        props.tableProps.setFilterRequest({
            currentPage: props.tableProps.filterRequest.currentPage,
            pageSize: props.tableProps.filterRequest.pageSize,
            ...form,
            dataVendaInicio: form?.vendido && form?.vendido[0],
            dataVendaFim: form?.vendido && form?.vendido![1],
            produtosId: form?.produtosId?.map((e: any) => e.id)
        })

        formik.setSubmitting(false);
    }

    return (
        <InnerForm initialValues={{ clienteId: null, modelo: "", situacao: [] }} onSubmit={onSearch}>
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
                        fetchMethod={ClienteApi.GetById.bind(ClienteApi)}
                        name="clienteId"
                        objectName="cliente"
                        keyDescription="nome"
                        required={true}
                        label={{ title: "Seleção de Cliente", label: "Cliente", placeholder: "Cliente" }}
                        errorMessage={{ noSelection: "Selecione um Cliente!" }}
                        path="Cliente" />
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
                        name="vendido"
                        placeholder={["Vendido de", "Até"]}
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
