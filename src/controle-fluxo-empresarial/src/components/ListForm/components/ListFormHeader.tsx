import React, { memo, useState, useContext } from 'react';
import { Input, Col, Button, Select } from 'antd';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';
import { ListItem } from '../ListForm';
import BasicLayoutContext, { FormMode } from '../../../layouts/BasicLayout/BasicLayoutContext';
import SelectFilterSituation from '../../Situation/SelectFilterSituation/SelectFilterSituation';
import { SITUACAO } from '../../../models/BaseEntity';


export interface Props<T> {
    tableProps: ListItem<T>;
}

const ListFormHeader: React.FC<Props<any> & RouteComponentProps> = (props) => {

    //#region Constantes

    const [filterValues, setFilterValues] = useState<string>()
    const [situacao, setSituacao] = useState<SITUACAO>()
    const { setFormMode } = useContext(BasicLayoutContext);

    const { Option } = Select;
    //#endregion


    return (
        <>
            <Col span={10}>
                <Input placeholder="Filtrar" value={filterValues}
                    onChange={(event) => { setFilterValues(event.target.value) }}
                    onPressEnter={() => {
                        props.tableProps.setFilterRequest({ ...props.tableProps.filterRequest, currentPage: 1, filter: filterValues, situacao })
                    }} />
            </Col>

            <Col span={2} style={{ textAlign: "center" }}>
                <SelectFilterSituation onChange={(value) => setSituacao(value)} />
            </Col>

            <Col span={1} >
                <Button type="primary" icon="search"
                    onClick={() => {
                        props.tableProps.setFilterRequest({ ...props.tableProps.filterRequest, currentPage: 1, filter: filterValues, situacao })
                    }} />
            </Col>


            <Col span={3} push={8} style={{ textAlign: "right" }}>
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
