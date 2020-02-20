import React, { memo } from 'react';
import { Record, RowMode } from './../EditableTable'
import { Input } from 'formik-antd';


export interface Props {
    record: Record;
    editable: boolean;
    dataIndex: string;
    title: string;
}

const EditableCell: React.FC<Props> = (props) => {

    console.log("props", props)

    if (props.record === undefined || props.record.rowMode === RowMode.view) {
        return (
            <td> {props.children} </td>
        );
    }

    return (
        <td>
            <Input name={props.dataIndex}></Input>
        </td>
    )

}

export default memo(EditableCell);
