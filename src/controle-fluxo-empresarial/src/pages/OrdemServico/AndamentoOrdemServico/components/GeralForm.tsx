import React from 'react'
import DetalhesOS from './components/DetalhesOS'
import { Collapse, Row, Col } from 'antd'
import SelecaoProdutosServicos from './components/SelecaoProdutosServicos';
import { useField } from 'formik';
import { useState } from 'react';
import { useEffect } from 'react';
import { TextArea } from '../../../../components/WithFormItem/withFormItem';
import Separator from '../../../../components/Separator/Separator';
import { OrdemServicoProduto, OrdemServicoServico } from '../../../../models/OrdemServicos/OrdemServicoItem';
import InputDecimal from '../../../../components/InputDecimal/InputDecimal';
import { Cliente } from './../../../../models/Pessoas/Cliente';
const { Panel } = Collapse;

const GeralForm: React.FC = () => {
    const [{ value: dataExecucao }] = useField("dataExecucao");
    const [{ value: produtos }] = useField<OrdemServicoProduto[]>("produtos");
    const [{ value: servicos }] = useField<OrdemServicoServico[]>("servicos");
    const [{ value: cliente }] = useField<Cliente>("cliente");
    const [{ value: condicaoPagamentoId }, , { setValue: setCondicaoPagamentoId }] = useField("condicaoPagamentoId");
    const [, , { setValue: setTotalOS }] = useField<number>("totalOS");

    const [activeKey, setActiveKey] = useState<string | string[]>([])

    useEffect(() => {
        refleshOpenedCollapse()
    }, [dataExecucao]);

    useEffect(() => {
        let total = 0;
        total += produtos.reduce((a, e) => a + (e.quantidade! * e.produto?.valorVenda!), 0);
        total += servicos.reduce((a, e) => a + (e.quantidade! * e.servico?.valor!), 0);

        setTotalOS(total);

    }, [produtos, servicos])

    useEffect(() => {
        if (cliente && !condicaoPagamentoId) {
            setCondicaoPagamentoId(cliente.condicaoPagamentoId!)
        }
    }, [cliente])

    const refleshOpenedCollapse = () => {
        let collapse = [];

        if (dataExecucao) {
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
            <Panel header="Produtos e Serviço" key="produtosServicos" disabled={!dataExecucao}>
                <SelecaoProdutosServicos />

                <Separator />

                <Row>
                    <Col span={12} >
                        <TextArea name="descricaoTecnico" label="Descrição do Técnico" rows={3} />
                    </Col>
                    <Col span={12} >
                        <TextArea name="descricaoObservacaoTecnico" label="Observações do Técnico" rows={3} />
                    </Col>
                </Row>

                <Row>
                    <Col span={3} push={21}>
                        <InputDecimal name="totalOS" label="Total OS" disabled placeholder="" />
                    </Col>
                </Row>
            </Panel>
        </Collapse>
    )
}

export default GeralForm
