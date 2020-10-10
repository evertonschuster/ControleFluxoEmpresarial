import React, { useRef, useState } from 'react'
import { CancelarContaReceber } from '../../../../../models/Movimentos/ContaReceber';
import { errorBack } from '../../../../../utils/MessageApi';
import { FormikProps, FormikHelpers } from 'formik';
import { Modal, Icon, Row, Col } from 'antd';
import { TextArea, Input } from '../../../../../components/WithFormItem/withFormItem';
import { useParams, useHistory } from 'react-router-dom';
import InnerForm from '../../../../../components/InnerForm/InnerForm';
import { useFormLocalStorage } from '../../../../../services/CacheFormService';
import { CancelarContaReceberSchema } from './CancelarContaReceberSchema';

export interface Props {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    okText: string;
    apiAction: (values: CancelarContaReceber) => Promise<any>
}

const ConfirmationForm: React.FC<Props> = (props) => {

    const { modelo, serie, numero, fornecedorId, parcela } = useParams<{ modelo: string | undefined, serie: string | undefined, numero: string | undefined, fornecedorId: string | undefined, parcela: string | undefined }>()
    const innerForm = useRef<FormikProps<CancelarContaReceber>>(null);
    const initialValues: CancelarContaReceber = {
        modelo: modelo,
        numero: numero,
        parcela: Number.parseInt(parcela!),
        serie: serie,
        justificativa: null,
        senha: null,
    }
    const history = useHistory();
    const [loading, setLoading] = useState(false)
    const { removeCurrentFormStorage } = useFormLocalStorage();


    async function onSubmit(values: CancelarContaReceber, formikHelpers: FormikHelpers<CancelarContaReceber>) {
        try {
            setLoading(true);
            await props.apiAction(values);
            removeCurrentFormStorage();
            history.push("/contas-receber");
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
            <span style={{ fontSize: 20 }}>{props.title}</span>
        </>
    )

    return (
        <InnerForm
            innerRef={innerForm}
            onSubmit={onSubmit}
            validationSchema={CancelarContaReceberSchema}
            initialValues={initialValues}>

            <Modal
                title={renderTitle}
                destroyOnClose={true}
                visible={props.showModal}
                okText={props.okText}
                okType={"danger"}
                okButtonProps={{ loading: loading }}
                onOk={() => innerForm.current?.submitForm()}
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

export default ConfirmationForm
