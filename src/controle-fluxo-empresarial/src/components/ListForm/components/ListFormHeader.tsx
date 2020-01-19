import React, { memo, useState, useContext } from 'react';
import { Input, Col, Button } from 'antd';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';
import { ListItem } from '../ListForm';
import BasicLayoutContext, { FormMode } from '../../../layouts/BasicLayout/BasicLayoutContext';


export interface Props<T> {
    tableProps: ListItem<T>;
}

const ListFormHeader: React.FC<Props<any> & RouteComponentProps> = (props) => {

    //#region Constantes

    const [filterValues, setFilterValues] = useState<string>()
    const { formMode, setFormMode } = useContext(BasicLayoutContext);
    //#endregion


    return (
        <>
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
                    <Link to={(props.location.pathname + "/new").replace("//", "/")} onClick={() => setFormMode(FormMode.New)}>
                        Adicionar
                        </Link>
                </Button>
            </Col>

        </>
    );

}

export default withRouter(memo(ListFormHeader));
