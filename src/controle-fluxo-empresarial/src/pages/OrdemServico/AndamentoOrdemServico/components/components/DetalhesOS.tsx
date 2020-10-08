import React from 'react'
import { Row, Col } from 'antd'
import { Input, TextArea } from '../../../../../components/WithFormItem/withFormItem'
import SelectModelOne from '../../../../../components/SelectModel/SelectModelOne'
import { ClienteApi } from '../../../../../apis/Pessoas/ClienteApi'
import InputTelefone from '../../../../../components/InputTelefone/InputTelefone'


const DetalhesOS: React.FC = () => {
    

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
                        disabled
                        path="cliente" />
                </Col>
                <Col span={4}>
                    <InputTelefone name="telefone" label="Telefone" required placeholder="(45) 988293328" disabled />
                </Col>
                <Col span={5}>
                    <Input name="contato" label="Contato" disabled />
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
                    <TextArea name="descricaoEquipamento" label="Equipamento" required rows={4} disabled />
                </Col>

                <Col span={12}>
                    <TextArea name="descricaoProblemaRelatado" label="Problema Relatado" required rows={4} disabled />
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <TextArea name="descricaoAcessorio" label="Acessórios" required rows={4} disabled />
                </Col>

                <Col span={12}>
                    <TextArea name="descricaoObservacao" label="Observacões OS" required rows={4} disabled />
                </Col>
            </Row>
        </>
    )
}

export default DetalhesOS
