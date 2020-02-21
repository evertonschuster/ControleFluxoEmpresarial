import React, { memo } from 'react';
import { Record, RowMode } from './../EditableTable'
import { Input } from '../../WithFormItem/withFormItem';
import { isFunction } from 'formik';


export interface Props {
    record: Record & any;
    editable: boolean;
    dataIndex: string;
    title: string;
    renderEditable?: (text: any, record: any, index: number) => React.ReactNode;
    rowIndex: number
}

const EditableCell: React.FC<Props> = (props) => {

    if (props.record === undefined || props.record.rowMode === RowMode.view) {
        return (
            <td> {props.children} </td>
        );
    }

    if (isFunction(props.renderEditable)) {
        return (
            <td>
                {props.renderEditable(props.record[props.dataIndex], props.record, props.rowIndex)}
            </td>
        );
    }

    return (
        <td>
            <Input label="" name={props.dataIndex}></Input>
        </td>
    );
}

export default memo(EditableCell);
