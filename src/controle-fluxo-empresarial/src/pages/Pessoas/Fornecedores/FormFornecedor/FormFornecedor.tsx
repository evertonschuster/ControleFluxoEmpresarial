import React, { useState, useEffect } from 'react';
import { errorBack } from '../../../../utils/MessageApi';
import { FormikHelpers } from 'formik';
import { Fornecedor } from '../../../../models/Pessoas/Fornecedor';
import { FornecedorApi } from '../../../../apis/Pessoas/Fornecedor.Api';
import { FornecedorSchema } from './FornecedorSchema';
import { RouteComponentProps } from 'react-router-dom';
import { TIPO_PESSOA } from '../../../../models/Pessoas/Pessoa';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import GeralForm from './components/GeralForm';

const FormFornecedor: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {

    const [fornecedor, setFornecedor] = useState<Fornecedor>({
        apelido: undefined,
        bairro: undefined,
        cep: undefined,
        complemento: undefined,
        contato: undefined,
        cpfcpnj: undefined,
        email: undefined,
        endereco: undefined,
        id: undefined,
        limiteCredito: undefined,
        nome: undefined,
        numero: undefined,
        observacao: undefined,
        rgInscricaoEstadual: undefined,
        telefone: undefined,
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
            let bdFornecedor = await FornecedorApi.GetById(id);
            setFornecedor(bdFornecedor.data);
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
