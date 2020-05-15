import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Row, Col, Select as SelectAntd } from 'antd';
import { Input, Select, DatePicker } from '../../../../components/WithFormItem/withFormItem';
import CrudFormLayout from '../../../../layouts/CrudFormLayout/CrudFormLayout';
import { FuncionarioSchema } from './FuncionarioSchema';
import { Funcionario } from '../../../../models/Pessoas/Funcionario';

const FormFuncionario: React.FC<RouteComponentProps & RouteComponentProps<any>> = (props) => {


    const [funcionario] = useState<Funcionario>({ nome: "" })
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

            <Row>
                <Col span={2}>
                    <Input name="id" label="Codigo" placeholder="Codigo" readOnly />
                </Col>

                <Col span={8}>
                    <Input name="nome" label="Funcionario" placeholder="Funcionario" required />
                </Col>

                <Col span={4}>
                    <Input name="rg" label="RG" placeholder="99.999.999-X" required />
                </Col>

                <Col span={4}>
                    <Input name="cpf" label="CPF" placeholder="000.000.000-00" required />
                </Col>

                <Col span={3}>
                    <Select name="sexo" label="Sexo" placeholder="Masculino" required >
                        <SelectAntd.Option key="Masculino" value="Masculino">Masculino.</SelectAntd.Option>
                        <SelectAntd.Option key="Feminino" value="Feminino">Feminino.</SelectAntd.Option>
                        <SelectAntd.Option key="Outros" value="Outros">Outros.</SelectAntd.Option>
                    </Select>
                </Col>

                <Col span={3}>
                    <Select name="estadoCivil" label="Estado Civíl" placeholder="Solteiro(a)" required >
                        <SelectAntd.Option key="Casado" value="Casado">Casado(a).</SelectAntd.Option>
                        <SelectAntd.Option key="Divorciado" value="Divorciado">Divorciado(a).</SelectAntd.Option>
                        <SelectAntd.Option key="Separadoo" value="Separado">Separado(a).</SelectAntd.Option>
                        <SelectAntd.Option key="Solteiro" value="Solteiro">Solteiro(a).</SelectAntd.Option>
                        <SelectAntd.Option key="Viuvo" value="Viuvo">Viúvo(a).</SelectAntd.Option>
                        <SelectAntd.Option key="Outros" value="Outros">Outros.</SelectAntd.Option>
                    </Select>
                </Col>

                <Col span={3}>
                    <DatePicker name="dataNascimento" label="Data Nascimento" placeholder="01/01/2001" required format="DD/MM/yyyy" />
                </Col>

                <Col span={4}>
                    <Input name="nascionalidade" label="Nascionalidade" placeholder="Brasileiro." required />
                </Col>

                <Col span={4}>
                    <Input name="telefone" label="Telefone" placeholder="(45)988293328." required />
                </Col>

                <Col span={5}>
                    <Input name="email" label="Email" placeholder="joao@gmail.com" required />
                </Col>

            </Row>

            <Row>
                <Col span={5}>
                    <Input name="cep" label="CEP" placeholder="85890-000" required />
                </Col>

                <Col span={5}>
                    <Input name="bairro" label="Bairro" placeholder="Jardim Horizonte." required />
                </Col>

                <Col span={5}>
                    <Input name="endereco" label="Endereço" placeholder="Av das americas." required />
                </Col>

                <Col span={5}>
                    <Input name="numero" label="Número" placeholder="549" required />
                </Col>

                <Col span={5}>
                    <Input name="complemento" label="Complemento" placeholder="" required />
                </Col>

                <Col span={5}>
                    <Input name="cargo" label="Cargo" placeholder="" required />
                </Col>

                <Col span={5}>
                    <Input name="cnh" label="CNH" placeholder="" required />
                </Col>
                
            </Row>

        </CrudFormLayout>
    );

}

export default FormFuncionario;
