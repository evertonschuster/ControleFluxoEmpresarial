import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import { Fornecedor } from '../../../../models/Pessoas/Fornecedor';
import { FornecedorSchema } from './FornecedorSchema';
import GeralForm from './components/GeralForm';
import { errorBack } from '../../../../utils/MessageApi';
import { FormikHelpers } from 'formik';
import { FornecedorApi } from '../../../../apis/Pessoas/Fornecedor.Api';
import { TIPO_PESSOA } from '../../../../models/Pessoas/Pessoa';

const FormFornecedor: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {

    const [fornecedor, setFornecedor] = useState<Fornecedor>({
        apelido: "",
        bairro: "",
        cep: "",
        complemento: "",
        contato: "",
        cpfcpnj: "",
        email: "",
        endereco: "",
        id: undefined,
        limiteCredito: undefined,
        nome: "",
        numero: "",
        observacao: "",
        rgInscricaoEstadual: "",
        telefone: "",
        tipo: TIPO_PESSOA.Juridica,
        cidadeId: undefined,
        condicaoPagamentoId: undefined
    })
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        getFornecedor(props.match.params.id);
    }, [props.match.params.id])


    async function onSubmit(fornecedor: Fornecedor, formikHelpers: FormikHelpers<Fornecedor>) {
        try {
            if (props.match.params.id) {
                await FornecedorApi.Update(fornecedor);
            } else {
                await FornecedorApi.Save(fornecedor);
            }
            props.history.push("/fornecedor")
        }
        catch (e) {
            errorBack(formikHelpers, e);
        }
    }

    async function getFornecedor(id: number) {
        try {
            if (!id) {
                return;
            }

            setLoading(true);
            let bdpais = await FornecedorApi.GetById(id);
            setFornecedor(bdpais.data);
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
            breadcrumbList={[{ displayName: "Fornecedores", URL: "/fornecedor" }, { displayName: props.match.params.id ? "Edição do Fornecedor" : "Novo Fornecedor", URL: undefined }]}
            initialValues={fornecedor}
            validationSchema={FornecedorSchema}
            onSubmit={onSubmit}
        >

            <GeralForm></GeralForm>

        </CrudFormLayout>
    );

}

export default FormFornecedor;
