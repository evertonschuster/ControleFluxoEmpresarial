import React from 'react'
import { Row, Col, Select as SelectAntd } from 'antd';
import { Input, Select, DatePicker, InputNumber } from '../../../../../components/WithFormItem/withFormItem';
import SelectModelOne from '../../../../../components/SelectModel/SelectModelOne';
import { GetFuncaoFuncionarioById } from '../../../../../apis/Pessoas/FuncaoFuncionarioApi';

const GeralForm: React.FC = () => {


    return (
        <>

            <Row>
                <Col span={2}>
                    <Input name="id" label="Código" placeholder="Codigo" readOnly />
                </Col>

                <Col span={7}>
                    <Input name="nome" label="Nome" placeholder="João da silva" required />
                </Col>

                <Col span={7}>
                    <Input name="apelido" label="Apelido" placeholder="João" />
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
            </Row>


            <Row>
                <Col span={5}>
                    <Input name="endereco" label="Endereço" placeholder="Av das americas." required />
                </Col>

                <Col span={3}>
                    <InputNumber name="numero" label="Número" placeholder="549" required />
                </Col>

                <Col span={5}>
                    <Input name="complemento" label="Complemento" placeholder="" />
                </Col>

                <Col span={5}>
                    <Input name="bairro" label="Bairro" placeholder="Jardim Horizonte." required />
                </Col>

                <Col span={3}>
                    <Input name="cep" label="CEP" placeholder="85890-000" required />
                </Col>
            </Row>

            <Row>
                <Col span={4}>
                    <Input name="telefone" label="Telefone" placeholder="(45)988293328" required />
                </Col>

                <Col span={5}>
                    <Input name="email" label="Email" placeholder="joao@gmail.com" required />
                </Col>

                <Col span={3} >
                    <Select name="sexo" label="Sexo" placeholder="Masculino" required >
                        <SelectAntd.Option key="Masculino" value="Masculino">Masculino.</SelectAntd.Option>
                        <SelectAntd.Option key="Feminino" value="Feminino">Feminino.</SelectAntd.Option>
                        <SelectAntd.Option key="Outros" value="Outros">Outros.</SelectAntd.Option>
                    </Select>
                </Col>

                <Col span={4} >
                    <Input name="nacionalidade" label="Nacionalidade" placeholder="Brasileiro." required />
                </Col>

                <Col span={3} >
                    <DatePicker name="dataNascimento" label="Data Nascimento" placeholder="01/01/2001" required format="DD/MM/yyyy" />
                </Col>
            </Row>

            <Row>
                <Col span={4}>
                    <Input name="rgInscricaoEstadual" label="RG" placeholder="99.999.999-X" required />
                </Col>

                <Col span={4}>
                    <Input name="cPFCPNJ" label="CPF" placeholder="000.000.000-00" />
                </Col>

                <Col span={3}>
                    <Input name="cnh" label="CNH" placeholder="999999999" />
                </Col>

                <Col span={6}>
                    <SelectModelOne
                        fetchMethod={GetFuncaoFuncionarioById}
                        name="funcaoFuncionarioId"
                        keyDescription="FuncaoFuncionario"
                        required={true}
                        label={{ title: "Seleção da Função Funcionário", label: "Função Funcionário" }}
                        errorMessage={{ noSelection: "Selecione uma Função Funcionário!" }}
                        path="funcao-funcionario" />
                </Col>
            </Row>
        </>
    )
}

export default GeralForm
