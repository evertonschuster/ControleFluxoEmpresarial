import { Modal } from 'antd';
import { FormikHelpers, FormikProps, useFormik } from 'formik';
import React from 'react'
import { useHistory } from 'react-router-dom';
import { ContaPagarApi } from '../../../../../apis/Movimentos/ContaPagarApi';
import InnerForm from '../../../../../components/InnerForm/InnerForm';
import { Input } from '../../../../../components/WithFormItem/withFormItem';
import ContaPagar from '../../../../../models/Movimentos/ContaPagar';
import { errorBack } from '../../../../../utils/MessageApi';
import { useRef } from 'react';
import * as Yup from 'yup';
import Separator from '../../../../../components/Separator/Separator';
import { useFormLocalStorage } from '../../../../../services/CacheFormService';

export interface Props {
    errors: any;
    conta: ContaPagar;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    showModal: boolean
}

const ConfirmPassword: React.FC<Props> = (props) => {

    const history = useHistory();
    const formikRef = useRef<FormikProps<any>>(null);
    const { removeCurrentFormStorage } = useFormLocalStorage();

    async function onSubmit(values: ContaPagar, formikHelpers: FormikHelpers<ContaPagar>) {
        try {
            await ContaPagarApi.Pagar(values);
            removeCurrentFormStorage();
            history.push("/contas-pagar");
        }
        catch (e) {
            errorBack(formikHelpers, e);
        }
    }

    return (
        <>
            <Modal
                visible={props.showModal}
                okText="Confirmar"
                cancelText="Cancelar"
                onCancel={() => props.setShowModal(old => !old)}
                onOk={() => formikRef.current?.submitForm()}
            >
                <InnerForm initialValues={{ ...props.conta, senha: null }}
                    onSubmit={onSubmit.bind(ConfirmPassword)}
                    validationSchema={Yup.object().shape({
                        senha: Yup.string().nullable().required("Informe a senha.").min(6, "Senha inválida")
                    })}
                    innerRef={formikRef} >
                    {props.errors["parcela"]}

                    <Separator />
                    <Input name="senha" label="Senha" />
                </InnerForm >
            </Modal>
        </>
    );
}

export default ConfirmPassword
