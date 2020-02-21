import React, { memo } from 'react';
import { Table } from 'antd';
import { ColumnProps, TableComponents } from 'antd/lib/table';
import EditableFormRow from './Components/EditableFormRow';
import EditableCell from './Components/EditableCell';
import { useField } from 'formik';
import EditableCellAction from './Components/EditableCellAction';

export enum RowMode {
    edit = "edit",
    new = 'new',
    remove = 'remove',
    view = 'view'
}

export interface ColumnEditableProps<T> extends ColumnProps<T> {
    editable?: boolean;
    renderEditable?: (text: any, record: T, index: number) => React.ReactNode;
}

export interface Props<T> {
    columns: ColumnEditableProps<T>[];
    rowKey?: string;
    initiallValues: T;
    name: string;
    validationSchema?: any | (() => any);
}

export interface Record {
    rowMode: RowMode
}

const EditableTable: React.FC<Props<any>> = (props) => {

    const [field, , helpers] = useField(props.name);
    const rowKey = props.rowKey ?? "id";
    const dataSource = field.value as any[];

    const components: TableComponents = {
        body: {
            row: EditableFormRow,
            cell: EditableCell,
        },
    };

    const columnsAction = props.columns.concat({
        key: "Action",
        title: "Ações",
        width: "180px",
        render: (text: any, record: Record, index: number) => <EditableCellAction index={index} record={record} handleRowMode={handleRowMode} handleRemove={handleRemove} />
    });

    const columns: ColumnProps<any>[] = columnsAction.map((col: ColumnEditableProps<any>) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Record, rowIndex: number) => ({
                record,
                editable: col.editable ?? false,
                dataIndex: col.dataIndex,
                title: col.title,
                renderEditable: col.renderEditable,
                rowIndex: rowIndex
            }),
        };
    });

    function handleSave(values: Record & any) {

        const dataSourceNew = dataSource.map(e => e[rowKey] !== values[rowKey] ? e : { ...values, rowMode: RowMode.view });
        helpers.setValue(dataSourceNew);
    }

    function handleRemove(values: Record & any) {

        const dataSourceNew = dataSource.filter(e => e[rowKey] !== values[rowKey]);
        helpers.setValue(dataSourceNew);
    }

    function handleRowMode(record: Record & any, rowMode: RowMode) {
        const dataSourceNew = dataSource.map(e => e[rowKey] !== record[rowKey] ? e : { ...record, rowMode });
        helpers.setValue(dataSourceNew);
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
            size="small"
            onRow={(record: any, index: any) => ({
                index,
                record,
                initiallValues: props.initiallValues,
                handleSave: handleSave,
                validationSchema: props.validationSchema
            })}
        />
    );

}

export default memo(EditableTable);