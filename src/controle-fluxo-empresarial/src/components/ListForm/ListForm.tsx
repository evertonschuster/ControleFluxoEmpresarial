import React, { useContext, memo } from 'react';
import { Table, Input, Row, Col, Button, Divider, Tag } from 'antd';
import { ColumnProps, TableRowSelection } from 'antd/lib/table';
import BasicLayoutContext, { FormMode } from '../../layouts/BasicLayout/BasicLayoutContext';
import ModalFormContext from '../ModalForm/ModalFormContext';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

export interface Props<T> {
    dataSource: T[];
    columns: ColumnProps<T>[];
    keyProp?: string;
}

const ListForm: React.FC<Props<any> & RouteComponentProps> = (props) => {

    //#region Constantes
    const { formMode } = useContext(BasicLayoutContext);;
    const { setState, state } = useContext(ModalFormContext);

    const isSelectMode = formMode == FormMode.SelectMultiple || formMode == FormMode.SelectOne;
    const key = props.keyProp || "id";
    const ListSelectedItem: any[] = state ? [].concat(state) : [];


    const columns = props.columns.concat({
        title: 'Ações',
        key: 'action',
        width: "150px",
        render: (text: any, record: any, index: number) => (
            <>
                <Tag color="green" key={index + "12"}>Editar</Tag>
                <Tag color="red" key={index + "23"}>Excluir</Tag>
            </>
        ),
    })

    //#endregion

    const rowSelection: TableRowSelection<any> = {
        // selections: false,
        type: formMode == FormMode.SelectMultiple ? "checkbox" : "radio",
        onChange: onChange,
        selectedRowKeys: ListSelectedItem.map(e => e[key])
    }


    function onChange<T>(selectedRowKeys: string[] | number[], selectedRows: T[]) {
        setState(selectedRows);
    }

    function onClick(record: any, index: number, arg: React.MouseEvent) {
        if (!isSelectMode) return;

        if (FormMode.SelectOne == formMode) {
            setState([record]);
            return;
        }


        let newState = ListSelectedItem;

        if (ListSelectedItem.find(e => e[key] == record[key]) == undefined) {
            newState = ListSelectedItem.concat(record);
        }
        else {
            newState = ListSelectedItem.filter(e => e[key] != record[key]);
        }

        setState(newState);
    }

    return (
        <>
            <Row style={{ paddingBottom: "20px" }}>
                <Col span={10}>
                    <Input placeholder="Filtrar" />
                </Col>
                <Col span={1} style={{ textAlign: "center" }}>
                    <Button type="primary" shape="circle" icon="search" />
                </Col>

                <Col span={2} push={11} style={{ textAlign: "right" }}>
                    <Button type="primary">
                        <Link to={props.location.pathname + "/new"}>
                            Adicionar
                        </Link>
                    </Button>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Table
                        rowSelection={isSelectMode ? rowSelection : undefined}
                        onRow={(record: any, index: number) => { return { onClick: (arg: React.MouseEvent) => { onClick(record, index, arg) } } }}
                        columns={columns}
                        dataSource={props.dataSource}
                        bordered={true}
                        rowKey={(record: any, index: number) => record[key]}
                        // scroll={{ y: 3000 }}
                        useFixedHeader={true}
                        size="small" />
                </Col>
            </Row>
        </>
    );

}

export default withRouter(memo(ListForm));
