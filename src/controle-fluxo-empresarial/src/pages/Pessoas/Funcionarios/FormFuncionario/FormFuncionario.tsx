import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import { FuncionarioSchema } from './FuncionarioSchema';
import { Funcionario } from '../../../../models/Pessoas/Funcionario';
import GeralForm from './components/GeralForm';

const FormFuncionario: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {


    const [funcionario] = useState<Funcionario>({
        apelido: "",
        bairro: "",
        cep: "",
        complemento: "",
        cPFCPNJ: "",
        dataNascimento: undefined,
        email: "",
        endereco: "",
        estadoCivil: undefined,
        id: "",
        nacionalidade: "",
        nome: "",
        observacoes: "",
        rgInscricaoEstadual: "",
        sexo: undefined,
        telefone: "",
        cnh: ""

    });
    const [loading] = useState(false);


    useEffect(() => {
        getFuncionario();
    }, [props.match.params.id])


    async function onSubmit() {

    }

    async function getFuncionario() {

    }

    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/funcionario"
            breadcrumbList={[{ displayName: "Funcionario", URL: "/funcionario" }, { displayName: "Novo Funcionario", URL: undefined }]}
            initialValues={funcionario}
            validationSchema={FuncionarioSchema}
            onSubmit={onSubmit}
        >

            <GeralForm></GeralForm>

        </CrudFormLayout>
    );

}

export default FormFuncionario;
