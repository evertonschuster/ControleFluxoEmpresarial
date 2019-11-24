import React from 'react';
import FormLayout from '../layouts/FormLayout/FormLayout';
import { Link } from 'react-router-dom';

const TesteForm2: React.FC = () => {

    return (
        <FormLayout breadcrumbList={[{ displayName: "Nome2", URL: "" }, { displayName: "Nome2", URL: "" }]} >
            
            <Link to="/">Voltar 1</Link>
            
        </FormLayout>
    );

}

export default TesteForm2;
