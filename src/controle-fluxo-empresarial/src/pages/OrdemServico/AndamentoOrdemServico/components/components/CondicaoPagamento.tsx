import React from 'react'
import { CondicaoPagamentoApi } from '../../../../../apis/CondicaoPagamento/CondicaoPagamentoApi';
import { Modal, Row, Col, Button } from 'antd';
import { useField, useFormik, useFormikContext } from 'formik';
import { useState } from 'react';
import { WithItemNone } from '../../../../../hoc/WithFormItem';
import SelectModelOne from '../../../../../components/SelectModel/SelectModelOne';
import ShowCondicaoPagamentoParcelas from '../../../../../components/ShowCondicaoPagamentoParcelas/ShowCondicaoPagamentoParcelas';
import ContaReceber from './../../../../../models/Movimentos/ContaReceber';
import { ParcelaPagamento } from '../../../../../models/CondicaoPagamento/ParcelaPagamento';
import { Input } from '../../../../../components/WithFormItem/withFormItem';

export interface Props {
    visible?: boolean;
    onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
}

const CondicaoPagamento: React.FC<Props> = (props) => {

    const [loading, setLoading] = useState(false)
    const { submitForm } = useFormikContext();
    const [{ value: totalOS }, ,] = useField("totalOS");
    const [{ value: condicaoPagamentoId }, ,] = useField("condicaoPagamentoId");
    const [{ value: parcelas }, , { setValue: setParcelas }] = useField<ContaReceber[] & ParcelaPagamento[]>("parcelas");

    async function calcularParcelas() {
        try {
            setLoading(true);
            let parcelas = (await CondicaoPagamentoApi.CalculaParcela(condicaoPagamentoId, new Date(), totalOS)).data;
            setParcelas(parcelas)
        }
        catch (error) {
            setParcelas([])
        }
        finally {
            setLoading(false);
        }
    }

    function limparParcelas() {
        setParcelas([])
    }

    function disabledCalcularParcelas() {
        if (parcelas?.length > 0) {
            return true
        }

        return false;
    }

    function disabledLimparParcelas() {
        if (parcelas?.length > 0) {
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
            cancelText="Voltar"
            okText="Salvar e Finalizar"
            visible={props.visible}>
            <Row>
                <Col span={3}>
                    <Input name="totalOS" label="Total OS" disabled />
                </Col>
                <Col span={6}>
                    <SelectModelOne
                        disabled={parcelas?.length > 0}
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
                    <ShowCondicaoPagamentoParcelas
                        hiddenDesconto
                        hiddenTotal
                        loading={loading}
                        dataSource={parcelas ?? []} />
                </Col>
            </Row>
        </Modal>
    )
}

export default CondicaoPagamento
