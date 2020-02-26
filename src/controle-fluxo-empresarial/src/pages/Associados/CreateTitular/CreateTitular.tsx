import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Row, Col, Divider } from 'antd';
import { FormikHelpers } from 'formik';
import { errorBack } from '../../../utils/MessageApi';
import CrudFormLayout from '../../../layouts/CrudFormLayout/CrudFormLayout';
import { UpdateTitular, SaveTitular, GetTitularById } from '../../../apis/Associados/AssociadoApi';
import { TitularSchema } from './TitularSchema';
import { Input, DatePicker } from '../../../components/WithFormItem/withFormItem';
import { Titular } from '../../../models/Associados/Titular';
import Dependente from './Components/Dependente';

const CreateTitular: React.FC<RouteComponentProps<any>> = (props) => {


    const [titular, setTitular] = useState<Titular>({
        nome: "",
        rg: "",
        telefone: "",
        cpf: "",
        email: "",
        cep: "",
        bairro: "",
        endereco: "",
        numero: "",

        dependentes: []
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getTitular(props.match.params.id);
    }, [props.match.params.id])


    async function onSubmit(values: Titular, formikHelpers: FormikHelpers<any>) {

        try {

            if (props.match.params.id) {
                await UpdateTitular(values);
            } else {
                await SaveTitular(values);
            }

            props.history.push("/Titular")
        } catch (e) {
            errorBack(formikHelpers, e, ["nome"]);
        }
    }

    async function getTitular(id: number) {
        if (!id) {
            return;
        }

        try {
            setLoading(true);
            let bdestado = await GetTitularById(id);
            setTitular(bdestado.data);
        }
        finally {
            setLoading(false);
        }
    }


    return (
        <CrudFormLayout
            isLoading={loading}
            backPath="/titular"
            breadcrumbList={[{ displayName: "Titular", URL: "/Titular" }, { displayName: "Novo Titular", URL: undefined }]}
            initialValues={titular}
            validationSchema={TitularSchema}
            onSubmit={onSubmit}
        >
            <Row>
                <Col span={2}>
                    <Input name="id" label="Id" readOnly />
                </Col>
                <Col span={8}>
                    <Input name="nome" label="Nome" placeholder="João" required />
                </Col>
                <Col span={4}>
                    <Input name="cpf" label="CPF" placeholder="000.000.000-00" required />
                </Col>
                <Col span={4}>
                    <Input name="rg" label="Rg" placeholder="0.000.000.0" required />
                </Col>
                <Col span={3}>
                    <Input name="telefone" label="Telefone" placeholder="(45)988293328" />
                </Col>
                <Col span={3}>
                    <DatePicker name="dataNascimento" label="Data de Nascimento" placeholder="10/10/2010" />
                </Col>
            </Row>

            <Row>
                <Col span={2}>
                    <Input name="cep" label="CEP" placeholder="85890-000" />
                </Col>
                <Col span={6}>
                    <Input name="bairro" label="Bairro" placeholder="São João" />
                </Col>
                <Col span={8}>
                    <Input name="endereco" label="Endereço" placeholder="av. das coisas" />
                </Col>
                <Col span={2}>
                    <Input name="numero" label="Numero" placeholder="011" />
                </Col>
                <Col span={6}>
                    <Input name="email" label="Email" placeholder="joao@gmail.com" />
                </Col>
            </Row>


            <Divider dashed >Dependentes</Divider>

            <Dependente />
        </CrudFormLayout>
    );

}

export default CreateTitular;
