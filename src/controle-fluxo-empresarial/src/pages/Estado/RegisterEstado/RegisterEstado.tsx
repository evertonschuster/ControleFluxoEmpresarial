import React, { useState } from 'react';
import FormLayout from '../../../layouts/FormBasicLayout/FormBasicLayout';
import { RouteComponentProps } from 'react-router-dom';
import { Row, Col, Input, Button } from 'antd';
import ModelForm from '../../../components/ModalForm/ModalForm';
import SelectModel from '../../../components/SelectModel/SelectModelOne';
import { Formik } from 'formik';
import { Form } from 'formik-antd';

const RegisterEstado: React.FC<RouteComponentProps> = () => {

    const [visible, setVisible] = useState<boolean>(false);
    const [state, setstate] = useState<any>(null)

    console.log("RegisterEstado")

    return (
        <FormLayout breadcrumbList={[{ displayName: "Estado", URL: "/Estado" }, { displayName: "Novo Estado", URL: undefined }]} >
            <Formik<{ name: string }> initialValues={{ name: "" }} onSubmit={() => { }}>
                <Form>

                    <Row>
                        <Col span={12}>
                            <Input placeholder="Codigo" />
                        </Col>
                        <Col span={12}>
                            <Input placeholder="Estado" />
                        </Col>
                    </Row>

                    <Row>
                        <Col span={12}>
                            <Input placeholder="UF" />
                        </Col>
                        <Col span={12}>
                            <SelectModel
                                name="paisId"
                                keyId="id"
                                keyDescription="pais"
                                setState={setstate}
                                state={state}
                                label={{ title: "Seleção de Pais" }}
                                errorMessage={{ noSelection: "Selecione ao menos um Pais!" }}
                                path="pais" />
                        </Col>
                    </Row>

                </Form>
            </Formik>
        </FormLayout>
    );

}

export default RegisterEstado;
