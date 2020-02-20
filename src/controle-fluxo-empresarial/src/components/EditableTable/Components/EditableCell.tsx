import React, { memo } from 'react';
import { connect, useFormik, useFormikContext } from 'formik';


export interface Props<T> {
    record: T,
    editable: boolean,
    dataIndex: string,
    title: string,
    handleSave: (value: T) => void,
}

const EditableCell: React.FC<Props<any>> = (props) => {

    const formik = useFormikContext();
    
    console.log("adsda", formik)

    return (
        <td> {props.children} </td>
    );

}

export default EditableCell;
