import React, { useState } from 'react'
import { Formik, Form, FormikConfig } from 'formik'
import { BreadcrumbProp } from '../../layouts/BasicLayout/BasicLayout';
import { BasicLayoutContextProvider, FormMode } from '../../layouts/BasicLayout/BasicLayoutContext';

export interface Props<T> extends FormikConfig<T> {
    formMode?: FormMode
}

const InnerForm: React.FC<Props<any>> = (props) => {

    const [breadcrumb, setBreadcrumb] = useState<BreadcrumbProp[]>();
    const [sharedState, setSharedState] = useState();
    const [formMode, setFormMode] = useState<FormMode>(props.formMode ?? FormMode.New)


    return (
        <BasicLayoutContextProvider value={{
            breadcrumb, setBreadcrumb,
            formMode, setFormMode,
            sharedState, setSharedState,
        }}>
            <Formik enableReinitialize={true}
                {...props}
            >
                <Form key="3" >
                    {props.children}
                </Form >
            </Formik>
        </BasicLayoutContextProvider>
    )
}

export default InnerForm
