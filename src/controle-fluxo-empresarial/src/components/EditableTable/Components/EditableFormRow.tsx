import React, { memo } from 'react';
import { Record, RowMode } from './../EditableTable'
import { Formik, FormikHelpers } from 'formik';

export interface Props {
    record: Record
    initiallValues: Record,
    handleSave: (values: Record, formikHelpers: FormikHelpers<Record>) => void,
}

const EditableFormRow: React.FC<Props> = (props) => {

    // if (record.rowMode === RowMode.view) {
    //     return (
    //         <tr {...props} />
    //     );
    // }

    return (
        <Formik initialValues={props.record.rowMode === RowMode.new ? props.initiallValues : props.record} onSubmit={props.handleSave}>
            <tr {...props} />
        </Formik>
    )
}

export default memo(EditableFormRow);
