import React, { useState } from 'react';
import FormLayout from '../../../layouts/FormBasicLayout/FormBasicLayout';
import { RouteComponentProps } from 'react-router-dom';
import { Row, Col } from 'antd';
import SelectModel from '../../../components/SelectModel/SelectModelOne';
import { Formik } from 'formik';
import { Form } from 'formik-antd';
import { Input } from '../../../components/WithFormItem/withFormItem';
import CrudFormLayout from '../../../layouts/CrudFormLayout/CrudFormLayout';

const RegisterEstado: React.FC<RouteComponentProps> = () => {

    return (
        <CrudFormLayout
            breadcrumbList={[{ displayName: "Estado", URL: "/Estado" }, { displayName: "Novo Estado", URL: undefined }]}
            initialValues={{ name: "" }} onSubmit={() => { }}
        >

            <Row>
                <Col span={12}>
                    <Input name="Id" label="Codigo" placeholder="Codigo" />
                </Col>
                <Col span={12}>
                    <Input name="estado" label="Estado" placeholder="Estado" />
                </Col>
            </Row>

            <Row>
                <Col span={12}>
                    <Input name="uF" label="UF" placeholder="UF" />
                </Col>
                <Col span={12}>
                    <SelectModel
                        name="paisId"
                        keyDescription="pais"
                        required={true}
                        label={{ title: "Seleção de Pais", label: "Pais" }}
                        errorMessage={{ noSelection: "Selecione ao menos um Pais!" }}
                        path="pais" />
                </Col>
            </Row>

        </CrudFormLayout>
    );

}

export default RegisterEstado;
