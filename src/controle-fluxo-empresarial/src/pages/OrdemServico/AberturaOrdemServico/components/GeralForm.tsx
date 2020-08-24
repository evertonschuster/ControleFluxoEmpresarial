import React from 'react'
import { Row, Col } from 'antd'
import { Input, TextArea } from '../../../../components/WithFormItem/withFormItem'
import SelectModelOne from '../../../../components/SelectModel/SelectModelOne'
import { ClienteApi } from '../../../../apis/Pessoas/ClienteApi'
import InputTelefone from '../../../../components/InputTelefone/InputTelefone'

const GeralForm: React.FC = () => {
    return (
        <>
            <Row>
                <Col span={2}>
                    <Input name="id" label="Número OS" disabled />
                </Col>
                <Col span={7}>
                    <SelectModelOne
                        fetchMethod={ClienteApi.GetById.bind(ClienteApi)}
                        name="clienteId"
                        keyDescription="nome"
                        required={true}
                        label={{ title: "Seleção de Cliente", label: "Cliente" }}
                        errorMessage={{ noSelection: "Selecione um Cliente!" }}
                        path="cliente" />
                </Col>
                <Col span={4}>
                    <InputTelefone name="telefone" label="Telefone" required placeholder="(45) 988293328" />
                </Col>
                <Col span={5}>
                    <Input name="contato" label="Contato" />
                </Col>

                <Col span={3}>
                    <Input name="dataAbertura" label="Data Abertura" disabled />
                </Col>
                <Col span={3}>
                    <Input name="dataAprovacao" label="Data Aprovação" disabled />
                </Col>
            </Row>

            <Row>
                <Col span={12}>
                    <TextArea name="equipamento" label="Equipamento" required rows={4} />
                </Col>

                <Col span={12}>
                    <TextArea name="problemaRelatado" label="Problema Relatado" required rows={4} />
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <TextArea name="acessorios" label="Acessórios" required rows={4} />
                </Col>

                <Col span={12}>
                    <TextArea name="observacao" label="Observacões" required rows={4} />
                </Col>
            </Row>
        </>
    )
}

export default GeralForm
