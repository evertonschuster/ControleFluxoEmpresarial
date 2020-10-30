import React from 'react'
import { Row, Col, Button, Divider } from 'antd';
import { useField, useFormikContext } from 'formik';
import { useState } from 'react';
import { VendaProduto } from '../../../../models/Vendas/VendaProduto';
import ContaReceber from '../../../../models/Movimentos/ContaReceber';
import { CondicaoPagamentoApi } from '../../../../apis/CondicaoPagamento/CondicaoPagamentoApi';
import SelectModelOne from '../../../../components/SelectModel/SelectModelOne';
import { WithItemNone } from '../../../../hoc/WithFormItem';
import Separator from '../../../../components/Separator/Separator';
import ShowCondicaoPagamentoParcelas from '../../../../components/ShowCondicaoPagamentoParcelas/ShowCondicaoPagamentoParcelas';
import { ParcelaPagamento } from '../../../../models/CondicaoPagamento/ParcelaPagamento';
import { FormModeVenda } from '../FormVenda';
import { ColumnProps } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { FromContaReceberType } from '../../../Movimentos/ContaReceber/FormContaReceber/FormContaReceber';

export interface Props {
    visible?: boolean;
    onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
}

const CondicaoPagamento: React.FC<Props> = (props) => {

    const [loading, setLoading] = useState(false)

    const [{ value: produtos }] = useField<VendaProduto[]>("produtos");
    const [{ value: formMode }, , { setValue: setFormMode }] = useField<FormModeVenda>("forMode");
    const [{ value: condicaoPagamentoId }, ,] = useField("condicaoPagamentoId");
    const [{ value: parcelasProduto }, { error: errorParcelas }, { setValue: setParcelasProduto }] = useField<ContaReceber[] & ParcelaPagamento[]>("parcelas");

    async function calcularParcelas() {
        let totalProduto = produtos.reduce((a, e) => a + (e.quantidade! * e.valor!), 0);

        if (totalProduto === 0) {
            return;
        }

        try {
            setLoading(true);
            let parcelas = (await CondicaoPagamentoApi.CalculaParcela(condicaoPagamentoId, new Date(), totalProduto)).data;
            setParcelasProduto(parcelas)
        }
        catch (error) {
            setParcelasProduto([]);
        }
        finally {
            setLoading(false);
            setFormMode(FormModeVenda.PAGAMENTO)
        }
    }

    function limparParcelas() {
        setParcelasProduto([]);
        setFormMode(FormModeVenda.VENDA)
    }

    function disabledCalcularParcelas() {
        if (parcelasProduto?.length > 0) {
            return true
        }

        return false;
    }

    function disabledLimparParcelas() {
        if (formMode === FormModeVenda.VISUALIZACAO) {
            return true
        }

        if (parcelasProduto?.length > 0) {
            return false;
        }

        return true
    }

    const actions = {
        key: "btnAcao",
        title: "Ações",
        render: (item: ContaReceber) => {
            let url = `${item.modelo}/${item.serie}/${item.numero}/${item.parcela}`;

            return (
                <>
                    <Link to={{
                        pathname: "/contas-receber/view/" + url, state: {
                            formType: FromContaReceberType.VerPaga
                        }
                    }}>
                        <Button size="small" type="default">Ver</Button>
                    </Link>

                    {!item.dataPagamento && !item.dataCancelamento && <Link to={{
                        pathname: "/contas-receber/receive/" + url, state: {
                            formType: FromContaReceberType.Receber
                        }
                    }} style={{ paddingLeft: 8 }}>
                        <Button size="small" type="primary">Receber</Button>
                    </Link>}
                </>)

        }
    } as ColumnProps<ParcelaPagamento>


    return (
        <>
            <Row>
                <Col span={6}>
                    <SelectModelOne
                        disabled={parcelasProduto?.length > 0}
                        fetchMethod={CondicaoPagamentoApi.GetById.bind(CondicaoPagamentoApi)}
                        name="condicaoPagamentoId"
                        objectName="condicaoPagamento"
                        keyDescription="nome"
                        required={true}
                        label={{ title: "Seleção de Condição Pagamento", label: "Condição Pagamento" }}
                        errorMessage={{ noSelection: "Selecione uma Condição Pagamento!" }}
                        path="condicao-pagamento" />
                </Col>
                {(formMode !== FormModeVenda.VISUALIZACAO && formMode !== FormModeVenda.CANCELAMENTO) && <>
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
                </>}
            </Row>


            <Separator />
            <Row >
                <Col>
                    <Divider orientation="left" >Contas a Receber de Produtos</Divider>
                    <ShowCondicaoPagamentoParcelas
                        hiddenDesconto
                        hiddenTotal
                        action={[actions]}
                        error={errorParcelas}
                        loading={loading}
                        dataSource={parcelasProduto ?? []} />
                </Col>
            </Row>
        </>
    )
}

export default CondicaoPagamento
