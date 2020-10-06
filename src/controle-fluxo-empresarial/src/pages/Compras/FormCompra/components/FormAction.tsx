import { Button, Col, Row } from 'antd'
import { FormikProps, useField, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Compra } from '../../../../models/Compras/Compra';
import { getUserNameStorage } from '../../../../services/UserNameCache';
import { formatDataWithHour } from '../../../../utils/FormatNumber';
import { FormCompraMode } from '../FormCompra';
import CancelationForm from './CancelationForm';


const FormAction: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const formik = useFormikContext<any>();
    const history = useHistory();
    const [{ value: formMode }] = useField<FormCompraMode>("formMode");
    const [userCriacao, setUserCriacao] = useState<string | undefined | null>(undefined)
    const [userCancelamento, setUserCancelamento] = useState<string | undefined | null>(undefined)

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

        if (formik?.values?.userCancelamento) {
            let userName = await getUserNameStorage(formik?.values?.userCancelamento)
            setUserCancelamento(userName ?? null)
        } else {
            setUserCancelamento(null)
        }
    }

    function renderDatas(formik: FormikProps<Compra>) {
        return (
            <>
                <span >
                    Criado por: <span style={{ fontWeight: "bold" }}>{userCriacao ?? "__"}</span> às <span style={{ fontWeight: "bold", paddingRight: 2 }}>{formik.values?.dataCriacao ? formatDataWithHour(formik.values?.dataCriacao) : "  /  /"} </span>
                        |
                    Cancelado por: <span style={{ fontWeight: "bold" }}>{userCancelamento ?? "__"}</span> às <span style={{ fontWeight: "bold" }}>{formik.values?.dataCancelamento ? formatDataWithHour(formik.values?.dataCancelamento!) : "  /  /"}</span>
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

                <Button type="default" onClick={() => history.push("/compras")} style={{ marginRight: "10px" }}>Voltar</Button>
                {(formMode === FormCompraMode.PAGAMENTO || formMode === FormCompraMode.COMPRA) && <Button type="primary" onClick={() => formik.submitForm()} >Salvar</Button>}
                {formMode === FormCompraMode.CANCELAMENTO && <Button type="danger" onClick={() => { setShowModal(true) }} >Cancelar Conta a Pagar</Button>}
                <CancelationForm setShowModal={setShowModal} showModal={showModal} />
            </Col>
        </Row>
    )
}

export default FormAction
