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
                {!dataInicio && <Button type="default" style={{ marginRight: "10px" }} onClick={onIniciarOS} >Iniciar</Button>}
                {dataInicio && !dataFinilizacao && <Button type="primary" style={{ marginRight: "10px" }} >Salvar</Button>}
                {dataInicio && !dataFinilizacao && <Button type="default" style={{ marginRight: "10px" }} >Finalizar</Button>}
            </Col>
        </Row>)
}

export default FooterForm
