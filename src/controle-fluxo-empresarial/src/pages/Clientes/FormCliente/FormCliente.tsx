import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Row, Col, Select as SelectAntd } from 'antd';
import { Input, Select, DatePicker } from '../../../components/WithFormItem/withFormItem';
import CrudFormLayout from '../../../layouts/CrudFormLayout/CrudFormLayout';
import { ClienteSchema } from './ClienteSchema';
import { Cliente } from '../../../models/Clientes/Cliente';

const FromCliente: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {


    const [cliente] = useState<Cliente>({ nome: "" })
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

            <Row>
                <Col span={2}>
                    <Input name="id" label="Codigo" placeholder="Codigo" readOnly />
                </Col>

                <Col span={8}>
                    <Input name="nome" label="Cliente" placeholder="Cliente" required />
                </Col>

                <Col span={4}>
                    <Input name="rg" label="RG" placeholder="99.999.999-X" required />
                </Col>

                <Col span={4}>
                    <Input name="cpf" label="CPF" placeholder="000.000.000-00" required />
                </Col>

                <Col span={4}>
                    <Select name="sexo" label="Sexo" placeholder="Masculino" required >
                        <SelectAntd.Option key="Masculino" value="Masculino">Masculino.</SelectAntd.Option>
                        <SelectAntd.Option key="Feminino" value="Feminino">Feminino.</SelectAntd.Option>
                        <SelectAntd.Option key="Outros" value="Outros">Outros.</SelectAntd.Option>
                    </Select>
                </Col>

                <Col span={4}>
                    <Select name="estadoCivil" label="Estado Civíl" placeholder="Solteiro(a)" required >
                        <SelectAntd.Option key="Casado" value="Casado">Casado(a).</SelectAntd.Option>
                        <SelectAntd.Option key="Divorciado" value="Divorciado">Divorciado(a).</SelectAntd.Option>
                        <SelectAntd.Option key="Separadoo" value="Separado">Separado(a).</SelectAntd.Option>
                        <SelectAntd.Option key="Solteiro" value="Solteiro">Solteiro(a).</SelectAntd.Option>
                        <SelectAntd.Option key="Viuvo" value="Viuvo">Viúvo(a).</SelectAntd.Option>
                        <SelectAntd.Option key="Outros" value="Outros">Outros.</SelectAntd.Option>
                    </Select>
                </Col>

                <Col span={4}>
                    <DatePicker name="dataNascimento" label="Data Nascimento" placeholder="01/01/2001" required format="DD/MM/yyyy" />
                </Col>

                <Col span={4}>
                    <Input name="nascionalidade" label="Nascionalidade" placeholder="Brasileiro." required />
                </Col>

                <Col span={4}>
                    <Input name="nascionalidade" label="Nascionalidade" placeholder="Brasileiro." required />
                </Col>
            </Row>

        </CrudFormLayout>
    );

}

export default FromCliente;
