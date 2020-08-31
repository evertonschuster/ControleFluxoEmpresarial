import React, { useRef, useState } from 'react'
import { CancelarContaPagar } from '../../../../../models/Movimentos/ContaPagar';
import { CancelarContaPagarSchema } from './CancelarContaPagarSchema';
import { ContaPagarApi } from '../../../../../apis/Movimentos/ContaPagarApi';
import { errorBack } from '../../../../../utils/MessageApi';
import { FormikProps, FormikHelpers } from 'formik';
import { Modal, Icon, Row, Col } from 'antd';
import { TextArea, Input } from '../../../../../components/WithFormItem/withFormItem';
import { useParams, useHistory } from 'react-router-dom';
import InnerForm from '../../../../../components/InnerForm/InnerForm';

export interface Props {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const CancelationForm: React.FC<Props> = (props) => {

    const { modelo, serie, numero, fornecedorId, parcela } = useParams<{ modelo: string | undefined, serie: string | undefined, numero: string | undefined, fornecedorId: string | undefined, parcela: string | undefined }>()
    const innerForm = useRef<FormikProps<CancelarContaPagar>>(null);
    const initialValues: CancelarContaPagar = {
        fornecedorId: Number.parseInt(fornecedorId!),
        modelo: modelo,
        numero: numero,
        parcela: Number.parseInt(parcela!),
        serie: serie,
        justificativa: null,
        senha: null,
    }
    const history = useHistory();
    const [loading, setLoading] = useState(false)

    async function onSubmit(values: CancelarContaPagar, formikHelpers: FormikHelpers<CancelarContaPagar>) {
        try {
            setLoading(true);
            await ContaPagarApi.Cancelar(values);
            history.push("/contas-pagar")
        }
        catch (e) {
            errorBack(formikHelpers, e);
        }
        finally {
            setLoading(false);
        }
    }

    const renderTitle = (
        <>
            <Icon type="exclamation-circle" style={{ color: "red", fontSize: 20, paddingRight: 10 }} />
            <span style={{ fontSize: 20 }}>Cancelamento do Conta a pagar</span>
        </>
    )

    return (
        <InnerForm
            innerRef={innerForm}
            onSubmit={onSubmit}
            validationSchema={CancelarContaPagarSchema}
            initialValues={initialValues}>

            <Modal
                title={renderTitle}
                destroyOnClose={true}
                visible={props.showModal}
                okText="Cancelar Conta a Pagar"
                okType={"danger"}
                okButtonProps={{ loading: loading }}
                onOk={innerForm.current?.submitForm}
                onCancel={() => props.setShowModal(false)}
                cancelButtonProps={{ loading: loading }}
            >
                <Row>
                    <Col>
                        <TextArea name="justificativa" label="Justiticativa" required rows={6} />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Input name="senha" type="password" label="Senha" required />
                    </Col>
                </Row>
            </Modal >
        </InnerForm>
    )
}

export default CancelationForm
