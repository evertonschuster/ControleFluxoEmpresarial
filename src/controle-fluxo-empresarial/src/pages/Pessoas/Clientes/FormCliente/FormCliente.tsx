import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import { ClienteSchema } from './ClienteSchema';
import { Cliente } from '../../../../models/Pessoas/Cliente';
import { TIPO_PESSOA } from '../../../../models/Pessoas/Pessoa';
import GeralForm from './components/GeralForm';

const FormCliente: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {


    const [cliente] = useState<Cliente>({
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
        limiteCredito: undefined,
        nacionalidade: "",
        nome: "",
        observacoes: "",
        rgInscricaoEstadual: "",
        sexo: undefined,
        telefone: "",
        tipo: TIPO_PESSOA.Fisica
    })
    const [loading] = useState(false);


    useEffect(() => {
        getCliente();
    }, [props.match.params.id])


    async function onSubmit() {

    }

    async function getCliente() {

    }

    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/cliente"
            breadcrumbList={[{ displayName: "Cliente", URL: "/cliente" }, { displayName: "Novo Cliente", URL: undefined }]}
            initialValues={cliente}
            validationSchema={ClienteSchema}
            onSubmit={onSubmit}
        >

            <GeralForm></GeralForm>

        </CrudFormLayout>
    );

}

export default FormCliente;
