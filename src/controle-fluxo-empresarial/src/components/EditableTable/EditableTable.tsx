import React, { memo, useState } from 'react';
import { Table, Tooltip, Tag } from 'antd';
import { ColumnProps, TableComponents } from 'antd/lib/table';
import EditableFormRow from './Components/EditableFormRow';
import EditableCell from './Components/EditableCell';
import { FormikHelpers } from 'formik';

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
    initiallValues: T
}

export interface Record {
    rowMode: RowMode
}

const EditableTable: React.FC<Props<any>> = (props) => {

    const dataSourceS: any = [
        { id: 2, nome: "Teste", idade: "45" },
        { id: 3, nome: "Teste", idade: "45", rowMode: RowMode.edit },
    ]

    const [dataSource, setDataSource] = useState<any[]>(dataSourceS);

    const rowKey = props.rowKey ?? "id";

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
        render: (text: any, record: Record, index: number) => (
            <>
                <Tooltip placement="top" title="Editar Registro Selecionado."  >
                    <Tag color="green" key={index + "12"} className="custom-cursor-pointer" >Editar</Tag>
                </Tooltip>
                <Tooltip placement="top" title="Editar Registro Selecionado."  >
                    <Tag color="red" key={index + "13"} className="custom-cursor-pointer" >Remover</Tag>
                </Tooltip>
            </>)
    });

    const columns: ColumnProps<any>[] = columnsAction.map((col: ColumnEditableProps<any>) => {
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
            }),
        };
    });

    function handleSave(values: Record, formikHelpers: FormikHelpers<Record>) {

    }

    function handleRowMode(record: Record, rowMode: RowMode) {
        dataSource.filter(e )
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
            onRow={(record: any, index: any) => ({
                index,
                record,
                initiallValues: props.initiallValues,
                handleSave: handleSave,
            })}
        />
    );

}

export default memo(EditableTable);
