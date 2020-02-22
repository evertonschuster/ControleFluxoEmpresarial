import React, { memo } from 'react';
import { Record, RowMode } from './../EditableTable'
import { Formik, FormikHelpers } from 'formik';

export interface Props {
    record: Record
    initiallValues: Record,
    handleSave: (values: Record, formikHelpers: FormikHelpers<Record>) => void,
    validationSchema?: any | (() => any);
}

const EditableFormRow: React.FC<Props> = (props) => {

    const { record, initiallValues, handleSave, validationSchema, ...restProps } = props

    if (record.rowMode === RowMode.view) {
        return (
            <tr {...restProps} />
        );
    }

    return (
        <Formik
            validationSchema={validationSchema}
            initialValues={record}
            enableReinitialize={true}
            onSubmit={handleSave}>
            <tr {...restProps} />
        </Formik>
    )
}

export default memo(EditableFormRow);
