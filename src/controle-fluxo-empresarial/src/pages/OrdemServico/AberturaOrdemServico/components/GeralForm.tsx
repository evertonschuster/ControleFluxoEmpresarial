import React, { useEffect } from 'react'
import { Cliente } from '../../../../models/Pessoas/Cliente'
import { ClienteApi } from '../../../../apis/Pessoas/ClienteApi'
import { Input, Switch, TextArea } from '../../../../components/WithFormItem/withFormItem'
import { Row, Col } from 'antd'
import { useField } from 'formik';
import InputTelefone from '../../../../components/InputTelefone/InputTelefone'
import SelectModelOne from '../../../../components/SelectModel/SelectModelOne'
import Separator from '../../../../components/Separator/Separator'
import { EquipamentoApi } from '../../../../apis/Movimentos/EquipamentoApi'
import { ProblemaRelatadoApi } from '../../../../apis/Movimentos/ProblemaRelatadoApi'
import { OrdemServicoApi } from '../../../../apis/OrdemServicos/OrdemServico'
import OrdemServico from './../../../../models/OrdemServicos/OrdemServico';

const GeralForm: React.FC = () => {

    const [{ value: cliente }, , { setValue: setCliente }] = useField<Cliente>("cliente")
    const [, , { setValue: setClienteId }] = useField<number>("clienteId")
    const [, , { setValue: setEquipamentoId }] = useField<number>("equipamentoId")
    const [, , { setValue: setProblemaRelatadoId }] = useField<number>("problemaRelatadoId")
    const [, , { setValue: setDescricaoAcessorio }] = useField<string>("descricaoAcessorio")
    const [, , { setValue: setDescricaoObservacao }] = useField<string>("descricaoObservacao")
    const [, , { setValue: setContato }] = useField<string>("contato")
    const [, , { setValue: setTelefone }] = useField<string>("telefone")
    const [{ value: garantia }] = useField<boolean>("garantia")
    const [{ value: ordemServico }] = useField<OrdemServico>("ordemServico")

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

    useEffect(() => {
        if (!ordemServico) {
            return;
        }
        setCliente(ordemServico.cliente!);
        setClienteId(ordemServico.clienteId!);
        setEquipamentoId(ordemServico.equipamentoId!);
        setProblemaRelatadoId(ordemServico.problemaRelatadoId!);

        setDescricaoAcessorio(ordemServico.descricaoAcessorio!);
        setDescricaoObservacao(ordemServico.descricaoObservacao!);

    }, [ordemServico])

    return (
        <>
            <Row>
                <Col span={2}>
                    <Switch name="garantia" label="Garantia?" unCheckedChildren="Normal" checkedChildren="Garantia" />
                </Col>

                {garantia && <Col span={3}>
                    <SelectModelOne
                        fetchMethod={(id) => OrdemServicoApi.getById(id.toString())}
                        name="ordemServicoId"
                        objectName="ordemServico"
                        keyDescription="nome"
                        showDescription={false}
                        required={true}
                        label={{ title: "Seleção de Ordem Serviço", label: "OS" }}
                        errorMessage={{ noSelection: "Selecione uma ordem de serviço!" }}
                        path="ordem-servico" />
                </Col>}
            </Row>
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
