import React, { useContext, useState, useEffect } from 'react'
import { useFormikContext, FormikProps } from 'formik';
import { useHistory } from 'react-router-dom';
import Button from 'antd/lib/button';
import ConfirmationForm from './ConfirmationForm';
import { FromContaPagarType, FormContaPagarMode } from '../FromContaPagar';
import { Row, Col } from 'antd';
import ContaPagar from '../../../../../models/Movimentos/ContaPagar';
import { formatDataWithHour } from '../../../../../utils/FormatNumber';
import { getUserNameStorage } from '../../../../../services/UserNameCache';
import { ContaPagarApi } from '../../../../../apis/Movimentos/ContaPagarApi';

const ActionForm: React.FC = () => {
    const [showCancelamentoModal, setShowCancelamentoModal] = useState(false);
    const [showCancelamentoBaixaModal, setShowCancelamentoBaixaModal] = useState(false);
    const formik = useFormikContext<any>();
    const history = useHistory<FormContaPagarMode>();
    const [userCriacao, setUserCriacao] = useState<string | undefined | null>(undefined)
    const [userAtualizacao, setUserAtualizacao] = useState<string | undefined | null>(undefined)
    const [userBaixa, setUserBaixa] = useState<string | undefined | null>(undefined)

    const formCancel = history.location.state?.formType === FromContaPagarType.Cancelar;
    const formPay = history.location.state?.formType === FromContaPagarType.Pagar;
    const formEdit = history.location.state?.formType === FromContaPagarType.Editar;
    const formAtivar = history.location.state?.formType === FromContaPagarType.Ativar;
    const formCancelBaixa = history.location.state?.formType === FromContaPagarType.CancelarBaixa;
    const formNew = history.location.state?.formType === undefined;



    useEffect(() => {
        loadUserName()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formik.values]);

    async function loadUserName() {
        if (formik?.values?.userCriacao) {
            let userName = await getUserNameStorage(formik?.values?.userCriacao)
            setUserCriacao(userName ?? null)
        } else {
            setUserCriacao(null)
        }

        if (formik?.values?.userAtualizacao) {
            let userName = await getUserNameStorage(formik?.values?.userAtualizacao)
            setUserAtualizacao(userName ?? null)
        } else {
            setUserAtualizacao(null)
        }

        if (formik?.values?.userBaixa) {
            let userName = await getUserNameStorage(formik?.values?.userBaixa)
            setUserBaixa(userName ?? null)
        } else {
            setUserBaixa(null)
        }
    }

    function renderDatas(formik: FormikProps<ContaPagar>) {
        return (
            <>
                <span >
                    Criado por: <span style={{ fontWeight: "bold" }}>{userCriacao ?? "__"}</span> às <span style={{ fontWeight: "bold" }}>{formik.values?.dataCriacao ? formatDataWithHour(formik.values?.dataCriacao) : "  /  /"}</span>

                    <span style={{ padding: 15 }} >|</span>

                    Atualizado por: <span style={{ fontWeight: "bold" }}>{userAtualizacao ?? "__"}</span> às <span style={{ fontWeight: "bold" }}>{formik.values?.dataAtualizacao ? formatDataWithHour(formik.values?.dataAtualizacao) : "  /  /"}</span>

                    {formik.values.dataBaixa && <>
                        <span style={{ padding: 15 }} >|</span><br />
                        Baixado por: <span style={{ fontWeight: "bold" }}>{userBaixa ?? "__"}</span> às <span style={{ fontWeight: "bold" }}>{userBaixa ? formatDataWithHour(formik.values.dataBaixa) : "  /  /"}</span>
                    </>}
                </span>
            </>
        )
    }

    return (
        < Row type="flex" justify="space-between" style={{ paddingTop: "30px" }}>

            <Col span={18}
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}>
                {renderDatas(formik)}
            </Col>
            <Col>

                <Button type="default" onClick={() => history.push("/contas-pagar")} style={{ marginRight: "10px" }}>Voltar</Button>
                {(formNew || formEdit) && <Button type="primary" onClick={() => formik.submitForm()} >Salvar</Button>}

                {formPay && <Button type="primary" onClick={() => formik.submitForm()} >Pagar</Button>}
                {formAtivar && <Button type="primary" onClick={() => formik.submitForm()} >Ativar Novamente</Button>}
                {formCancelBaixa && <Button type="primary" onClick={() => { setShowCancelamentoBaixaModal(true) }} >Cancelar Baixa</Button>}
                {formCancel && <Button type="danger" onClick={() => { setShowCancelamentoModal(true) }} >Cancelar Conta a Pagar</Button>}

                <ConfirmationForm
                    setShowModal={setShowCancelamentoModal}
                    showModal={showCancelamentoModal}
                    apiAction={ContaPagarApi.Cancelar.bind(ContaPagarApi)}
                    title="Cancelamento da Conta a Pagar"
                    okText="Cancelar Conta a Pagar" />

                <ConfirmationForm
                    setShowModal={setShowCancelamentoBaixaModal}
                    showModal={showCancelamentoBaixaModal}
                    apiAction={ContaPagarApi.CancelarBaixa.bind(ContaPagarApi)}
                    title="Cancelamento da Baixa da Conta a Pagar"
                    okText="Cancelar Baixa Conta a Pagar" />
            </Col>
        </Row>
    )
}

export default ActionForm
