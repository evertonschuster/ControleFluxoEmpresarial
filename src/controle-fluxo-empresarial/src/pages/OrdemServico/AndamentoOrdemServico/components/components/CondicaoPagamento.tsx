import React from 'react'
import { CondicaoPagamentoApi } from '../../../../../apis/CondicaoPagamento/CondicaoPagamentoApi';
import { Modal, Row, Col, Button, Divider } from 'antd';
import { useField, useFormik, useFormikContext } from 'formik';
import { useState } from 'react';
import { WithItemNone } from '../../../../../hoc/WithFormItem';
import SelectModelOne from '../../../../../components/SelectModel/SelectModelOne';
import ShowCondicaoPagamentoParcelas from '../../../../../components/ShowCondicaoPagamentoParcelas/ShowCondicaoPagamentoParcelas';
import ContaReceber from './../../../../../models/Movimentos/ContaReceber';
import { ParcelaPagamento } from '../../../../../models/CondicaoPagamento/ParcelaPagamento';
import { Input } from '../../../../../components/WithFormItem/withFormItem';
import Separator from '../../../../../components/Separator/Separator';
import { OrdemServicoProduto, OrdemServicoServico } from '../../../../../models/OrdemServicos/OrdemServicoItem';
import InputDecimal from '../../../../../components/InputDecimal/InputDecimal';

export interface Props {
    visible?: boolean;
    onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
}

const CondicaoPagamento: React.FC<Props> = (props) => {

    const [loading, setLoading] = useState(false)
    const { submitForm } = useFormikContext();
    const [{ value: produtos }] = useField<OrdemServicoProduto[]>("produtos");
    const [{ value: servicos }] = useField<OrdemServicoServico[]>("servicos");
    const [{ value: condicaoPagamentoId }, ,] = useField("condicaoPagamentoId");
    const [{ value: parcelasProduto }, , { setValue: setParcelasProduto }] = useField<ContaReceber[] & ParcelaPagamento[]>("parcelasProduto");
    const [{ value: parcelasServico }, , { setValue: setParcelasServico }] = useField<ContaReceber[] & ParcelaPagamento[]>("parcelasServico");

    async function calcularParcelas() {
        let totalProduto = produtos.reduce((a, e) => a + (e.quantidade! * e.valor!), 0);
        let totalServico = servicos.reduce((a, e) => a + (e.quantidade! * e.servico?.valor!), 0);

        try {
            setLoading(true);
            let parcelas = (await CondicaoPagamentoApi.CalculaParcela(condicaoPagamentoId, new Date(), totalProduto)).data;
            setParcelasProduto(parcelas)

            parcelas = (await CondicaoPagamentoApi.CalculaParcela(condicaoPagamentoId, new Date(), totalServico)).data;
            setParcelasServico(parcelas)
        }
        catch (error) {
            setParcelasProduto([]);
            setParcelasServico([]);
        }
        finally {
            setLoading(false);
        }
    }

    function limparParcelas() {
        setParcelasProduto([])
        setParcelasServico([])
    }

    function disabledCalcularParcelas() {
        if (parcelasProduto?.length > 0 || parcelasServico?.length > 0) {
            return true
        }

        return false;
    }

    function disabledLimparParcelas() {
        if (parcelasProduto?.length > 0 || parcelasServico?.length > 0) {
            return false;
        }

        return true
    }

    function onCancel(e: React.MouseEvent<HTMLElement>) {
        limparParcelas();
        props.onCancel && props.onCancel(e);
    }

    return (
        <Modal
            title="Condição de Pagamento"
            onCancel={onCancel}
            onOk={() => submitForm()}
            width="90%"
            zIndex={50}
            cancelText="Voltar"
            okText="Finalizar"
            visible={props.visible}>
            <Row>
                <Col span={3}>
                    <InputDecimal placeholder="" name="totalOS" label="Total OS" disabled />
                </Col>
                <Col span={6}>
                    <SelectModelOne
                        disabled={parcelasProduto?.length > 0 || parcelasServico?.length > 0}
                        fetchMethod={CondicaoPagamentoApi.GetById.bind(CondicaoPagamentoApi)}
                        name="condicaoPagamentoId"
                        keyDescription="nome"
                        required={true}
                        label={{ title: "Seleção de Condição Pagamento", label: "Condição Pagamento" }}
                        errorMessage={{ noSelection: "Selecione uma Condição Pagamento!" }}
                        path="condicao-pagamento" />
                </Col>
                <Col span={3}>
                    <WithItemNone showLabel={true} padding={false} >
                        <Button type="primary" onClick={calcularParcelas} disabled={disabledCalcularParcelas()}  >Calcular Parcelas</Button>
                    </WithItemNone>
                </Col>
                <Col span={3}>
                    <WithItemNone showLabel={true} padding={false} >
                        <Button type="danger" disabled={disabledLimparParcelas()} onClick={limparParcelas} >Limpar Parcelas</Button>
                    </WithItemNone>
                </Col>
            </Row>


            <Row>
                <Col>
                    <Separator />
                    <Divider orientation="left" >Contas a Receber de Serviços</Divider>
                    <ShowCondicaoPagamentoParcelas
                        hiddenDesconto
                        hiddenTotal
                        loading={loading}
                        dataSource={parcelasServico ?? []} />
                </Col>
            </Row>

            <Row hidden={produtos.length == 0}>
                <Col>
                    <Separator />
                    <Divider orientation="left" >Contas a Receber de Produtos</Divider>
                    <ShowCondicaoPagamentoParcelas
                        hiddenDesconto
                        hiddenTotal
                        loading={loading}
                        dataSource={parcelasProduto ?? []} />
                </Col>
            </Row>
        </Modal>
    )
}

export default CondicaoPagamento
