import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import { ClienteSchema } from './ClienteSchema';
import { Cliente } from '../../../../models/Pessoas/Cliente';
import { TIPO_PESSOA } from '../../../../models/Pessoas/Pessoa';
import GeralForm from './components/GeralForm';
import { errorBack } from '../../../../utils/MessageApi';
import { NATIONALITY_TYPE } from '../../../../components/NationalitySelect/NationalitySelect';
import { FormikHelpers } from 'formik';
import { ClienteApi } from '../../../../apis/Pessoas/ClienteApi';

const FormCliente: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {

    const [cliente, setCliente] = useState<Cliente>({
        apelido: "",
        isBrasileiro: true,
        bairro: "",
        cep: "",
        complemento: "",
        cpfcpnj: "",
        dataNascimento: undefined,
        email: "",
        endereco: "",
        estadoCivil: undefined,
        id: undefined,
        limiteCredito: undefined,
        nacionalidade: NATIONALITY_TYPE.BRASILEIRO,
        nome: "",
        observacao: "",
        rgInscricaoEstadual: "",
        sexo: undefined,
        telefone: "",
        tipo: TIPO_PESSOA.Fisica,
        cidadeId: undefined,
        condicaoPagamentoId: undefined,
        numero: ""
    })
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getCliente(props.match.params.id);
    }, [props.match.params.id])


    async function onSubmit(cliente: Cliente, formikHelpers: FormikHelpers<Cliente>) {
        try {
            if (props.match.params.id) {
                await ClienteApi.Update(cliente);
            } else {
                await ClienteApi.Save(cliente);
            }
            props.history.push("/cliente")
        }
        catch (e) {
            errorBack(formikHelpers, e);
        }
    }

    async function getCliente(id: number) {
        try {
            if (!id) {
                return;
            }

            setLoading(true);
            let bdpais = await ClienteApi.GetById(id);
            setCliente(bdpais.data);
        } catch (e) {
            errorBack(null, e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/cliente"
            breadcrumbList={[{ displayName: "Clientes", URL: "/cliente" }, { displayName: props.match.params.id ? "Edição do Cliente" : "Novo Cliente", URL: undefined }]}
            initialValues={cliente}
            validationSchema={ClienteSchema}
            onSubmit={onSubmit}
        >

            <GeralForm></GeralForm>

        </CrudFormLayout>
    );

}

export default FormCliente;
