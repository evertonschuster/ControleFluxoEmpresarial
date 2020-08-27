import React from 'react'
import { Row, Col, Button } from 'antd'
import { useHistory } from 'react-router-dom';
import { useField } from 'formik';

const FooterForm: React.FC = () => {
    const history = useHistory();
    const [{ value: dataInicio }, , { setValue: setDataInicio }] = useField("dataInicio");
    const [{ value: dataFinilizacao },] = useField("dataFinilizacao");


    function onIniciarOS() {
        setDataInicio(new Date())
    }

    return (
        < Row type="flex" justify="end" style={{ paddingTop: "25px" }}>
            <Col span={7}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingRight: 20
                }}>
                {/* {renderDatas(formik)} */}
            </Col>
            <Col>
                <Button type="danger" style={{ marginRight: "10px" }} onClick={() => history.push("/ordem-servico")}>Voltar</Button>
                <Button type="danger" style={{ marginRight: "10px" }} onClick={() => history.push("/ordem-servico")}>Rejeitar</Button>
                <Button type="ghost" style={{ marginRight: "10px" }} >Retificar</Button>
                <Button type="primary" style={{ marginRight: "10px" }} onClick={onIniciarOS} >Aprovar</Button>
            </Col>
        </Row>)
}

export default FooterForm
