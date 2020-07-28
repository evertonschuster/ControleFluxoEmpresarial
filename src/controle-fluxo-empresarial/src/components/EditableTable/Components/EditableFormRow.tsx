import React, { memo } from 'react';
import { RecordTable, RowMode } from './../EditableTable'
import { Formik, FormikHelpers } from 'formik';

export interface Props {
    record: RecordTable
    initiallValues: RecordTable,
    handleSave: (values: RecordTable, formikHelpers: FormikHelpers<RecordTable>) => void,
    validationSchema?: any | (() => any);
}

const EditableFormRow: React.FC<Props> = (props) => {


    
    const { record, initiallValues, handleSave, validationSchema, ...restProps } = props

    if (record.rowMode === RowMode.view) {
        return (
            <tr key={record.tableKey} {...restProps} />
        );
    }

    return (
        <Formik
            key={record.tableKey}
            validationSchema={validationSchema}
            initialValues={record}
            enableReinitialize={true}
            onSubmit={handleSave}>
            <tr key={record.tableKey} {...restProps} />
        </Formik>
    )
}

export default memo(EditableFormRow, () => false);
