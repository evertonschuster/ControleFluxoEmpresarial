import React, { useState, useEffect } from 'react'
import DetalhesOS from './components/DetalhesOS'
import { Row, Col } from 'antd'
import ShowProdutosServicos from './components/ShowProdutosServicos';
import { TextArea } from '../../../../components/WithFormItem/withFormItem';
import InputDecimal from '../../../../components/InputDecimal/InputDecimal';
import SelectModelOne from '../../../../components/SelectModel/SelectModelOne';
import { CondicaoPagamentoApi } from '../../../../apis/CondicaoPagamento/CondicaoPagamentoApi';
import ShowCondicaoPagamentoParcelas from '../../../../components/ShowCondicaoPagamentoParcelas/ShowCondicaoPagamentoParcelas';
import { ParcelaPagamento } from '../../../../models/CondicaoPagamento/ParcelaPagamento';
import { useField } from 'formik';

const GeralForm: React.FC = () => {

    const [{ value: condicaoPagamentoId }] = useField("condicaoPagamentoId")
    const [{ value: condicaoPagamento }] = useField("condicaoPagamento")
    const [parcelas, setParcelas] = useState<ParcelaPagamento[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        if (condicaoPagamentoId <= 0) {
            return setParcelas([]);
        }
        calcularParcelas()

    }, [condicaoPagamentoId, condicaoPagamento]);

    async function calcularParcelas() {
        try {
            setLoading(true);
            let parcelas = await (await CondicaoPagamentoApi.CalculaParcela(condicaoPagamentoId, new Date(), 1000)).data;
            setParcelas(parcelas)
        }
        catch (error) {
            setParcelas([])
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
            <DetalhesOS />

            <Row>
                <Col span={12} >
                    <TextArea name="descricaoOrdemServico" label="Descrição do Técnico" rows={3} disabled />
                </Col>
                <Col span={12} >
                    <TextArea name="observacaoTecnico" label="Observações do Técnico" rows={3} disabled />
                </Col>
            </Row>

            <ShowProdutosServicos />

            <Row>
                <Col span={7}>
                    <SelectModelOne
                        fetchMethod={CondicaoPagamentoApi.GetById.bind(CondicaoPagamentoApi)}
                        name="condicaoPagamentoId"
                        objectName="condicaoPagamento"
                        keyDescription="nome"
                        required={true}
                        label={{ title: "Seleção de Condição de Pagamento", label: "Condição de Pagamento" }}
                        errorMessage={{ noSelection: "Selecione uma Condição de Pagamento!" }}
                        path="condicao-pagamento" />
                </Col>
                <Col span={3} push={14}>
                    <InputDecimal label="Total" name="total" placeholder="" disabled />
                </Col>
            </Row>

            <Row>
                <Col>
                    <ShowCondicaoPagamentoParcelas loading={loading} dataSource={parcelas} />
                </Col>
            </Row>

            <Row>
                <Col span={12} >
                    <TextArea name="descricaoOrdemServico" label="Observação do Cliente" rows={3} />
                </Col>
                <Col span={2} push={7}>
                    <InputDecimal label="Desconto" name="total" placeholder="" disabled />
                </Col>
                <Col span={3} push={7} >
                    <InputDecimal label="Total" name="total" placeholder="" disabled />
                </Col>
            </Row>
        </>
    )
}

export default GeralForm
