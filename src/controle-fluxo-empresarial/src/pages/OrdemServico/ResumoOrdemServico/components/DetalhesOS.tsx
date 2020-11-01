import React from 'react'
import { ClienteApi } from '../../../../apis/Pessoas/ClienteApi'
import { Input, TextArea } from '../../../../components/WithFormItem/withFormItem'
import { Row, Col } from 'antd'
import InputTelefone from '../../../../components/InputTelefone/InputTelefone'
import SelectModelOne from '../../../../components/SelectModel/SelectModelOne'
import { EquipamentoApi } from '../../../../apis/Movimentos/EquipamentoApi'
import { ProblemaRelatadoApi } from '../../../../apis/Movimentos/ProblemaRelatadoApi'


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
                <Col span={9}>
                    <SelectModelOne
                        fetchMethod={EquipamentoApi.GetById.bind(EquipamentoApi)}
                        disabled
                        name="equipamentoId"
                        keyDescription="nome"
                        objectName="equipamento"
                        required={true}
                        label={{ title: "Seleção de Equipamento", label: "Equipamento" }}
                        errorMessage={{ noSelection: "Selecione um Equipamento!" }}
                        path="equipamentos" />
                </Col>

                <Col span={15}>
                    <TextArea name="descricaoAcessorio" label="Acessórios" required rows={4} disabled />
                </Col>
            </Row>
            <Row>
                <Col span={9}>
                    <SelectModelOne
                        fetchMethod={ProblemaRelatadoApi.GetById.bind(ProblemaRelatadoApi)}
                        name="problemaRelatadoId"
                        keyDescription="nome"
                        disabled
                        objectName="problemaRelatado"
                        required={true}
                        label={{ title: "Seleção de Problema Relatado", label: "Problema Relatado" }}
                        errorMessage={{ noSelection: "Selecione um Problema Relatado!" }}
                        path="problemas-relatado" />
                </Col>

                <Col span={15}>
                    <TextArea name="descricaoObservacao" label="Observacões" rows={4} disabled />
                </Col>
            </Row>
        </>
    )
}

export default DetalhesOS
