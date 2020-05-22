import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import { Fornecedor } from '../../../../models/Pessoas/Fornecedor';
import { FornecedorSchema } from './FornecedorSchema';
import { TIPO_PESSOA } from '../../../../models/Pessoas/Pessoa';
import GeralForm from './components/GeralForm';

const FormFornecedor: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {


    const [fornecedor] = useState<Fornecedor>({
        apelido: "",
        bairro: "",
        cep: "",
        complemento: "",
        cPFCPNJ: "",
        dataNascimento: undefined,
        email: "",
        endereco: "",
        id: "",
        nacionalidade: "",
        nome: "",
        observacoes: "",
        rgInscricaoEstadual: "",
        telefone: "",
        tipo: TIPO_PESSOA.Fisica
    })
    const [loading] = useState(false);


    useEffect(() => {
        getFornecedor();
    }, [props.match.params.id])


    async function onSubmit() {

    }

    async function getFornecedor() {

    }

    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/fornecedor"
            breadcrumbList={[{ displayName: "Fornecedor", URL: "/fornecedor" }, { displayName: "Novo Fornecedor", URL: undefined }]}
            initialValues={fornecedor}
            validationSchema={FornecedorSchema}
            onSubmit={onSubmit}
        >

            <GeralForm></GeralForm>

        </CrudFormLayout>
    );

}

export default FormFornecedor;
