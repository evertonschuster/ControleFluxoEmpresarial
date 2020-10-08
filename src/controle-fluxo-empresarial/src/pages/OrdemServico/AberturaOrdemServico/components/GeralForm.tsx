import React, { useEffect } from 'react'
import { Cliente } from '../../../../models/Pessoas/Cliente'
import { ClienteApi } from '../../../../apis/Pessoas/ClienteApi'
import { Input, TextArea } from '../../../../components/WithFormItem/withFormItem'
import { Row, Col } from 'antd'
import { useField } from 'formik';
import InputTelefone from '../../../../components/InputTelefone/InputTelefone'
import SelectModelOne from '../../../../components/SelectModel/SelectModelOne'
import Separator from '../../../../components/Separator/Separator'

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
                    <InputTelefone name="telefone" label="Telefone" required placeholder="(45) 988293328" />
                </Col>
                <Col span={5}>
                    <Input name="contato" label="Contato" />
                </Col>

                <Col span={3}>
                    <Input name="numeroSerie" label="Número de serie" />
                </Col>

                <Col span={3}>
                    <Input name="dataAbertura" label="Data Abertura" disabled />
                </Col>
            </Row>

            <Separator />

            <Row>
                <Col span={12}>
                    <TextArea name="descricaoEquipamento" label="Equipamento" required rows={4} />
                </Col>

                <Col span={12}>
                    <TextArea name="descricaoProblemaRelatado" label="Problema Relatado" required rows={4} />
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <TextArea name="descricaoAcessorio" label="Acessórios" required rows={4} />
                </Col>

                <Col span={12}>
                    <TextArea name="descricaoObservacao" label="Observacões" rows={4} />
                </Col>
            </Row>
        </>
    )
}

export default GeralForm
