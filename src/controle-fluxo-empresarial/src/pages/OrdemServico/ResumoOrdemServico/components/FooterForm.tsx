import React, { useContext, useEffect, useState } from 'react'
import { Row, Col, Button } from 'antd'
import { useHistory } from 'react-router-dom';
import { FormikProps, useFormikContext } from 'formik';
import { getUserNameStorage } from '../../../../services/UserNameCache';
import { formatDataWithHour } from '../../../../utils/FormatNumber';
import BasicLayoutContext, { FormMode } from '../../../../layouts/BasicLayout/BasicLayoutContext';
import ConfirmarCancel from './ConfirmarCancel';

const FooterForm: React.FC = () => {
    const history = useHistory();
    const formik = useFormikContext<any>();
    const { formMode } = useContext(BasicLayoutContext);

    const [showModal, setShowModal] = useState(false)
    const [userCriacao, setUserCriacao] = useState<string | undefined | null>(undefined)
    const [userAtualizacao, setUserAtualizacao] = useState<string | undefined | null>(undefined)

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
        <>
            < Row type="flex" justify="space-between" style={{ paddingTop: "25px" }}>
                <Col
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}>

                    {renderDatas(formik)}
                </Col>
                <Col>
                    <Button type="dashed" style={{ marginRight: "10px" }} onClick={() => history.push("/ordem-servico")}>Voltar</Button>
                    {formMode === FormMode.Delete && <Button type="danger" onClick={() => setShowModal(true)}>Cancelar</Button>}
                </Col>
            </Row>
            <ConfirmarCancel visible={showModal} setVisible={setShowModal} />
        </>)
}

export default FooterForm
