import React, { memo } from 'react';
import { Record, RowMode, TypeAttribute } from './../EditableTable'
import { Input, InputNumber } from '../../WithFormItem/withFormItem';
import { isFunction } from 'formik';


export interface Props {
    record: Record & any;
    editable: boolean;
    dataIndex: string;
    title: string;
    renderEditable?: (text: any, record: any, index: number) => React.ReactNode;
    rowIndex: number;
    type?: TypeAttribute;
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

    if (props.type === TypeAttribute.number) {
        return (
            <td>
                <InputNumber label="" name={props.dataIndex} decimalSeparator=","></InputNumber>
            </td>
        )
    }

    return (
        <td>
            <Input label="" name={props.dataIndex}></Input>
        </td>
    );
}

export default memo(EditableCell);
