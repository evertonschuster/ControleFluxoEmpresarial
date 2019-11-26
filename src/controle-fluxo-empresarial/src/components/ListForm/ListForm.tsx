import React, { useContext } from 'react';
import { Table, Input, Row, Col, Button } from 'antd';
import { ColumnProps, TableRowSelection } from 'antd/lib/table';
import BasicLayoutContext, { FormMode } from '../../layouts/BasicLayout/BasicLayoutContext';
import ModalFormContext from '../ModalForm/ModalFormContext';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

export interface Props<T>  {
    dataSource: T[];
    columns: ColumnProps<T>[];
}

const ListForm: React.FC<Props<any> & RouteComponentProps> = (props) => {


    const { formMode } = useContext(BasicLayoutContext);
    const { setState } = useContext(ModalFormContext)



    // {
    //     title: 'Action',
    //     key: 'action',
    //     render: (text: any, record: any) => (
    //         <span>
    //             <a>Invite {record.name}</a>
    //             <Divider type="vertical" />
    //             <a>Delete</a>
    //         </span>
    //     ),
    // },

    const rowSelection: TableRowSelection<any> = {
        // selections: false,
        type: formMode == FormMode.SelectMultiple ? "checkbox" : "radio",
        onChange: (selectedRowKeys: string[] | number[], selectedRows: any[]) => { setState(selectedRows) }
    }

    return (
        <>
            <Row>
                <Col span={10}>
                    <Input placeholder="Filtrar" />
                </Col>
                <Col span={2}>
                    <Button type="primary" shape="circle" icon="search" />
                </Col>

                <Col span={2} push={10}>
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
                        columns={props.columns}
                        dataSource={props.dataSource} />
                </Col>
            </Row>
        </>
    );

}

export default withRouter(ListForm);
