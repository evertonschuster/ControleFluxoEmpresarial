import React, { memo } from 'react';
import { RecordTable, RowMode, TypeAttribute } from './../EditableTable'
import { Input, InputNumber } from '../../WithFormItem/withFormItem';
import { isFunction } from 'formik';


export interface Props {
    record: RecordTable & any;
    editable: boolean;
    dataIndex: string;
    title: string;
    renderEditable?: (text: any, record: any, index: number) => React.ReactNode;
    rowIndex: number;
    type?: TypeAttribute;
    style?: any;
}

const EditableCell: React.FC<Props> = (props) => {

    if (props.record === undefined || props.record.rowMode === RowMode.view) {
        return (
            <td style={props.style}> {props.children} </td>
        );
    }

    if (isFunction(props.renderEditable)) {
        return (
            <td style={props.style}>
                {props.renderEditable(props.record[props.dataIndex], props.record, props.rowIndex)}
            </td>
        );
    }

    if (props.type === TypeAttribute.number) {
        return (
            <td style={props.style}>
                <InputNumber label="" name={props.dataIndex} decimalSeparator=","></InputNumber>
            </td>
        )
    }

    return (
        <td style={props.style}>
            <Input label="" name={props.dataIndex}></Input>
        </td>
    );
}


export default memo(EditableCell, () => false);
