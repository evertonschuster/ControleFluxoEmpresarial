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
import { DatePicker } from 'antd';
import { useRef } from 'react';
import { DatePickerProps } from 'formik-antd';

const FormCliente: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {

    const [cliente, setCliente] = useState<Cliente>({
        apelido: undefined,
        isBrasileiro: true,
        bairro: undefined,
        cep: undefined,
        complemento: undefined,
        cpfcpnj: undefined,
        dataNascimento: undefined,
        email: undefined,
        endereco: undefined,
        estadoCivil: undefined,
        id: undefined,
        limiteCredito: undefined,
        nacionalidade: NATIONALITY_TYPE.BRASILEIRO,
        nome: undefined,
        observacao: undefined,
        rgInscricaoEstadual: undefined,
        sexo: undefined,
        telefone: undefined,
        tipo: TIPO_PESSOA.Fisica,
        cidadeId: undefined,
        condicaoPagamentoId: undefined,
        numero: undefined
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

            <DatePicker
                format="DD.MM.YYYY"

            ></DatePicker>
            <GeralForm />

        </CrudFormLayout>
    );

}

export default FormCliente;
