import React, { useState, useEffect } from 'react'
import { CategoriaApi } from '../../../../../apis/Movimentos/CategoriaApi';
import { Input, TextArea } from '../../../../../components/WithFormItem/withFormItem';
import { MarcaApi } from '../../../../../apis/Movimentos/MarcaApi';
import { Row, Col } from 'antd';
import { UnidadeMedidaApi } from '../../../../../apis/Movimentos/UnidadeMedidaApi';
import { useDebouncedCallback } from '../../../../../hoc/useDebouncedCallback';
import { useField } from 'formik';
import InputDecimal from '../../../../../components/InputDecimal/InputDecimal';
import InputSituation from '../../../../../components/Situation/InputSituation/InputSituation';
import SelectModelOne from '../../../../../components/SelectModel/SelectModelOne';
import Separator from '../../../../../components/Separator/Separator';

const FormGeneral: React.FC = () => {

    const [, , helperPercentualLucro] = useField<number>("percentualLucro");
    const [, metaValorVenda, helperValorVenda] = useField<number>("valorVenda");
    const [, metaValorCompra] = useField<number>("valorCompra");
    const [valorVendaAtencao, setValorVendaAtencao] = useState(true);

    useEffect(() => {
        setValorVendaAtencao(metaValorCompra.value >= metaValorVenda.value);
    }, [metaValorCompra.value, metaValorVenda.value]);

    const calculeValorTaxa = useDebouncedCallback((value: number | string | undefined = 0) => {
        let valorVenda = value as number;
        let taxa = (valorVenda - metaValorCompra.value) / (metaValorCompra.value) * 100;
        helperPercentualLucro.setValue(taxa);
    }, 100)

    const calculeValorVenda = useDebouncedCallback((value: number | string | undefined = 0) => {
        let taxa = value as number;

        let valorVenda = metaValorCompra.value * ((taxa / 100) + 1);
        if (isNaN(valorVenda)) {
            return;
        }
        helperValorVenda.setValue(valorVenda);
    }, 100)

    return (
        <>
            <Row>
                <Col span={2}>
                    <Input name="id" label="Código" placeholder="Codigo" readOnly />
                </Col>

                <Col span={10}>
                    <Input name="nome" label="Produto" placeholder="Produto" required />
                </Col>

                <Col span={4}>
                    <SelectModelOne
                        fetchMethod={UnidadeMedidaApi.GetById.bind(UnidadeMedidaApi)}
                        name="unidadeMedidaId"
                        keyDescription="nome"
                        required={true}
                        idIsInt={false}
                        showDescription={false}
                        label={{ title: "Seleção de Unidade de Medida", label: "Unidade de Medida" }}
                        errorMessage={{ noSelection: "Selecione uma Unidade de Medida!" }}
                        path="unidade-medida" />
                </Col>

                <Col span={3}>
                    <Input name="codigoBarras" label="Codigo Barras" placeholder="Codigo Barras" />
                </Col>

                <Col span={3}>
                    <Input name="referencia" label="Referência" placeholder="Codigo" required />
                </Col>

                <Col span={2}>
                    <InputSituation name="situacao" />
                </Col>
            </Row>

            <Separator />

            <Row>
                <Col span={12}>
                    <TextArea name="descricao" label="Descrição" rows={4} />
                </Col>

                <Col span={12}>
                    <TextArea name="observacao" label="Observação" rows={4} />
                </Col>
            </Row>

            <Separator />
            
            <Row>
                <Col span={6}>
                    <SelectModelOne
                        fetchMethod={MarcaApi.GetById.bind(MarcaApi)}
                        name="marcaId"
                        keyDescription="nome"
                        required={true}
                        label={{ title: "Seleção de Marca", label: "Marca" }}
                        errorMessage={{ noSelection: "Selecione uma Marca!" }}
                        path="marca" />
                </Col>

                <Col span={6}>
                    <SelectModelOne
                        fetchMethod={CategoriaApi.GetById.bind(CategoriaApi)}
                        name="categoriaId"
                        keyDescription="nome"
                        required={true}
                        label={{ title: "Seleção de Categoria", label: "Categoria" }}
                        errorMessage={{ noSelection: "Selecione ao menos uma Categoria!" }}
                        path="categoria" />
                </Col>
            </Row>

            <Row>
                <Col span={3}>
                    <InputDecimal name="quantidadeMinima" label="Quantidade Mínima" placeholder="2" required />
                </Col>

                <Col span={3}>
                    <InputDecimal
                        name="valorCompra" label="Valor Compra" placeholder="10,20" required prefix="R$"/>
                </Col>

                <Col span={3}>
                    <InputDecimal name="percentualLucro" label="Margem de lucro (%)" placeholder="15,50" onChange={calculeValorVenda} />
                </Col>


                <Col span={3}>
                    <InputDecimal
                        onChange={calculeValorTaxa}
                        name="valorVenda"
                        label="Valor Venda"
                        placeholder="15,50"
                        prefix="R$"
                        required
                        validateStatus={valorVendaAtencao ? "warning" : ""}
                        help={valorVendaAtencao ? "Valor de Venda é Inferior ao de Compra" : ""}
                    />
                </Col>

                <Col span={3}>
                    <InputDecimal name="quantidade" label="Quantidade" placeholder="10" required />
                </Col>

            </Row>
        </>
    )
}

export default FormGeneral
