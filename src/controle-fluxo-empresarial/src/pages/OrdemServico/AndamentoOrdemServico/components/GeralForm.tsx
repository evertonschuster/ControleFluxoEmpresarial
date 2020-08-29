import React from 'react'
import DetalhesOS from './components/DetalhesOS'
import { Collapse, Row, Col } from 'antd'
import SelecaoProdutosServicos from './components/SelecaoProdutosServicos';
import { useField } from 'formik';
import { useState } from 'react';
import { useEffect } from 'react';
import { TextArea, Input } from '../../../../components/WithFormItem/withFormItem';
import Separator from '../../../../components/Separator/Separator';
const { Panel } = Collapse;

const GeralForm: React.FC = () => {
    const [{ value: dataInicio }] = useField("dataInicio");
    const [activeKey, setActiveKey] = useState<string | string[]>([])

    useEffect(() => {
        refleshOpenedCollapse()
    }, [dataInicio])

    const refleshOpenedCollapse = () => {
        let collapse = [];

        if (dataInicio) {
            collapse.push("produtosServicos")
        } else {
            collapse.push("detalhesOS")
        }

        setActiveKey(collapse);
    }

    function onChangeActiveCollapse(key: string | string[]) {
        setActiveKey(key)
    }

    return (
        <Collapse activeKey={activeKey} onChange={onChangeActiveCollapse}  >
            <Panel header="Descrição da Ordem de Serviço" key="detalhesOS">
                <DetalhesOS />
            </Panel>
            <Panel header="Produtos e Serviço" key="produtosServicos" disabled={!dataInicio}>
                <SelecaoProdutosServicos />

                <Separator />

                <Row>
                    <Col span={12} >
                        <TextArea name="descricaoOrdemServico" label="Descrição do Técnico" rows={3} />
                    </Col>
                    <Col span={12} >
                        <TextArea name="observacaoTecnico" label="Observações do Técnico" rows={3} />
                    </Col>
                </Row>

                <Row>
                <Col span={3} push={21}>
                    <Input name="totalOS" label="Total OS" disabled/>
                </Col>
            </Row>
            </Panel>
        </Collapse>
    )
}

export default GeralForm
