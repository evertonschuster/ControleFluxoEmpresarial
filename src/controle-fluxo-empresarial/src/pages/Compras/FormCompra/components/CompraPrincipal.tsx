import React from 'react'
import { CompraProduto } from '../../../../models/Compras/CompraProduto'
import { FornecedorApi } from '../../../../apis/Pessoas/Fornecedor.Api'
import { Input, DatePicker, TextArea } from '../../../../components/WithFormItem/withFormItem'
import { Row, Col, Divider } from 'antd'
import { useEffect } from 'react';
import { useField } from 'formik'
import CondicaoPagamentoSelection from './CondicaoPagamentoSelection'
import InputDecimal from '../../../../components/InputDecimal/InputDecimal'
import InputSituation from '../../../../components/Situation/InputSituation/InputSituation'
import ProdutoSelection from './ProdutoSelection'
import SelectModelOne from '../../../../components/SelectModel/SelectModelOne'
import Separator from '../../../../components/Separator/Separator'
import { FormCompraMode } from '../FormCompra'

const CompraPrincipal: React.FC = () => {

    const [{ value: compraProdutos }, ,] = useField<CompraProduto[]>("compraProdutos")
    const [{ value: frete }, ,] = useField<number>("frete")
    const [{ value: seguro }, ,] = useField<number>("seguro")
    const [{ value: outrasDispesas }, ,] = useField<number>("outrasDispesas")
    const [, , { setValue: setTotal }] = useField<number>("total");
    const [{ value: formMode }] = useField<FormCompraMode>("formMode");
    const disableForm = formMode == FormCompraMode.PAGAMENTO;

    useEffect(() => {
        let totalSoma = compraProdutos.reduce((acumulador, prod) => {
            let total = (prod.quantidade! * prod.valorUnitario!) - prod.desconto! + prod.ipi!;
            return acumulador + total;
        }, 0) ?? 0;

        totalSoma += (frete ?? 0) + (seguro ?? 0) + (outrasDispesas ?? 0)
        setTotal(totalSoma)
    }, [compraProdutos, frete, seguro, outrasDispesas])


    return (
        <>
            <Divider orientation={"left"}>Nota Fiscal</Divider>

            <Row>
                <Col span={3}>
                    <Input name="modelo" label="Modelo" placeholder="55" required disabled={disableForm} fast={false} />
                </Col>
                <Col span={3}>
                    <Input name="serie" label="Série" placeholder="1" required disabled={disableForm} fast={false} />
                </Col>
                <Col span={2}>
                    <Input name="numero" label="Número" placeholder="1" required disabled={disableForm} fast={false} />
                </Col>
                <Col span={7}>
                    <SelectModelOne
                        fetchMethod={FornecedorApi.GetById.bind(FornecedorApi)}
                        name="fornecedorId"
                        objectName="fornecedor"
                        keyDescription="nome"
                        required={true}
                        disabled={disableForm}
                        label={{ title: "Seleção de Fornecedor", label: "Fornecedor" }}
                        errorMessage={{ noSelection: "Selecione um Fornecedor!" }}
                        path="Fornecedor" />
                </Col>

                <Col span={2}>
                    <InputSituation name="situacao" disabled={true} />
                </Col>
            </Row>

            <Separator />

            <Row>
                <Col span={3}>
                    <DatePicker name="dataEmissao" label="Data Emissão" required disabled={disableForm} fast={false} />
                </Col>
                <Col span={3}>
                    <DatePicker name="dataChegada" label="Data Chegada" required disabled={disableForm} fast={false} />
                </Col>
            </Row>

            <ProdutoSelection />

            <Separator />
            <Row>
                <Col span={3}>
                    <InputDecimal name="frete" label="Frete" placeholder="21,50" disabled={disableForm} />
                </Col>
                <Col span={3}>
                    <InputDecimal name="seguro" label="Seguro" placeholder="21,50" disabled={disableForm} />
                </Col>
                <Col span={3}>
                    <InputDecimal name="outrasDispesas" label="Outras despesas" placeholder="21,50" disabled={disableForm} />
                </Col>

                <Col span={3} push={12}>
                    <InputDecimal name="total" label="Total da Nota" placeholder="21,50" disabled />
                </Col>
            </Row>

            <CondicaoPagamentoSelection />

            <Separator />

            <Row>
                <Col span={12}>
                    <TextArea name="observacao" label="Observações" rows={5} />
                </Col>
            </Row>

        </>
    )
}

export default CompraPrincipal
