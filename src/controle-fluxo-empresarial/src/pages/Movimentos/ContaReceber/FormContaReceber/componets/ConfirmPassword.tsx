import { Modal } from 'antd';
import { FormikHelpers, FormikProps, useFormik } from 'formik';
import React from 'react'
import { useHistory } from 'react-router-dom';
import { ContaReceberApi } from '../../../../../apis/Movimentos/ContaReceberApi';
import InnerForm from '../../../../../components/InnerForm/InnerForm';
import { Input } from '../../../../../components/WithFormItem/withFormItem';
import ContaReceber from '../../../../../models/Movimentos/ContaReceber';
import { errorBack } from '../../../../../utils/MessageApi';
import { useRef } from 'react';
import * as Yup from 'yup';
import Separator from '../../../../../components/Separator/Separator';
import { useFormLocalStorage } from '../../../../../services/CacheFormService';

export interface Props {
    errors: any;
    conta: ContaReceber;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    showModal: boolean
}

const ConfirmPassword: React.FC<Props> = (props) => {

    const history = useHistory();
    const formikRef = useRef<FormikProps<any>>(null);
    const { removeCurrentFormStorage } = useFormLocalStorage();

    async function onSubmit(values: ContaReceber, formikHelpers: FormikHelpers<ContaReceber>) {
        try {
            await ContaReceberApi.Receber(values);
            removeCurrentFormStorage();
            history.push("/contas-receber");
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
                    <Input name="senha" label="Senha" type="password"/>
                </InnerForm >
            </Modal>
        </>
    );
}

export default ConfirmPassword
