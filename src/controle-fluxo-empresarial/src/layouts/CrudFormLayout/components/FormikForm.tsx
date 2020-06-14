import React, { forwardRef, useImperativeHandle, useEffect } from 'react'
import { FormikProps, isFunction, useFormikContext } from 'formik'
import { Icon, Form, Row, Col, Button, Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import { useDebouncedCallback } from '../../../hoc/useDebouncedCallback';

export interface Props {
    isLoading?: boolean;
    backPath: string;
    children?: ((props: FormikProps<any>) => React.ReactNode) | React.ReactNode;
    onKeyDown: (event: React.KeyboardEvent<HTMLFormElement>) => void;
    initialValues: any;
}

export interface FormikFormRef {
    removeSavedFormLocalStorageForm: () => void;
}

interface FormData {
    ceatedDate: Date;
    formData: any,
}

const FormikForm: React.FC<Props & any> = forwardRef<FormikFormRef, Props>((props, ref) => {
    const history = useHistory();
    const formik = useFormikContext();
    const keyLocalStorage = `form-chache${history.location.pathname.toLowerCase()}`;


    useEffect(() => {
        verefiSavedForm();
    }, []);

    useImperativeHandle(ref, () => ({
        removeSavedFormLocalStorageForm
    }));

    const saveFormLocalStorage = useDebouncedCallback(() => {
        var values: FormData = {
            ceatedDate: new Date(),
            formData: formik.values,
        };

        localStorage.setItem(keyLocalStorage, JSON.stringify(values))
    }, 600);

    function removeSavedFormLocalStorageForm() {
        localStorage.removeItem(keyLocalStorage);
    }

    function getFormLocalStorage() {
        var savedForm = JSON.parse(localStorage.getItem(keyLocalStorage) ?? "") as FormData;
        formik.setValues({ ...props.initialValues, ...savedForm.formData });
    }

    function verefiSavedForm() {
        if (!localStorage.getItem(keyLocalStorage)) {
            return;
        }

        Modal.confirm({
            title: "Recuperação de formulário",
            content: "Existem dados não salvos, deseja recuperar?",
            onOk: getFormLocalStorage,
            onCancel: removeSavedFormLocalStorageForm,
            cancelText: "Remover",
            okText: "Recuperar"
        })
    }

    function onKeyDown(event: React.KeyboardEvent<HTMLFormElement>) {
        saveFormLocalStorage();
        props.onKeyDown(event);
    }

    function renderLoading(isLoading: boolean) {

        if (!isLoading && !props.isLoading) {
            return null;
        }

        return (
            <div style={{
                zIndex: 100,
                width: "100%",
                height: "100%",
                margin: "0em",
                left: "0em",
                top: "0em",
                position: "fixed"
            }} >
                <div style={{ background: "#00000026", height: "100%" }}>
                    <Icon type="loading" style={{ position: "absolute", top: "50%", left: "50%", fontSize: '72px', color: '#08c' }} theme="outlined" />
                </div>
            </div>
        )
    }

    function renderDatas(formik: FormikProps<any>) {
        return (
            <>
                <span style={{ textAlign: "end" }} >
                    Data Criação: {formik.values?.dataCriacao ? new Date(formik.values?.dataCriacao).toLocaleString(undefined, {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",

                    hour: "numeric",
                    minute: "numeric"
                }) : "  /  /"}</span>
                <span style={{ textAlign: "end" }} >
                    Data Atualização: {formik.values?.dataAtualizacao ? new Date(formik.values.dataAtualizacao)?.toLocaleString(undefined, {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",

                    hour: "numeric",
                    minute: "numeric"
                }) : "  /  /"}</span>
            </>
        )
    }

    return (
        <Form onKeyUp={onKeyDown} >
            {renderLoading(formik.isSubmitting)}

            {isFunction(props.children)
                ? props.children(formik)
                : props.children}

            < Row type="flex" justify="end" style={{ paddingTop: "25px" }}>
                <Col span={7}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        paddingRight: 20
                    }}>
                    {renderDatas(formik)}
                </Col>
                <Col>
                    <Button type="danger" style={{ marginRight: "10px" }} onClick={() => history.push(props.backPath)}>Cancelar</Button>
                    <Button type="primary" onClick={() => formik.submitForm()}>Salvar</Button>
                </Col>
            </Row>
        </Form>
    )
})

export default FormikForm
