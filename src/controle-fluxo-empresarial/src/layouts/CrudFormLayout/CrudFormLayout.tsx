import React from 'react';
import { Row, Col, Button, Icon } from 'antd';
import { Formik, FormikConfig, FormikHelpers, FormikProps, isFunction } from 'formik';
import { Form } from 'formik-antd';
import FormBasicLayout from '../FormBasicLayout/FormBasicLayout';
import { BreadcrumbProp } from '../BasicLayout/BasicLayout';
import { errorBack } from '../../utils/MessageApi';
import { withRouter, RouteComponentProps } from 'react-router-dom';

export interface Props extends FormikConfig<any> {
    breadcrumbList?: BreadcrumbProp[];
    isLoading?: boolean;
    backPath: string;
    children?: ((props: FormikProps<any>) => React.ReactNode) | React.ReactNode;
}


const CrudFormLayout: React.FC<Props & RouteComponentProps> = (props) => {


    async function onSubmit(values: any, formikHelpers: FormikHelpers<any>) {
        try {

            await props.onSubmit(values, formikHelpers);

        } catch (e) {

            errorBack(formikHelpers, e)

            throw e;
        }
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

    function onKeyDown(keyEvent: any) {
        if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
            keyEvent.preventDefault();
        }
    }

    return (
        <FormBasicLayout breadcrumbList={props.breadcrumbList} >
            <Formik
                {...props}
                onSubmit={onSubmit}
                enableReinitialize={true}  >
                {(formik) => (
                    <Form onKeyDown={onKeyDown} >
                        {renderLoading(formik.isSubmitting)}

                        {isFunction(props.children)
                            ? props.children(formik)
                            : props.children}

                        < Row type="flex" justify="end" style={{ paddingTop: "25px" }}>
                            <Col>
                                <Button type="danger" style={{ marginRight: "10px" }} onClick={() => props.history.push(props.backPath)}>Cancelar</Button>
                                <Button type="primary" onClick={() => formik.submitForm()}>Salvar</Button>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Formik>
        </FormBasicLayout >
    );

}

export default withRouter(CrudFormLayout);
