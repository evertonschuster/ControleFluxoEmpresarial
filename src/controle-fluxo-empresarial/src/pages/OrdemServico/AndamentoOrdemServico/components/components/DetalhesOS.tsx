import React, { useState } from 'react'
import { Row, Col, Button, Modal } from 'antd'
import { Input, TextArea } from '../../../../../components/WithFormItem/withFormItem'
import SelectModelOne from '../../../../../components/SelectModel/SelectModelOne'
import { ClienteApi } from '../../../../../apis/Pessoas/ClienteApi'
import InputTelefone from '../../../../../components/InputTelefone/InputTelefone'
import { EquipamentoApi } from '../../../../../apis/Movimentos/EquipamentoApi'
import { ProblemaRelatadoApi } from '../../../../../apis/Movimentos/ProblemaRelatadoApi'
import { useField } from 'formik';
import { ItemFormRender } from '../../../../../hoc/WithFormItem'
import RouterServiceModel from '../../../../../services/RouterService/RouterServiceModel'
import { FormMode } from '../../../../../layouts/BasicLayout/BasicLayoutContext'


const DetalhesOS: React.FC = () => {

    const [{ value: ordemServicoId }] = useField("ordemServicoId");
    const [showModal, setshowModal] = useState(false)

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

                <Col span={3} hidden={!ordemServicoId}>
                    <ItemFormRender label={`Garantia da OS ${ordemServicoId}`}>
                        <Button onClick={() => setshowModal(true)}>Ve OS</Button>
                    </ItemFormRender>
                </Col>
            </Row>

            <Row>
                <Col span={9}>
                    <SelectModelOne
                        fetchMethod={EquipamentoApi.GetById.bind(EquipamentoApi)}
                        name="equipamentoId"
                        keyDescription="nome"
                        objectName="equipamento"
                        required={true}
                        disabled
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
                        disabled
                        keyDescription="nome"
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

            <Modal
                wrapClassName="modal-wrap"
                title="Ordem de Serviço"
                className="moda-container"
                width="95%"
                style={{ top: 10, }}
                cancelButtonProps={{ hidden: true }}
                visible={showModal}
                onOk={() => setshowModal(false)}
                onCancel={() => setshowModal(false)}
                destroyOnClose={true}>
                <RouterServiceModel path={`ordem-servico/view/${ordemServicoId}`} setState={() => { }} formMode={FormMode.List} />

            </Modal>
        </>
    )
}

export default DetalhesOS
