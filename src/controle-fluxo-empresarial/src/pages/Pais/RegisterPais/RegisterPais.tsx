import React, { useState } from 'react';
import FormLayout from '../../../layouts/FormBasicLayout/FormBasicLayout';
import { RouteComponentProps } from 'react-router-dom';
import { Button } from 'antd';

const RegisterPais: React.FC<RouteComponentProps> = () => {    

    const [, setVisible] = useState<boolean>(false);
    const [] = useState<any>([])
    
    return (
        <FormLayout breadcrumbList={[{ displayName: "Pais", URL: "/Pais" }, { displayName: "Novo Pais", URL: undefined }]} >

            Cadastro de pais
            <Button onClick={() => setVisible(true)}>Select Pais</Button>

        </FormLayout>
    );

}

export default RegisterPais;
