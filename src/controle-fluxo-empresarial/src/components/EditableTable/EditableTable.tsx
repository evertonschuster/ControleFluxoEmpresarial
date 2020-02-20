import React, { memo, useState } from 'react';
import { Table } from 'antd';
import { ColumnProps, TableComponents } from 'antd/lib/table';
import EditableFormRow from './Components/EditableFormRow';
import EditableCell from './Components/EditableCell';
import { useFormikContext } from 'formik';

export enum RowMode {
    edit = "edit",
    new = 'new',
    remove = 'remove',
    view = 'view'
}

export interface ColumnEditableProps<T> extends ColumnProps<T> {
    editable?: boolean
}

export interface Props<T> {
    columns: ColumnEditableProps<T>[];
    rowKey?: string;
}

export interface Record {
    rowMode: RowMode
}

const EditableTable: React.FC<Props<any>> = (props) => {


    const dataSource: any = [
        { id: 2, nome: "Teste", idade: "45" },
        { id: 3, nome: "Teste", idade: "45" },
    ]

    const rowKey = props.rowKey ?? "id";

    const components: TableComponents = {
        body: {
            row: EditableFormRow,
            cell: EditableCell,
        },
    };

    const columns: ColumnProps<any>[] = props.columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Record) => ({
                record,
                editable: col.editable ?? false,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: handleSave,
            }),
        };
    });

    function handleSave(save: any) {

    }

    function mapRecord(dataSource: Record[]): Record[] {
        return dataSource.map(e => { return { ...e, rowMode: e.rowMode ?? RowMode.view } });
    }

    return (
        <Table
            components={components}
            bordered
            dataSource={mapRecord(dataSource)}
            columns={columns}
            rowKey={rowKey}
        />
    );

}

export default memo(EditableTable);
