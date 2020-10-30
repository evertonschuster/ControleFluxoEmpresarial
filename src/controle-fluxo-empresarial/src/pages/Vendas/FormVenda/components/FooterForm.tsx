import { Button, Col, Row } from 'antd'
import { FormikProps, useFormikContext } from 'formik'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getUserNameStorage } from '../../../../services/UserNameCache'
import { formatDataWithHour } from '../../../../utils/FormatNumber'
import { FormModeVenda } from '../FormVenda'
import CancelationForm from '../innerForm/Cancelation/CancelationForm'

const FooterForm: React.FC = () => {

    const history = useHistory();
    const formik = useFormikContext<any>();
    const [showModal, setShowModal] = useState(false);
    const [userCriacao, setUserCriacao] = useState<string | undefined | null>(undefined);
    const [userAtualizacao, setUserAtualizacao] = useState<string | undefined | null>(undefined);

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
    }

    function renderDatas(formik: FormikProps<any>) {
        return (
            <>
                <span >
                    Criado por: <span style={{ fontWeight: "bold" }}>{userCriacao ?? "__"}</span> às <span style={{ fontWeight: "bold" }}>{formik.values?.dataCriacao ? formatDataWithHour(formik.values?.dataCriacao) : "  /  /"}</span>

                    <span style={{ padding: 15 }} >|</span>

                    Atualizado por: <span style={{ fontWeight: "bold" }}>{userAtualizacao ?? "__"}</span> às <span style={{ fontWeight: "bold" }}>{formik.values?.dataAtualizacao ? formatDataWithHour(formik.values?.dataAtualizacao) : "  /  /"}</span>
                </span>
            </>
        )
    }

    return (
        < Row type="flex" justify="space-between" style={{ paddingTop: "30px" }}>
            <Col
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}>
                {renderDatas(formik)}
            </Col>
            <Col>
                <Button type="default" onClick={() => history.push("/vendas")} style={{ marginRight: "10px" }}>Voltar</Button>
                {formik.values.forMode === FormModeVenda.CANCELAMENTO && <Button type="danger" onClick={() => { setShowModal(true) }} >Cancelar Venda</Button>}
                {(formik.values.forMode === FormModeVenda.VENDA || formik.values.forMode === FormModeVenda.PAGAMENTO) && <Button type="primary" onClick={() => formik.submitForm()} >Salvar</Button>}
                <CancelationForm showModal={showModal} setShowModal={setShowModal} />
            </Col>
        </Row>
    )
}

export default FooterForm
