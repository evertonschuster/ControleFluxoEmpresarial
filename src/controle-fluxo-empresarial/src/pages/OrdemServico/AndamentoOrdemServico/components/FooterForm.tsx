import React, { useState } from 'react'
import { errorBack } from '../../../../utils/MessageApi';
import { OrdemServicoApi } from '../../../../apis/OrdemServicos/OrdemServico';
import { Row, Col, Button } from 'antd'
import { useField, useFormikContext } from 'formik';
import { useHistory, useParams } from 'react-router-dom';
import CondicaoPagamento from './components/CondicaoPagamento';
import OrdemServico from './../../../../models/OrdemServicos/OrdemServico';
import { useFormLocalStorage } from '../../../../services/CacheFormService';
import { message } from 'antd';

const FooterForm: React.FC = () => {
    const history = useHistory();
    let { id } = useParams<{ id: string }>();
    const [showCondicaoPagamento, setShowCondicaoPagamento] = useState(false)

    const [{ value: dataCancelamento }] = useField("dataCancelamento");
    const [{ value: dataExecucao }, , { setValue: setDataExecucao }] = useField("dataExecucao");
    const [{ value: dataFinilizacao },] = useField("dataFinilizacao");
    const { setSubmitting, values, setFieldTouched, errors } = useFormikContext<OrdemServico>();
    const { removeCurrentFormStorage } = useFormLocalStorage();

    async function onIniciarOS() {
        try {
            if (!id) {
                return;
            }

            setSubmitting(true)
            let result = await OrdemServicoApi.Iniciar(id);
            setDataExecucao(result.data);

        } catch (e) {
            errorBack(null, e);
        } finally {
            setSubmitting(false);
        }
    }

    async function onSalvarAndamento() {
        try {
            if (!id) {
                return;
            }

            setSubmitting(true)
            await OrdemServicoApi.SalvarAndamento(values);
            removeCurrentFormStorage();
            message.info("Salvo com sucesso!")
        } catch (e) {
            errorBack(null, e);
        } finally {
            setSubmitting(false);
        }
    }

    function onFinalizar() {
        if (Object.keys(errors).length > 0) {
            return Object.keys(errors).map(e => setFieldTouched(e, true));
        }

        setShowCondicaoPagamento(true);
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
                {dataExecucao && !dataFinilizacao && !dataCancelamento && <Button type="primary" style={{ marginRight: "10px" }} onClick={() => onSalvarAndamento()} >Salvar</Button>}
                {dataExecucao && !dataFinilizacao && !dataCancelamento && <Button type="default" style={{ marginRight: "10px" }} onClick={() => onFinalizar()} >Finalizar</Button>}
                {!dataExecucao && !dataCancelamento && <Button type="primary" style={{ marginRight: "10px" }} onClick={onIniciarOS} >Iniciar</Button>}
            </Col>
        </Row>
        <CondicaoPagamento visible={showCondicaoPagamento} onCancel={() => setShowCondicaoPagamento(false)} />
    </>)
}

export default FooterForm
