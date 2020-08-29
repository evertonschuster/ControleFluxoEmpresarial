import React, { useState } from 'react'
import { Row, Col, Button } from 'antd'
import { useHistory } from 'react-router-dom';
import { useField } from 'formik';
import CondicaoPagamento from './components/CondicaoPagamento';

const FooterForm: React.FC = () => {
    const history = useHistory();
    const [showCondicaoPagamento, setShowCondicaoPagamento] = useState(false)

    const [{ value: dataInicio }, , { setValue: setDataInicio }] = useField("dataInicio");
    const [{ value: dataFinilizacao },] = useField("dataFinilizacao");


    function onIniciarOS() {
        setDataInicio(new Date())
    }

    return (<>
        < Row type="flex" justify="end" style={{ paddingTop: "25px" }}>
            <Col span={7}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingRight: 20
                }}>
            </Col>
            <Col>
                <Button type="dashed" style={{ marginRight: "10px" }} onClick={() => history.push("/ordem-servico")}>Voltar</Button>
                {dataInicio && !dataFinilizacao && <Button type="primary" style={{ marginRight: "10px" }} >Salvar</Button>}
                {dataInicio && !dataFinilizacao && <Button type="default" style={{ marginRight: "10px" }} onClick={() => setShowCondicaoPagamento(true)} >Finalizar</Button>}
                {!dataInicio && <Button type="primary" style={{ marginRight: "10px" }} onClick={onIniciarOS} >Iniciar</Button>}
            </Col>
        </Row>
        <CondicaoPagamento visible={showCondicaoPagamento} onCancel={() => setShowCondicaoPagamento(false)} />
    </>)
}

export default FooterForm
