import React, { useState, ReactNode } from 'react';
import { Row, Col } from 'antd';
import { Formik, FormikConfig } from 'formik';
import { Form } from 'formik-antd';
import FormBasicLayout from '../FormBasicLayout/FormBasicLayout';
import { BreadcrumbProp } from '../BasicLayout/BasicLayout';

export interface Props extends FormikConfig<any> {
    breadcrumbList?: BreadcrumbProp[],
}

const CrudFormLayout: React.FC<Props> = (props) => {

    return (
        <FormBasicLayout breadcrumbList={props.breadcrumbList} >
            <Formik {...props}>
                {({ isSubmitting }) => (
                    <Form>

                        {props.children}

                    </Form>
                )}
            </Formik>
        </FormBasicLayout>
    );

}

export default CrudFormLayout;
