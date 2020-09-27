import React, { memo, useState, useContext, ReactNode } from 'react';
import { Input, Col, Button } from 'antd';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';
import { ListItem } from '../../../../components/ListForm/ListForm';
import BasicLayoutContext, { FormMode } from '../../../../layouts/BasicLayout/BasicLayoutContext';
import ListFilterAdvanced, { situationFilter } from './ListFilterAdvanced';
import SelectionGenerics from './components/SelectionGenerics';


export interface Props<T> {
    tableProps: ListItem<T>;
}

const ListFormHeader: React.FC<Props<any> & RouteComponentProps> = (props) => {

    //#region Constantes

    const [filterValues, setFilterValues] = useState<string>()
    const [situacao, setSituacao] = useState<situationFilter[]>([])
    const { setFormMode } = useContext(BasicLayoutContext);

    //#endregion

    if (props.tableProps.isAdvancedFilter) {
        return <ListFilterAdvanced tableProps={props.tableProps} />
    }

    return (
        <>
            <Col span={10}>
                <Input placeholder="Filtrar" value={filterValues}
                    onChange={(event) => { setFilterValues(event.target.value) }}
                    onPressEnter={() => {
                        props.tableProps.setFilterRequest({ ...props.tableProps.filterRequest, currentPage: 1, filter: filterValues, situacao })
                    }} />
            </Col>

            <Col span={8} >
                <div style={{ flexDirection: "row", display: "flex" }}>
                    <div style={{ paddingLeft: 16 }}>
                        <SelectionGenerics situacao={situacao} setSituacao={setSituacao} />
                    </div>

                    <div style={{ paddingLeft: 16 }}>
                        <Button type="primary" icon="search"
                            onClick={() => {
                                props.tableProps.setFilterRequest({ ...props.tableProps.filterRequest, currentPage: 1, filter: filterValues, situacao })
                            }} />
                    </div>
                </div>
            </Col>

            <Col span={6} style={{ textAlign: "right" }}>
                <div style={{ flexDirection: "row" }}>
                    <Button type="default" style={{ marginRight: 16 }} onClick={() => props.tableProps.setAdvancedFilter!(true)}>Filtro Avançado</Button>

                    <Button type="primary">
                        <Link to={("compras/new").replace("//", "/")} onClick={() => setFormMode(FormMode.New)}>
                            Adicionar
                        </Link>
                    </Button>
                </div>
            </Col>

        </>
    );

}

export default withRouter(memo(ListFormHeader));
