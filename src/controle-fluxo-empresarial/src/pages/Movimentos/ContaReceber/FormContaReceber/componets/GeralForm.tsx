import React from 'react'
import { FormaPagamentoApi } from '../../../../../apis/CondicaoPagamento/FormaPagamentoApi';
import { FornecedorApi } from '../../../../../apis/Pessoas/Fornecedor.Api';
import { getUserNameStorage } from '../../../../../services/UserNameCache';
import { Input, DatePicker, InputNumber, TextArea } from '../../../../../components/WithFormItem/withFormItem';
import { Row, Col } from 'antd';
import { useEffect } from 'react';
import { useField } from 'formik';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import InputDecimal from '../../../../../components/InputDecimal/InputDecimal';
import SelectModelOne from '../../../../../components/SelectModel/SelectModelOne';
import { useDebouncedCallback } from './../../../../../hoc/useDebouncedCallback';
import moment from 'moment';
import { FormContaReceberMode, FromContaReceberType } from '../FormContaReceber';
import { ClienteApi } from '../../../../../apis/Pessoas/ClienteApi';

const GeralForm: React.FC = () => {

    const [{ value: serie }] = useField("serie");
    const [{ value: numero }] = useField("numero");
    const [{ value: modelo }] = useField("modelo");
    const [{ value: parcela }] = useField("parcela");

    const [{ value: juro }] = useField("juro");
    const [{ value: valor }] = useField("valor");
    const [{ value: multa }] = useField("multa");
    const [{ value: desconto }] = useField("desconto");
    const [, , { setValue: setValorBaixa }] = useField("valorBaixa");
    const [{ value: dataPagamento }] = useField("dataPagamento");
    const [{ value: dataVencimento }] = useField("dataVencimento");

    const [{ value: userCancelamento }] = useField("userCancelamento");

    const { state } = useLocation<FormContaReceberMode>();
    const formType = state?.formType ?? FromContaReceberType.Novo;
    const [userDescription, setUserDescription] = useState("")

    const disableFormInput: boolean = !(numero && modelo && parcela && serie)
        || (formType === FromContaReceberType.VerCancelada
            || formType === FromContaReceberType.VerPaga
            || formType === FromContaReceberType.CancelarBaixa
            || formType === FromContaReceberType.Ativar);

    const isFormCancel: boolean = formType === FromContaReceberType.Cancelar;
    const isFormPay: boolean = formType === FromContaReceberType.Receber || formType === FromContaReceberType.VerPaga || formType === FromContaReceberType.CancelarBaixa;
    const isFormEdit: boolean = formType === FromContaReceberType.Editar || isFormPay;
    const disablePK = formType !== FromContaReceberType.Novo;

    useEffect(() => {
        getUserNameStorage(userCancelamento).then(e => {
            setUserDescription(e)
        })
    }, [userCancelamento]);


    const atualizaBaixa = useDebouncedCallback((dataPagamento, dataVencimento, valor, desconto) => {

        let datePagamento = new Date(Date.parse(dataPagamento));
        let dateVencimento = new Date(Date.parse(dataVencimento));

        var data1 = moment(datePagamento);
        var data2 = moment(dateVencimento);
        var diferencaDias = data1.diff(data2, 'days');


        if (diferencaDias <= 0) {
            return setValorBaixa(valor - desconto)
        }

        setValorBaixa(valor + multa + juro)
    }, 100);

    useEffect(() => {
        if (formType === FromContaReceberType.Receber && dataVencimento && dataPagamento) {
            atualizaBaixa(dataPagamento, dataVencimento, valor, desconto);
        }
    }, [juro, multa, desconto, dataVencimento, dataPagamento])
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
                        fetchMethod={ClienteApi.GetById.bind(ClienteApi)}
                        name="clienteId"
                        objectName="cliente"
                        keyDescription="nome"
                        required={true}
                        disabled={disablePK}
                        label={{ title: "Seleção de Cliente", label: "Cliente" }}
                        errorMessage={{ noSelection: "Selecione um Cliente!" }}
                        path="cliente" />
                </Col>
                <Col span={2}>
                    <InputNumber name="parcela" label="Parcela" required min={1} disabled={disablePK} />
                </Col>
            </Row>

            <Row>
                <Col span={3}>
                    <InputDecimal name="valor" label="Valor" placeholder="10,20" disabled={disableFormInput || isFormCancel || isFormEdit} required />
                </Col>

                <Col span={3}>
                    <InputDecimal name="desconto" label="Desconto" placeholder="10,20" disabled={disableFormInput || isFormCancel} />
                </Col>

                <Col span={3}>
                    <InputDecimal name="multa" label="Multa" placeholder="10,20" disabled={disableFormInput || isFormCancel} />
                </Col>

                <Col span={3}>
                    <InputDecimal name="juro" label="Juros" placeholder="10,20" disabled={disableFormInput || isFormCancel} />
                </Col>

            </Row>

            <Row>
                <Col span={7}>
                    <SelectModelOne
                        disabled={disableFormInput || isFormCancel}
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
                    <DatePicker name="dataEmissao" label="Data Emissão" disabled={disableFormInput || isFormCancel || isFormEdit} fast={false} required />
                </Col>

                <Col span={3}>
                    <DatePicker name="dataVencimento" label="Data Vencimento" disabled={disableFormInput || isFormCancel} fast={false} required />
                </Col>

                {
                    isFormPay && <Col span={3}>
                        <DatePicker name="dataPagamento" label="Data Pagamento" disabled={disableFormInput} required />
                    </Col>
                }
                {
                    isFormPay && <Col span={3}>
                        <DatePicker name="dataBaixa" label="Data Baixa" disabled={true} />
                    </Col>
                }
                {
                    isFormPay && <Col span={3}>
                        <InputDecimal name="valorBaixa" label="Valor Baixa" disabled={true} placeholder="" />
                    </Col>
                }

            </Row>

            <Row>
                <Col span={12}>
                    <TextArea name="descricao" label="Descrição" rows={4} disabled={disableFormInput || isFormCancel} fast={false} />
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
