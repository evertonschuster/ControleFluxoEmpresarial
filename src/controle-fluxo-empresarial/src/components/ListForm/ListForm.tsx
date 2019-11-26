import React, { useContext } from 'react';
import { Table, Input, Row, Col, Button, Divider, Tag } from 'antd';
import { ColumnProps, TableRowSelection } from 'antd/lib/table';
import BasicLayoutContext, { FormMode } from '../../layouts/BasicLayout/BasicLayoutContext';
import ModalFormContext from '../ModalForm/ModalFormContext';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

export interface Props<T> {
    dataSource: T[];
    columns: ColumnProps<T>[];
}

const ListForm: React.FC<Props<any> & RouteComponentProps> = (props) => {

    //#region Constantes
    const { formMode } = useContext(BasicLayoutContext);
    const { setState, state } = useContext(ModalFormContext)

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
        // selectedRowKeys: (state || []).map(e => e.key)
    }


    function onChange<T>(selectedRowKeys: string[] | number[], selectedRows: T[]) {
        setState(selectedRows);
        console.log("selectedRows", selectedRows)
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
                        rowSelection={formMode == FormMode.SelectMultiple || formMode == FormMode.SelectOne ? rowSelection : undefined}
                        columns={columns}
                        dataSource={props.dataSource}
                        bordered={true}
                        // scroll={{ y: 3000 }}
                        useFixedHeader={true}
                        size="small" />
                </Col>
            </Row>
        </>
    );

}

export default withRouter(ListForm);
