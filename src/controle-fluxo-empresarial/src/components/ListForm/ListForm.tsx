import React, { useContext, memo, useState, useEffect } from 'react';
import { Table, Input, Row, Col, Button, Tag, Tooltip } from 'antd';
import { ColumnProps, TableRowSelection } from 'antd/lib/table';
import BasicLayoutContext, { FormMode } from '../../layouts/BasicLayout/BasicLayoutContext';
import ModalFormContext from '../ModalForm/ModalFormContext';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { PaginationQuery } from '../../hoc/UseListPagined';

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
}

export interface Props<T> {
    tableProps: ListItem<T>;
    columns: ColumnProps<T>[];
    keyProp?: string;
}

const ListForm: React.FC<Props<any> & RouteComponentProps> = (props) => {

    //#region Constantes
    const { formMode } = useContext(BasicLayoutContext);;
    const { setState, state } = useContext(ModalFormContext);
    const [filterValues, setFilterValues] = useState<string>()

    const isSelectMode = formMode === FormMode.SelectMultiple || formMode === FormMode.SelectOne;
    const key = props.keyProp || "id";
    const ListSelectedItem: any[] = state ? [].concat(state) : [];


    const columns = props.columns.concat({
        title: 'Ações',
        key: 'action',
        width: "150px",
        render: (text: any, record: any, index: number) => (
            <>
                <Link to={(props.location.pathname + "/edit/" + record.id).replace("//", "/")}><Tooltip placement="top" title="Editar Registro Selecionado." > <Tag color="green" key={index + "12"}>Editar</Tag></Tooltip></Link>
                <Tooltip placement="top" title="Excluir Registro Selecionado." ><Tag color="red" key={index + "23"}>Excluir</Tag></Tooltip>
            </>
        ),
    })

    //#endregion

    const rowSelection: TableRowSelection<any> = {
        // selections: false,
        type: formMode === FormMode.SelectMultiple ? "checkbox" : "radio",
        onChange: onChangeRowSelection,
        selectedRowKeys: ListSelectedItem.map(e => e[key])
    }

    function onChangePagination(page: number, pageSize?: number) {
        props.tableProps.setFilterRequest({ ...props.tableProps.filterRequest, currentPage: page })
    }

    function onChangeRowSelection<T>(selectedRowKeys: string[] | number[], selectedRows: T[]) {
        setState(selectedRows);
    }

    function onClick(record: any) {
        if (!isSelectMode) return;

        if (FormMode.SelectOne === formMode) {
            setState([record]);
            return;
        }


        let newState = ListSelectedItem;

        if (ListSelectedItem.find(e => e[key] === record[key]) === undefined) {
            newState = ListSelectedItem.concat(record);
        }
        else {
            newState = ListSelectedItem.filter(e => e[key] !== record[key]);
        }

        setState(newState);
    }

    return (
        <>
            <Row style={{ paddingBottom: "20px" }}>
                <Col span={10}>
                    <Input placeholder="Filtrar" value={filterValues}
                        onChange={(event) => { setFilterValues(event.target.value) }}
                        onPressEnter={() => {
                            props.tableProps.setFilterRequest({ ...props.tableProps.filterRequest, currentPage: 1, filter: filterValues })
                        }} />
                </Col>
                <Col span={1} style={{ textAlign: "center" }}>
                    <Button type="primary" shape="circle" icon="search"
                        onClick={() => {
                            props.tableProps.setFilterRequest({ ...props.tableProps.filterRequest, currentPage: 1, filter: filterValues })
                        }} />
                </Col>

                <Col span={2} push={11} style={{ textAlign: "right" }}>
                    <Button type="primary">
                        <Link to={(props.location.pathname + "/new").replace("//", "/")}>
                            Adicionar
                        </Link>
                    </Button>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Table
                        pagination={{
                            current: props.tableProps.requestResult.current,
                            pageSize: props.tableProps.requestResult.pageSize,
                            total: props.tableProps.requestResult.total,
                            onChange: onChangePagination
                        }}
                        loading={props.tableProps.isLoading}
                        rowSelection={isSelectMode ? rowSelection : undefined}
                        onRow={(record: any, index: number) => { return { onClick: (arg: React.MouseEvent) => { onClick(record) } } }}
                        columns={columns}
                        dataSource={props.tableProps.requestResult.dataSource}
                        bordered={true}
                        rowKey={(record: any) => record[key]}
                        // scroll={{ y: 3000 }}
                        useFixedHeader={true}
                        size="small" />
                </Col>
            </Row>
        </>
    );

}

export default withRouter(memo(ListForm));
