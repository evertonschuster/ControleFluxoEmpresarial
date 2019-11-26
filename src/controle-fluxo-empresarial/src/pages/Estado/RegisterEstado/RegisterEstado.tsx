import React, { useState } from 'react';
import FormLayout from '../../../layouts/FormBasicLayout/FormBasicLayout';
import { RouteComponentProps } from 'react-router-dom';
import { Row, Col, Input, Button } from 'antd';
import ModelForm from '../../../components/ModalForm/ModalForm';

const RegisterEstado: React.FC<RouteComponentProps> = () => {


    const [visible, setVisible] = useState<boolean>(false);
    const [state, setstate] = useState<any>([])
    
    console.log("Pais selecionado", (state[0] || {}).id)

    return (
        <FormLayout breadcrumbList={[{ displayName: "Estado", URL: "/Estado" }, { displayName: "Novo Estado", URL: undefined }]} >

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
                <Col span={10}>
                    <Input placeholder="Pais" value={(state[0] || {}).pais} /> 
                </Col>
                <Col span={2}>
                    <Button onClick={() => setVisible(true)}>Select Pais</Button>
                </Col>
            </Row>

            <ModelForm visible={visible} setVisible={setVisible} setState={setstate} state={state} path="pais" />


        </FormLayout>
    );

}

export default RegisterEstado;
