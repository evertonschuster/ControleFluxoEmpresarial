import React, { useState, useEffect } from 'react'
import { Servico } from '../../../../models/Movimentos/Servico';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import { Row, Col } from 'antd';
import { Input, InputNumber } from '../../../../components/WithFormItem/withFormItem';
import { RouteComponentProps } from 'react-router-dom';
import { ServicoSchema } from './ServicoSchema';
import { TextArea } from './../../../../components/WithFormItem/withFormItem';
import SelectModelOne from '../../../../components/SelectModel/SelectModelOne';
import { GetCategoriaById } from '../../../../apis/Movimentos/CategoriaApi';

const FormServico: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {
    const [servico] = useState<Servico>({
        nome: "",
        valor: undefined,
        categoriaId: undefined,
    });
    const [loading] = useState(false);


    useEffect(() => {
        getServico();
    }, [props.match.params.id])


    async function onSubmit() {

    }

    async function getServico() {

    }

    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/servico"
            breadcrumbList={[{ displayName: "Servico", URL: "/servico" }, { displayName: "Novo Serviço", URL: undefined }]}
            initialValues={servico}
            validationSchema={ServicoSchema}
            onSubmit={onSubmit}
        >

            <Row>
                <Col span={2}>
                    <Input name="id" label="Código" placeholder="Codigo" readOnly />
                </Col>

                <Col span={6}>
                    <Input name="nome" label="Servico" placeholder="Servico" required />
                </Col>

                <Col span={4}>
                    <InputNumber name="valor" label="Valor" required />
                </Col>

                <Col span={8}>
                    <SelectModelOne
                        fetchMethod={GetCategoriaById}
                        name="categoriaId"
                        keyDescription="nome"
                        required={true}
                        label={{ title: "Seleção de Categoria", label: "Categoria" }}
                        errorMessage={{ noSelection: "Selecione ao menos uma Categoriaa!" }}
                        path="categoria" />
                </Col>
            </Row>

            <Row>
                <Col span={12}>
                    <TextArea name="descricao" label="Descrição" rows={3} />
                </Col>
            </Row>

            <Row>
                <Col span={12}>
                    <TextArea name="oservacao" label="Observação" rows={3} />
                </Col>
            </Row>

        </CrudFormLayout>)
}

export default FormServico
