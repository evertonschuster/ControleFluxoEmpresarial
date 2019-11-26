import React, { useState } from 'react';
import FormLayout from '../../../layouts/FormBasicLayout/FormBasicLayout';
import { RouteComponentProps } from 'react-router-dom';
import ModelForm from '../../../components/ModalForm/ModalForm';
import { Row, Col, Input, Button } from 'antd';

const RegisterPais: React.FC<RouteComponentProps> = () => {    

    const [visible, setVisible] = useState<boolean>(false);
    const [state, setstate] = useState<any>([])
    
    return (
        <FormLayout breadcrumbList={[{ displayName: "Pais", URL: "/Pais" }, { displayName: "Novo Pais", URL: undefined }]} >

            Cadastro de pais
            <Button onClick={() => setVisible(true)}>Select Pais</Button>

            <ModelForm visible={visible} setVisible={setVisible} setState={setstate} state={state} path="pais" />

        </FormLayout>
    );

}

export default RegisterPais;
