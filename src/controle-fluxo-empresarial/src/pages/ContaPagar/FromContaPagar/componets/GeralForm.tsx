import React from 'react'
import { Row, Col } from 'antd';
import { Input, DatePicker, InputNumber } from './../../../../components/WithFormItem/withFormItem';
import SelectModelOne from '../../../../components/SelectModel/SelectModelOne';
import { FornecedorApi } from '../../../../apis/Pessoas/Fornecedor.Api';
import InputDecimal from '../../../../components/InputDecimal/InputDecimal';
import { FormaPagamentoApi } from '../../../../apis/CondicaoPagamento/FormaPagamentoApi';

const GeralForm: React.FC = () => {
    return (
        <>
            <Row>
                <Col span={2}>
                    <Input name="modelo" label="Modelo" placeholder="05"/>
                </Col>
                <Col span={2}>
                    <Input name="serie" label="Série" placeholder="1"/>
                </Col>
                <Col span={2}>
                    <Input name="numero" label="Número" placeholder="456"/>
                </Col>
                <Col span={7}>
                    <SelectModelOne
                        fetchMethod={FornecedorApi.GetById.bind(FornecedorApi)}
                        name="fornecedorId"
                        keyDescription="nome"
                        required={true}
                        label={{ title: "Seleção de Fornecedor", label: "Fornecedor" }}
                        errorMessage={{ noSelection: "Selecione um Fornecedor!" }}
                        path="Fornecedor" />
                </Col>
                <Col span={2}>
                    <Input name="parcela" label="Parcela" />
                </Col>
            </Row>

            <Row>
                <Col span={3}>
                    <InputDecimal name="valor" label="Valor" placeholder="10,20" />
                </Col>

                <Col span={3}>
                    <InputDecimal name="desconto" label="Desconto" placeholder="10,20" />
                </Col>

                <Col span={3}>
                    <InputDecimal name="multa" label="Multa" placeholder="10,20" />
                </Col>

                <Col span={3}>
                    <InputDecimal name="juro" label="Jurus" placeholder="10,20" />
                </Col>
            </Row>

            <Row>
                <Col span={3}>
                    <DatePicker name="dataEmissao" label="Data Emissão" />
                </Col>

                <Col span={3}>
                    <DatePicker name="dataVencimento" label="Data Vencimento" />
                </Col>

                <Col span={3}>
                    <DatePicker name="dataPagamento" label="Data Pagamento" />
                </Col>
            </Row>

            <Row>
                <Col span={7}>
                    <SelectModelOne
                        fetchMethod={FormaPagamentoApi.GetById.bind(FormaPagamentoApi)}
                        name="formaPagamentoId"
                        keyDescription="nome"
                        required={true}
                        label={{ title: "Seleção de Forma de Pagamento", label: "Forma de Pagamento" }}
                        errorMessage={{ noSelection: "Selecione uma Forma de Pagamento!" }}
                        path="forma-pagamento" />
                </Col>
            </Row>
        </>
    )
}

export default GeralForm