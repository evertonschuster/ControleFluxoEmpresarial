import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import { Fornecedor } from '../../../../models/Pessoas/Fornecedor';
import { FornecedorSchema } from './FornecedorSchema';
import { TIPO_PESSOA } from '../../../../models/Pessoas/Pessoa';
import GeralForm from './components/GeralForm';
import { errorBack } from '../../../../utils/MessageApi';

const FormFornecedor: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {


    const [fornecedor] = useState<Fornecedor>({
        apelido: "",
        bairro: "",
        cep: "",
        complemento: "",
        cpfcpnj: "",
        dataNascimento: undefined,
        email: "",
        endereco: "",
        id: "",
        nacionalidade: "",
        nome: "",
        observacoes: "",
        rgInscricaoEstadual: "",
        telefone: "",
        tipo: TIPO_PESSOA.Juridica
    })
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getFornecedor();
    }, [props.match.params.id])


    async function onSubmit() {

    }

    async function getFornecedor() {
        try {


        } catch (e) {
            errorBack(null, e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/fornecedor"
            breadcrumbList={[{ displayName: "Fornecedores", URL: "/fornecedor" }, { displayName:props.match.params.id ? "Edição do Fornecedor" : "Novo Fornecedor", URL: undefined }]}
            initialValues={fornecedor}
            validationSchema={FornecedorSchema}
            onSubmit={onSubmit}
        >

            <GeralForm></GeralForm>

        </CrudFormLayout>
    );

}

export default FormFornecedor;
