import React, { useContext, useMemo } from 'react'
import { FormaPagamentoApi } from '../../../../../apis/CondicaoPagamento/FormaPagamentoApi';
import { FornecedorApi } from '../../../../../apis/Pessoas/Fornecedor.Api';
import { Input, DatePicker, InputNumber, TextArea } from '../../../../../components/WithFormItem/withFormItem';
import { Row, Col } from 'antd';
import { useField } from 'formik';
import BasicLayoutContext, { FormMode } from '../../../../../layouts/BasicLayout/BasicLayoutContext';
import InputDecimal from '../../../../../components/InputDecimal/InputDecimal';
import SelectModelOne from '../../../../../components/SelectModel/SelectModelOne';
import { useEffect } from 'react';
import { getUserNameStorage } from '../../../../../services/UserNameCache';
import { useState } from 'react';

const GeralForm: React.FC = () => {

    const [{ value: serie }] = useField("serie");
    const [{ value: numero }] = useField("numero");
    const [{ value: modelo }] = useField("modelo");
    const [{ value: parcela }] = useField("parcela");
    const [{ value: fornecedorId }] = useField("fornecedorId");
    const [{ value: userCancelamento }] = useField("userCancelamento");
    const { formMode } = useContext(BasicLayoutContext);
    const [userDescription, setUserDescription] = useState("")

    const disableFormInput: boolean = !(numero && modelo && parcela && serie && fornecedorId) || formMode === FormMode.View;
    const disableFormCancel: boolean = formMode === FormMode.CancelarEntity;
    const disableFormEdit: boolean = formMode === FormMode.Edit;

    useEffect(() => {
        getUserNameStorage(userCancelamento).then(e => {
            setUserDescription(e)
        })
    }, [userCancelamento]);

    const disablePK = useMemo(() => {
        return formMode !== FormMode.New;
    }, [formMode])

    return (
        <>
            <Row>
                <Col span={2}>
                    <Input name="modelo" label="Modelo" placeholder="05" required disabled={disablePK} />
                </Col>
                <Col span={2}>
                    <Input name="serie" label="Série" placeholder="1" required disabled={disablePK} />
                </Col>
                <Col span={2}>
                    <Input name="numero" label="Número" placeholder="456" required disabled={disablePK} />
                </Col>
                <Col span={7}>
                    <SelectModelOne
                        fetchMethod={FornecedorApi.GetById.bind(FornecedorApi)}
                        name="fornecedorId"
                        objectName="fornecedor"
                        keyDescription="nome"
                        required={true}
                        disabled={disablePK}
                        label={{ title: "Seleção de Fornecedor", label: "Fornecedor" }}
                        errorMessage={{ noSelection: "Selecione um Fornecedor!" }}
                        path="Fornecedor" />
                </Col>
                <Col span={2}>
                    <InputNumber name="parcela" label="Parcela" required min={1} disabled={disablePK} />
                </Col>
            </Row>

            <Row>
                <Col span={3}>
                    <InputDecimal name="valor" label="Valor" placeholder="10,20" disabled={disableFormInput || disableFormCancel || disableFormEdit} required />
                </Col>

                <Col span={3}>
                    <InputDecimal name="desconto" label="Desconto" placeholder="10,20" disabled={disableFormInput || disableFormCancel} />
                </Col>

                <Col span={3}>
                    <InputDecimal name="multa" label="Multa" placeholder="10,20" disabled={disableFormInput || disableFormCancel} />
                </Col>

                <Col span={3}>
                    <InputDecimal name="juro" label="Juros" placeholder="10,20" disabled={disableFormInput || disableFormCancel} />
                </Col>

            </Row>

            <Row>
                <Col span={7}>
                    <SelectModelOne
                        disabled={disableFormInput || disableFormCancel}
                        fetchMethod={FormaPagamentoApi.GetById.bind(FormaPagamentoApi)}
                        name="formaPagamentoId"
                        keyDescription="nome"
                        objectName="formaPagamento"
                        required={true}
                        label={{ title: "Seleção de Forma de Pagamento", label: "Forma de Pagamento" }}
                        errorMessage={{ noSelection: "Selecione uma Forma de Pagamento!" }}
                        path="forma-pagamento" />
                </Col>

                <Col span={3}>
                    <DatePicker name="dataEmissao" label="Data Emissão" disabled={disableFormInput || disableFormCancel || disableFormEdit} fast={false} required />
                </Col>

                <Col span={3}>
                    <DatePicker name="dataVencimento" label="Data Vencimento" disabled={disableFormInput || disableFormCancel} fast={false} required />
                </Col>
            </Row>

            <Row>
                <Col span={12}>
                    <TextArea name="descricao" label="Descrição" rows={4} disabled={disableFormInput || disableFormCancel} fast={false} />
                </Col>
            </Row>
            {userCancelamento &&
                <Row>
                    <Col span={12}>
                        <TextArea name="justificativaCancelamento" label="Justificativa Cancelamento" rows={4} disabled={true} />
                    </Col>
                    <Col span={4}>
                        <DatePicker name="dataCancelamento" label="Data Cancelamento" disabled={true} />
                    </Col>
                    <Col span={4}>
                        <Input name="userCancelamento" label="Usuário Cancelamento" disabled={true} value={userDescription} />
                    </Col>
                </Row>
            }
        </>
    )
}

export default GeralForm
