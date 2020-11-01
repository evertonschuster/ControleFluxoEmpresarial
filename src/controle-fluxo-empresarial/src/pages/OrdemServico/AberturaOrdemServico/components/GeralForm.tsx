import React, { useEffect } from 'react'
import { Cliente } from '../../../../models/Pessoas/Cliente'
import { ClienteApi } from '../../../../apis/Pessoas/ClienteApi'
import { Input, TextArea } from '../../../../components/WithFormItem/withFormItem'
import { Row, Col } from 'antd'
import { useField } from 'formik';
import InputTelefone from '../../../../components/InputTelefone/InputTelefone'
import SelectModelOne from '../../../../components/SelectModel/SelectModelOne'
import Separator from '../../../../components/Separator/Separator'
import { EquipamentoApi } from '../../../../apis/Movimentos/EquipamentoApi'
import { ProblemaRelatadoApi } from '../../../../apis/Movimentos/ProblemaRelatadoApi'

const GeralForm: React.FC = () => {

    const [{ value: cliente }] = useField<Cliente>("cliente")
    const [, , { setValue: setContato }] = useField<string>("contato")
    const [, , { setValue: setTelefone }] = useField<string>("telefone")

    useEffect(() => {
        if (cliente) {
            setContato(cliente.apelido?.length! > 1 ? cliente.apelido! : cliente.nome!);
            setTelefone(cliente.telefone!);
        }
        else {
            setContato("");
            setTelefone("");
        }
    }, [cliente])

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
                        objectName="cliente"
                        required={true}
                        label={{ title: "Seleção de Cliente", label: "Cliente" }}
                        errorMessage={{ noSelection: "Selecione um Cliente!" }}
                        path="cliente" />
                </Col>
                <Col span={4}>
                    <InputTelefone name="telefone" label="Telefone" required placeholder="" disabled />
                </Col>
                <Col span={5}>
                    <Input name="contato" label="Contato" disabled />
                </Col>

                <Col span={3}>
                    <Input name="numeroSerie" label="Número de série" />
                </Col>

                <Col span={3}>
                    <Input name="dataAbertura" label="Data Abertura" disabled />
                </Col>
            </Row>

            <Separator />

            <Row>
                <Col span={9}>
                    <SelectModelOne
                        fetchMethod={EquipamentoApi.GetById.bind(EquipamentoApi)}
                        name="equipamentoId"
                        keyDescription="nome"
                        objectName="equipamento"
                        required={true}
                        label={{ title: "Seleção de Equipamento", label: "Equipamento" }}
                        errorMessage={{ noSelection: "Selecione um Equipamento!" }}
                        path="equipamentos" />
                </Col>

                <Col span={15}>
                    <TextArea name="descricaoAcessorio" label="Acessórios" required rows={4} />
                </Col>
            </Row>
            <Row>
                <Col span={9}>
                    <SelectModelOne
                        fetchMethod={ProblemaRelatadoApi.GetById.bind(ProblemaRelatadoApi)}
                        name="problemaRelatadoId"
                        keyDescription="nome"
                        objectName="problemaRelatado"
                        required={true}
                        label={{ title: "Seleção de Problema Relatado", label: "Problema Relatado" }}
                        errorMessage={{ noSelection: "Selecione um Problema Relatado!" }}
                        path="problemas-relatado" />
                </Col>

                <Col span={15}>
                    <TextArea name="descricaoObservacao" label="Observacões" rows={4} />
                </Col>
            </Row>
        </>
    )
}

export default GeralForm
