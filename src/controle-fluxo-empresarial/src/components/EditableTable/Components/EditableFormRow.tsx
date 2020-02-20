import React, { memo, createRef } from 'react';
import { Record, RowMode } from './../EditableTable'
import { useFormik, Formik, FormikContextType, useFormikContext, Form, FormikProvider, withFormik } from 'formik';
import { promises } from 'dns';

export interface Props<T> {
    children: any[]
}

const EditableFormRow: React.FC<any> = (props) => {

    const record: Record = props.children[0].props.record;


    // if (record.rowMode === RowMode.view) {
    //     return (
    //         <tr {...props} />
    //     );
    // }

    return (<tr {...props} />)
}

export default withFormik({
    mapPropsToValues: () => ({ name: "" }),
    handleSubmit: () => { },
    displayName: "asd"
})(EditableFormRow);
