import React, { memo } from 'react';
import { Table, Form } from 'antd';
import { ColumnProps, TableComponents } from 'antd/lib/table';
import EditableFormRow from './Components/EditableFormRow';
import EditableCell from './Components/EditableCell';
import { useField } from 'formik';
import EditableCellAction from './Components/EditableCellAction';
import "./editable-table-style.css"
import EditableRowFooter from './Components/EditableRowFooter';

export enum RowMode {
    edit = "edit",
    new = 'new',
    remove = 'remove',
    view = 'view'
}

export enum TypeAttribute {
    number = "number",
    text = "text"
}

export interface ColumnEditableProps<T> extends ColumnProps<T> {
    editable?: boolean;
    renderEditable?: (text: any, record: T, index: number) => React.ReactNode;
    type?: TypeAttribute;
}

export interface Props<T> {
    columns: ColumnEditableProps<T>[];
    rowKey?: string;
    initiallValues: T;
    name: string;
    validationSchema?: any | (() => any);
}

export interface RecordTable {
    rowMode: RowMode
    tableKey: string;
}

const EditableTable: React.FC<Props<any>> = (props) => {

    const [field, meta, helpers] = useField(props.name);
    const rowKey = props.rowKey ?? "id";
    const dataSource = mapRecord(field.value as any[]);

    const components: TableComponents = {
        body: {
            row: EditableFormRow,
            cell: EditableCell,
        },
    };

    const errorStyle: React.CSSProperties = {
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "red",
        borderRadius: "5px",
    }

    const hasListError = !Array.isArray(meta.error) && (meta.error?.length ?? "") > 2;

    const columnsAction = props.columns.concat({
        key: "Action",
        title: "Ações",
        width: "180px",
        render: (text: any, record: RecordTable, index: number) => <EditableCellAction index={index} record={record} handleRowMode={handleRowMode} handleRemove={handleRemove} />
    });

    const columns: ColumnProps<any>[] = columnsAction.map((col: ColumnEditableProps<any>) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: RecordTable, rowIndex: number) => ({
                record,
                editable: col.editable ?? false,
                dataIndex: col.dataIndex,
                title: col.title,
                renderEditable: col.renderEditable,
                type: col.type ?? TypeAttribute.text,
                rowIndex: rowIndex
            }),
        };
    });

    function handleSave(values: RecordTable & any) {

        const dataSourceNew = dataSource.map(e => e.tableKey !== values.tableKey ? e : { ...values, rowMode: RowMode.view });
        helpers.setValue(dataSourceNew);
    }

    function handleRemove(values: RecordTable & any) {

        const dataSourceNew = dataSource.filter(e => e.tableKey !== values.tableKey);
        helpers.setValue(dataSourceNew);
    }

    function handleRowMode(record: RecordTable & any, rowMode: RowMode) {

        const dataSourceNew = dataSource.map(e => e.tableKey !== record.tableKey ? e : { ...record, rowMode });
        helpers.setValue(dataSourceNew);
    }

    function handleRowNew() {

        let mapedDataSource = mapRecord(dataSource.concat({ ...props.initiallValues, rowMode: RowMode.new }));
        helpers.setValue(mapedDataSource);

    }

    function mapRecord(dataSource: RecordTable[]): RecordTable[] {
        return (dataSource || []).map((e) => {
            return { ...e, rowMode: e.rowMode ?? RowMode.view, tableKey: e.tableKey ?? (e as any)[rowKey] ?? Date.now() }
        });
    }



    return (
        <>
            <Table
                style={hasListError ? errorStyle : {}}
                components={components}
                bordered
                dataSource={dataSource}
                columns={columns}
                rowKey="tableKey"
                size="small"
                onRow={(record: any, index: any) => ({
                    index,
                    record,
                    initiallValues: props.initiallValues,
                    handleSave: handleSave,
                    validationSchema: props.validationSchema
                })}
                pagination={{}}
                footer={() => <EditableRowFooter onNewRow={handleRowNew} />}
            />

            <Form.Item
                validateStatus="error"
                help={hasListError ? meta.error : ""}
            >
            </Form.Item>
        </>
    );

}

export default memo(EditableTable, () => false);
