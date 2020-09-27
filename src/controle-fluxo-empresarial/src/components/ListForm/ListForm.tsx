import React, { FunctionComponent, memo, ReactNode, useContext, useEffect } from 'react';
import { Row, Col } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { PaginationQuery } from '../../models/BaseEntity';
import ListFormTable from './components/ListFormTable';
import ListFormHeader from './components/ListFormHeader';
import BasicLayoutContext, { FormMode } from '../../layouts/BasicLayout/BasicLayoutContext';

export interface TableProps<T> {
    dataSource: T[];
    current: number;
    pageSize: number;
    total: number;
}

export interface ListItem<T> {
    requestResult: TableProps<T>;
    isLoading: boolean;
    isAdvancedFilter?: boolean;
    filterRequest: PaginationQuery;
    setFilterRequest: (values: PaginationQuery | any) => void
    setAdvancedFilter?: React.Dispatch<React.SetStateAction<boolean | undefined>>,
    reflesh: () => void;
}

export interface Props<T> {
    tableProps: ListItem<T>;
    columns: ColumnProps<T>[];
    keyProp?: string;
    hiddenAction?: boolean;
    deleteFunction?: (id: any) => void
    desativarFunction?: (id: any) => void
    filterAdvancedHeader?: ReactNode
    filterSimpleHeader?: ReactNode
}

const ListForm: React.FC<Props<any>> = (props) => {

    const { formMode, setFormMode, sharedState, setSharedState } = useContext(BasicLayoutContext);

    useEffect(() => {

        if (formMode === FormMode.SelectMultiple || formMode === FormMode.SelectOne) {
            setSharedState({ ...sharedState, savedFormMode: formMode })
            return;
        }

        if (sharedState?.savedFormMode) {
            setFormMode(sharedState.savedFormMode);
            return;
        }

        setFormMode(FormMode.List);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Row style={{ paddingBottom: "20px" }}>
                {props.filterSimpleHeader ?
                    <>{props.filterSimpleHeader}</> :
                    <ListFormHeader tableProps={props.tableProps} filterAdvancedHeader={props.filterAdvancedHeader} />
                }
            </Row>

            <Row>
                <Col>
                    <ListFormTable
                        hiddenAction={props.hiddenAction}
                        deleteFunction={props.deleteFunction}
                        desativarFunction={props.desativarFunction}
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
