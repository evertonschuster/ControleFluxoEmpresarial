import React from 'react'
import { FornecedorApi } from '../../../../apis/Pessoas/Fornecedor.Api'
import { Input, DatePicker, TextArea } from '../../../../components/WithFormItem/withFormItem'
import { Row, Col } from 'antd'
import CondicaoPagamentoSelection from './CondicaoPagamentoSelection'
import InputDecimal from '../../../../components/InputDecimal/InputDecimal'
import InputSituation from '../../../../components/Situation/InputSituation/InputSituation'
import ProdutoSelection from './ProdutoSelection'
import SelectModelOne from '../../../../components/SelectModel/SelectModelOne'
import { ItemFormRender } from '../../../../hoc/WithFormItem'
import { useField } from 'formik'
import { CompraProduto } from '../../../../models/Compras/CompraProduto'
import { useEffect } from 'react';

const CompraPrincipal: React.FC = () => {

    const [{ value: compraProdutos }, ,] = useField<CompraProduto[]>("compraProdutos")
    const [{ value: frete }, ,] = useField<number>("frete")
    const [{ value: seguro }, ,] = useField<number>("seguro")
    const [{ value: outrasDispesas }, ,] = useField<number>("outrasDispesas")
    const [, , { setValue: setTotal }] = useField<number>("total")


    useEffect(() => {
        let totalSoma = compraProdutos.reduce((acumulador, prod) => {
            let total = (prod.quantidade! * prod.valor!) - prod.desconto! + prod.ipi!;
            return acumulador + total;
        }, 0) ?? 0;

        totalSoma += (frete ?? 0) + (seguro ?? 0) + (outrasDispesas ?? 0)
        setTotal(totalSoma)
    }, [compraProdutos, frete, seguro, outrasDispesas])


    return (
        <>
            <Row>
                <Col span={2}>
                    <Input name="numero" label="Número" placeholder="1" required />
                </Col>
                <Col span={3}>
                    <Input name="modelo" label="Modelo" placeholder="43" required />
                </Col>
                <Col span={3}>
                    <Input name="serie" label="Série" placeholder="1" required />
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
                    <InputSituation name="situacao" />
                </Col>
            </Row>

            <Row>
                <Col span={3}>
                    <DatePicker name="dataEmissao" label="Data Emissão" required />
                </Col>
                <Col span={3}>
                    <DatePicker name="dataChegada" label="Data Chegada" required />
                </Col>
            </Row>

            <Row>
                <Col span={12}>
                    <TextArea name="observacao" label="Observações" rows={5} />
                </Col>
            </Row>

            <ProdutoSelection />

            <Row>
                <Col span={3}>
                    <InputDecimal name="frete" label="Frete" placeholder="21,50" />
                </Col>
                <Col span={3}>
                    <InputDecimal name="seguro" label="Seguro" placeholder="21,50" />
                </Col>
                <Col span={3}>
                    <InputDecimal name="outrasDispesas" label="Outras despesas" placeholder="21,50" />
                </Col>

                <Col span={3} push={12}>
                    <InputDecimal name="total" label="TotalNota" placeholder="21,50" disabled />
                </Col>
            </Row>

            <CondicaoPagamentoSelection />
        </>
    )
}

export default CompraPrincipal
