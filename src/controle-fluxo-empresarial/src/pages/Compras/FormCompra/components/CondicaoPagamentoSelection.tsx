import React, { useState, useEffect } from 'react'
import { Row, Col, Divider } from 'antd';
import SelectModelOne from '../../../../components/SelectModel/SelectModelOne';
import ShowCondicaoPagamentoParcelas from '../../../../components/ShowCondicaoPagamentoParcelas/ShowCondicaoPagamentoParcelas';
import { useField } from 'formik';
import { ParcelaPagamento } from '../../../../models/CondicaoPagamento/ParcelaPagamento';
import { CondicaoPagamentoApi } from '../../../../apis/CondicaoPagamento/CondicaoPagamentoApi';
import { CompraProduto } from '../../../../models/Compras/CompraProduto';

const CondicaoPagamentoSelection: React.FC = () => {

    const [{ value: total }, ,] = useField<number>("total");
    const [{ value: condicaoPagamentoId }, ,] = useField<number>("condicaoPagamentoId");
    const [{ value: compraProdutos }, ,] = useField<CompraProduto[]>("compraProdutos")


    const [loading, setLoading] = useState(false)
    const [parcelas, setParcelas] = useState<ParcelaPagamento[]>([])

    useEffect(() => {

        if (condicaoPagamentoId <= 0) {
            return setParcelas([]);
        }
        if (compraProdutos.length < 1) {
            return setParcelas([]);
        }

        calcularParcelas()

    }, [total, condicaoPagamentoId]);

    async function calcularParcelas() {
        try {
            setLoading(true);
            let parcelas = await (await CondicaoPagamentoApi.CalculaParcela(condicaoPagamentoId, new Date(), total)).data;
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
            <Divider>Financeiro</Divider>
            <Row>
                <Col span={6}>
                    <SelectModelOne
                        fetchMethod={CondicaoPagamentoApi.GetById.bind(CondicaoPagamentoApi)}
                        name="condicaoPagamentoId"
                        keyDescription="nome"
                        required={true}
                        label={{ title: "Seleção de Condição Pagamento", label: "Condição Pagamento" }}
                        errorMessage={{ noSelection: "Selecione uma Condição Pagamento!" }}
                        path="condicao-pagamento" />
                </Col>
            </Row>

            <Row>
                <Col>
                    <ShowCondicaoPagamentoParcelas loading={loading} dataSource={parcelas} />
                </Col>
            </Row>
        </>
    )
}

export default CondicaoPagamentoSelection
