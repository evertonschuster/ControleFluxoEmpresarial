import React, { memo } from 'react';
import { Row, Col } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { PaginationQuery } from '../../hoc/UseListPagined';
import ListFormTable from './components/ListFormTable';
import ListFormHeader from './components/ListFormHeader';

export interface TableProps<T> {
    dataSource: T[];
    current: number;
    pageSize: number;
    total: number;
}

export interface ListItem<T> {
    requestResult: TableProps<T>;
    isLoading: boolean;
    filterRequest: PaginationQuery;
    setFilterRequest: (values: PaginationQuery) => void
    reflesh: () => void;
}

export interface Props<T> {
    tableProps: ListItem<T>;
    columns: ColumnProps<T>[];
    keyProp?: string;
    deleteFunction: (id: number) => void
}

const ListForm: React.FC<Props<any>> = (props) => {

    return (
        <>
            <Row style={{ paddingBottom: "20px" }}>
                <ListFormHeader tableProps={props.tableProps} />
            </Row>

            <Row>
                <Col>
                    <ListFormTable
                        deleteFunction={props.deleteFunction}
                        keyProp={props.keyProp}
                        columns={props.columns}
                        tableProps={props.tableProps}
                    />
                </Col>
            </Row>
        </>
    );

}

export default memo(ListForm);
