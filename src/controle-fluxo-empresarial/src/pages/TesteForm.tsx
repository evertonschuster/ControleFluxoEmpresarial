import React from 'react';
import FormLayout from '../layouts/FormLayout/FormLayout';
import { Link } from 'react-router-dom';

const TesteForm: React.FC = () => {

    return (
        <FormLayout >

            <Link to="/teste">Voltar 2</Link>
        </FormLayout>
    );

}

export default TesteForm;
