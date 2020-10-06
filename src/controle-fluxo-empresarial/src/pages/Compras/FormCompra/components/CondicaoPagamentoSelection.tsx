import React, { useState } from 'react'
import { CondicaoPagamentoApi } from '../../../../apis/CondicaoPagamento/CondicaoPagamentoApi';
import { FormCompraMode } from '../FormCompra';
import { ParcelaPagamento } from '../../../../models/CondicaoPagamento/ParcelaPagamento';
import { Row, Col, Divider, Button } from 'antd';
import { useField, useFormikContext } from 'formik';
import { WithItemNone } from '../../../../hoc/WithFormItem';
import SelectModelOne from '../../../../components/SelectModel/SelectModelOne';
import Separator from '../../../../components/Separator/Separator';
import ShowCondicaoPagamentoParcelas from '../../../../components/ShowCondicaoPagamentoParcelas/ShowCondicaoPagamentoParcelas';
import { CompraProduto } from '../../../../models/Compras/CompraProduto';
import { message } from 'antd';

const CondicaoPagamentoSelection: React.FC = () => {

    const [{ value: total }, ,] = useField<number>("total");
    const [{ value: condicaoPagamentoId }] = useField<number>("condicaoPagamentoId");
    const [{ value: formMode }, , { setValue: setFormMode }] = useField<FormCompraMode>("formMode");
    const [{ value: produtos }, ,] = useField<CompraProduto[]>("produtos")
    const [{ value: parcelas }, { error: parcelasError }, { setValue: setParcelas }] = useField<ParcelaPagamento[] | null>("parcelas")

    const disableForm = formMode === FormCompraMode.CANCELAMENTO || formMode === FormCompraMode.VISUALIZACAO;
    const [loading, setLoading] = useState(false)
    const formik = useFormikContext();

    async function calcularParcelas() {
        let result = await formik.validateForm() as any;

        if (Object.keys(result).length > 0) {
            message.error("Formulário inválido, por favor corrija para continuar.")
            let errors = Object.keys(result).map(e => <span>{`[${e}]: ${result[e]}`} <br /></span>);
            message.error({ content: errors })

            return
        }

        setFormMode(FormCompraMode.PAGAMENTO)
        try {
            setLoading(true);
            let parcelas = (await CondicaoPagamentoApi.CalculaParcela(condicaoPagamentoId, new Date(), total)).data;
            setParcelas(parcelas)
        }
        catch (error) {
            setParcelas(null)
        }
        finally {
            setLoading(false);
        }
    }

    function limparParcelas() {
        setParcelas(null);
        setFormMode(FormCompraMode.COMPRA);

        setTimeout(() => {
            formik.validateForm();
        }, 500);
    }

    function disabledCalcularParcelas() {
        if (disableForm) {
            return true;
        }

        if (!condicaoPagamentoId) {
            return true;
        }

        if (produtos.length <= 0) {
            return true;
        }

        if (parcelas && parcelas.length > 0) {
            return true;
        }

        if (formMode === FormCompraMode.PAGAMENTO) {
            return true;
        }

        return false;
    }

    return (
        <>
            <Separator />
            <Separator />
            <Divider orientation={"left"}>Financeiro</Divider>
            <Row>
                <Col span={6}>
                    <SelectModelOne
                        disabled={(!!parcelas && parcelas.length > 0) || disableForm}
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
                        <Button type="primary" onClick={calcularParcelas} disabled={disabledCalcularParcelas()} >Calcular Parcelas</Button>
                    </WithItemNone>
                </Col>
                <Col span={3}>
                    <WithItemNone showLabel={true} padding={false} >
                        <Button type="danger" onClick={limparParcelas} disabled={formMode === FormCompraMode.COMPRA || disableForm}>Limpar Parcelas</Button>
                    </WithItemNone>
                </Col>
            </Row>

            <Row>
                <Col>
                    <ShowCondicaoPagamentoParcelas
                        hiddenDesconto
                        hiddenTotal
                        error={loading ? "" : parcelasError}
                        loading={loading}
                        dataSource={parcelas ?? []} />
                </Col>
            </Row>
        </>
    )
}

export default CondicaoPagamentoSelection
