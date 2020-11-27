import React from 'react'
import { ParcelaPagamento } from '../../../../models/CondicaoPagamento/ParcelaPagamento';
import { Row, Col, Divider } from 'antd';
import { useField } from 'formik';
import ContaReceber from '../../../../models/Movimentos/ContaReceber';
import Separator from '../../../../components/Separator/Separator';
import ShowCondicaoPagamentoParcelas from '../../../../components/ShowCondicaoPagamentoParcelas/ShowCondicaoPagamentoParcelas';


const CondicaoPagamento: React.FC = () => {

    const [{ value: parcelasProduto },] = useField<ContaReceber[] & ParcelaPagamento[]>("parcelasProduto");
    const [{ value: parcelasServico },] = useField<ContaReceber[] & ParcelaPagamento[]>("parcelasServico");

    return (
        <>
            <Row>
                <Col>
                    <Divider orientation="left" >Contas a Receber de Produtos</Divider>
                    <ShowCondicaoPagamentoParcelas
                        touched={false}
                        hiddenDesconto
                        hiddenTotal
                        dataSource={parcelasProduto ?? []} />
                </Col>
            </Row>

            <Row>
                <Col>
                    <Separator />
                    <Divider orientation="left" >Contas a Receber de Serviços</Divider>
                    <ShowCondicaoPagamentoParcelas
                        hiddenDesconto
                        touched={false}
                        hiddenTotal
                        dataSource={parcelasServico ?? []} />
                </Col>
            </Row>
        </>
    )
}

export default CondicaoPagamento
