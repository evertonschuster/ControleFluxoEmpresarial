import React, { useRef, useState } from 'react'
import { FormikProps, FormikHelpers } from 'formik';
import { Modal, Icon, Row, Col } from 'antd';
import { useParams, useHistory } from 'react-router-dom';
import { CompraApi } from './../../../../apis/Compras/CompraApi';
import { errorBack } from '../../../../utils/MessageApi';
import { Input, TextArea } from '../../../../components/WithFormItem/withFormItem';
import InnerForm from '../../../../components/InnerForm/InnerForm';
import { CancelarCompra } from '../../../../models/Compras/CancelarCompra';
import { CancelarCompraSchema } from '../CancelarCompraSchema';

export interface Props {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const CancelationForm: React.FC<Props> = (props) => {

    const { modelo, serie, numero, fornecedorId } = useParams<{ modelo: string | undefined, serie: string | undefined, numero: string | undefined, fornecedorId: string | undefined }>()
    const innerForm = useRef<FormikProps<CancelarCompra>>(null);
    const history = useHistory();
    const [loading, setLoading] = useState(false)

    const initialValues: CancelarCompra = {
        fornecedorId: Number.parseInt(fornecedorId!),
        modelo: modelo,
        numero: numero,
        serie: serie,
        justificativa: null,
        senha: null,
    }


    async function onSubmit(values: CancelarCompra, formikHelpers: FormikHelpers<CancelarCompra>) {
        try {
            setLoading(true);
            await CompraApi.Cancelar(values);
            history.push("/compras")
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
            <span style={{ fontSize: 20 }}>Cancelamento de Compra</span>
        </>
    )

    console.log(innerForm.current)

    return (
        <InnerForm
            innerRef={innerForm}
            onSubmit={onSubmit}
            validationSchema={CancelarCompraSchema}
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
