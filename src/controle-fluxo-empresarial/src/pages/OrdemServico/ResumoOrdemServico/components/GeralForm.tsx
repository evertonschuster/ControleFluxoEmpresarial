import { Col, Collapse, Row } from 'antd';
import { OrdemServicoProduto, OrdemServicoServico } from '../../../../models/OrdemServicos/OrdemServicoItem';
import { TextArea } from '../../../../components/WithFormItem/withFormItem';
import { useField } from 'formik';
import CondicaoPagamento from './CondicaoPagamento';
import DetalhesOS from '../../AndamentoOrdemServico/components/components/DetalhesOS';
import InputDecimal from '../../../../components/InputDecimal/InputDecimal';
import React, { useEffect, useState } from 'react'
import SelecaoProdutosServicos from './ProdutosServicos';
import Separator from '../../../../components/Separator/Separator';

const { Panel } = Collapse;

const GeralForm: React.FC = () => {
    const [{ value: produtos }] = useField<OrdemServicoProduto[]>("produtos");
    const [{ value: servicos }] = useField<OrdemServicoServico[]>("servicos");
    const [, , { setValue: setTotalOS }] = useField<number>("totalOS");

    const [activeKey, setActiveKey] = useState<string | string[]>(["detalhesOS", "produtosServicos", "ContasReceber"])


    useEffect(() => {
        let total = 0;
        total += produtos.reduce((a, e) => a + (e.quantidade! * e.produto?.valorVenda!), 0);
        total += servicos.reduce((a, e) => a + (e.quantidade! * e.servico?.valor!), 0);

        setTotalOS(total);

    }, [produtos, servicos])


    function onChangeActiveCollapse(key: string | string[]) {
        setActiveKey(key)
    }

    return (
        <Collapse activeKey={activeKey} onChange={onChangeActiveCollapse}  >
            <Panel header="Descrição da Ordem de Serviço" key="detalhesOS">
                <DetalhesOS />
            </Panel>
            <Panel header="Produtos e Serviço" key="produtosServicos" >

                <SelecaoProdutosServicos />
                <Separator />

                <Row>
                    <Col span={12} >
                        <TextArea name="descricaoTecnico" label="Descrição do Técnico" rows={3} disabled />
                    </Col>
                    <Col span={12} >
                        <TextArea name="descricaoObservacaoTecnico" label="Observações do Técnico" rows={3} disabled />
                    </Col>
                </Row>

                <Row>
                    <Col span={3} push={21}>
                        <InputDecimal name="totalOS" label="Total OS" disabled placeholder="" />
                    </Col>
                </Row>
            </Panel>
            <Panel header="Contas a Receber" key="ContasReceber" >
                <CondicaoPagamento />
            </Panel>
        </Collapse>
    )
}

export default GeralForm
