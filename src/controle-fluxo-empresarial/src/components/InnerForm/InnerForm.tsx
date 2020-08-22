import React from 'react'
import { Formik, Form, FormikConfig } from 'formik'

export interface Props<T> extends FormikConfig<T> {

}

const InnerForm: React.FC<Props<any>> = (props) => {
    return (
        <Formik enableReinitialize={true} 
        {...props}
        >
            <Form key="3" >
                {props.children}
            </Form >
        </Formik>
    )
}

export default InnerForm
