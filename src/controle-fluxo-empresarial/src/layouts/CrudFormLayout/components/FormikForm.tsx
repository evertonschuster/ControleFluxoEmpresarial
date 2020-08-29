import React, { forwardRef, useImperativeHandle, useEffect, useState } from 'react'
import { FormikProps, isFunction, useFormikContext } from 'formik'
import { Icon, Form, Row, Col, Button, Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import { useDebouncedCallback } from '../../../hoc/useDebouncedCallback';
import { formatDataWithHour } from '../../../utils/FormatNumber';
import { UserApi } from '../../../apis/Pessoas/UserApi';

export interface Props {
    isLoading?: boolean;
    backPath: string;
    children?: ((props: FormikProps<any>) => React.ReactNode) | React.ReactNode;
    onKeyDown: (event: React.KeyboardEvent<HTMLFormElement>) => void;
    initialValues: any;
    renderFooter?: (formik: FormikProps<any>) => React.ReactNode | null;
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
    const formik = useFormikContext<any>();
    const keyLocalStorage = `form-chache${history.location.pathname.toLowerCase()}`;
    const [userCriacao, setUserCriacao] = useState<string | undefined | null>(undefined)
    const [userAtualizacao, setUserAtualizacao] = useState<string | undefined | null>(undefined)


    useEffect(() => {
        verefiSavedForm();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        loadUserName()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formik.values]);

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

    async function loadUserName() {
        if (formik?.values?.userCriacao) {
            let userName = await getUserNameStorage(formik?.values?.userCriacao)
            setUserCriacao(userName ?? null)
        } else {
            setUserCriacao(null)
        }

        if (formik?.values?.userAtualizacao) {
            let userName = await getUserNameStorage(formik?.values?.userAtualizacao)
            setUserAtualizacao(userName ?? null)
        } else {
            setUserAtualizacao(null)
        }
    }

    async function getUserNameStorage(id: string) {
        let userName = localStorage.getItem(id);

        if (!userName) {
            let userData = await UserApi.GetById(id);
            userName = userData.data.name! ?? userData.data.userName!
            if (userName) {
                localStorage.setItem(id, userName)
            }
        }

        return userName;
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
                <span >
                    Criado por: <span style={{ fontWeight: "bold" }}>{userCriacao ?? "__"}</span> às <span style={{ fontWeight: "bold" }}>{formik.values?.dataCriacao ? formatDataWithHour(formik.values?.dataCriacao) : "  /  /"}</span>

                    <span style={{ padding: 15 }} >|</span>

                    Atualizado por: <span style={{ fontWeight: "bold" }}>{userAtualizacao ?? "__"}</span> às <span style={{ fontWeight: "bold" }}>{formik.values?.dataAtualizacao ? formatDataWithHour(formik.values?.dataAtualizacao) : "  /  /"}</span>
                </span>
            </>
        )
    }


    return (
        <Form onKeyUp={onKeyDown} >
            {renderLoading(formik.isSubmitting)}

            {isFunction(props.children)
                ? props.children(formik)
                : props.children}

            {isFunction(props.renderFooter)
                ? props.renderFooter(formik)
                : < Row type="flex" justify="space-between" style={{ paddingTop: "30px" }}>
                    <Col
                        style={{
                            display: "flex",
                            flexDirection: "column",
                        }}>
                        {renderDatas(formik)}
                    </Col>
                    <Col>
                        <Button type="default" onClick={() => history.push(props.backPath)} style={{ marginRight: "10px", fontWeight: "bold" }}>Voltar</Button>
                        <Button type="primary" onClick={() => formik.submitForm()} style={{ fontWeight: "bold" }}>Salvar</Button>
                    </Col>
                </Row>
            }
        </Form>
    )
})

export default FormikForm
