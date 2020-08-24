import React from 'react'
import DetalhesOS from './components/DetalhesOS'
import { Collapse } from 'antd'
import SelecaoProdutosServicos from './components/SelecaoProdutosServicos';
import { useField } from 'formik';
import { useState } from 'react';
import { useEffect } from 'react';
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
            </Panel>
        </Collapse>
    )
}

export default GeralForm
