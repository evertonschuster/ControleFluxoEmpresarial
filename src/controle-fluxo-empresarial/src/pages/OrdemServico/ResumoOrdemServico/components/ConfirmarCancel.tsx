import { Col, message, Modal, Row } from 'antd'
import { FormikProps, useFormikContext } from 'formik'
import React, { useRef } from 'react'
import InnerForm from '../../../../components/InnerForm/InnerForm'
import { Input, TextArea } from '../../../../components/WithFormItem/withFormItem'
import * as Yup from 'yup';
import { OrdemServicoApi } from './../../../../apis/OrdemServicos/OrdemServico';
import { useParams } from 'react-router-dom'
import { CancelarOrdemServico } from '../../../../models/OrdemServicos/CancelarOrdemServico'
import { errorBack } from '../../../../utils/MessageApi'
import { useHistory } from 'react-router-dom';

export interface Props {
    visible: boolean;
    setVisible: (visible: boolean) => void
}

const CancelarOrdemServicoSchema = Yup.object().shape({
    senha: Yup.string().nullable().required("Informe a senha."),
    justificativa: Yup.string()
        .nullable()
        .min(20, "Justificativa deve ter mais de 20 caracteres")
        .max(255, "Justificativa não deve ter mais de 255 caracteres.")
        .required("Informe a senha.")
})

const ConfirmarCancel: React.FC<Props> = (props) => {
    const { setSubmitting } = useFormikContext();
    const history = useHistory();
    const formik = useRef<FormikProps<any>>(null)
    let { id } = useParams<{ id: string }>();


    async function onSubmit(form: CancelarOrdemServico) {
        try {
            setSubmitting(true);
            await OrdemServicoApi.Cancelar(form);
            message.success("Cancelada com Sucesso!")
            history.push("/ordem-servico")
        } catch (e) {
            errorBack(null, e);
        }
        finally {
            setSubmitting(false)
        }
    }

    return (
        <Modal
            title="Cancelar Ordem de Serviço"
            okText="Confirmar"
            okType="danger"
            onOk={() => formik.current?.submitForm()}
            onCancel={() => props.setVisible(false)}
            cancelText="Voltar"
            visible={props.visible}>
            <InnerForm
                innerRef={formik}
                validationSchema={CancelarOrdemServicoSchema}
                initialValues={{ justificativa: null, senha: null, id: parseInt(id) }}
                onSubmit={onSubmit}>

                <Row>
                    <Col>
                        <TextArea name="justificativa" label="Justificativa" required rows={4} />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Input name="senha" label="Senha" required />
                    </Col>
                </Row>

            </InnerForm>
        </Modal>
    )
}

export default ConfirmarCancel
