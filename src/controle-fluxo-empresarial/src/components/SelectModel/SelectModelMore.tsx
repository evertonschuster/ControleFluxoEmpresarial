import React, { useState, useEffect } from 'react'
import { AxiosResponse } from 'axios';
import { Form, Row, Col, Button, Select } from 'antd';
import { FormMode } from '../../layouts/BasicLayout/BasicLayoutContext';
import { ItemFormRender, WithItemNone } from '../../hoc/WithFormItem';
import { PaginationResult, PaginationQuery } from '../../models/BaseEntity';
import { useDebouncedCallback } from '../../hoc/useDebouncedCallback';
import { useField } from 'formik';
import { UseListPagined } from '../../hoc/UseListPagined';
import ModelForm, { ErrorMessage, Label } from '../ModalForm/ModalForm';

export interface Props {
    path: string;
    errorMessage: ErrorMessage;
    label: Label;
    name: string;
    keyId?: string;
    keyDescription: string;
    required?: boolean;
    fetchMethod: (id: number) => Promise<AxiosResponse<any>>;
    getListPagined: (filter: PaginationQuery) => Promise<AxiosResponse<PaginationResult<any>>>;
    showLabel?: boolean;
    showDescription?: boolean;
    ObjectName?: string;
}


const SelectModelMore: React.FC<Props> = (props) => {

    const { Option } = Select;
    const keyId = props.keyId || "id";
    const keyDescription = props.keyDescription || "nome";
    const required = props.required || true;
    const showLabel = props.showLabel ?? true;

    // const [selected, setSelected] = useState<any[]>([]);
    const [dataSource, setDataSource] = useState<any[]>([])
    const [visible, setVisible] = useState(false);
    const [, meta, helpers] = useField<any[]>({ name: props.name });
    const response = UseListPagined({ getListPagined: props.getListPagined  });

    function setState(params: any[]) {
        setDataSource(params)
        helpers.setValue(params);
    }

    const onSearch = useDebouncedCallback(async (text: string) => {
        response.setFilterRequest({
            ...response.filterRequest,
            currentPage: 1,
            filter: text
        });
    }, 500);

    function onSelect(value: string) {
        let newSelection = dataSource.find(e => e[keyId] === value);

        let newState = [...meta.value ?? [], newSelection];
        helpers.setValue(newState);

        response.setFilterRequest({
            ...response.filterRequest,
            currentPage: 1,
            filter: undefined
        })
    }

    function onDeselect(value: any) {
        let newState = meta.value?.filter(e => e[keyId] !== value);
        helpers.setValue(newState);
    }

    function onDropdownVisibleChange(visible: boolean) {
        if (visible) {
            setDataSource(response.requestResult.dataSource)
        }
    }

    useEffect(() => {
        setDataSource(response.requestResult.dataSource)
    }, [response.requestResult.dataSource])


    return (
        <>
            <Form.Item
                className="select-model-one-style-item"
                validateStatus={meta.error && meta.touched ? "error" : "validating"}
                help={meta.error && meta.touched ? meta.error : ""}>
                <Row>

                    <Col md={21} >
                        <ItemFormRender showLabel={showLabel} required={required} label={props.label.label}>
                            <Select
                                filterOption={false}
                                loading={response.isLoading}
                                onSearch={onSearch}
                                mode="multiple"
                                value={meta.value?.map(e => e[keyId])}
                                onSelect={onSelect}
                                onDeselect={onDeselect}
                                onDropdownVisibleChange={onDropdownVisibleChange}
                            >
                                {dataSource.map(e => {
                                    return <Option key={e[keyId]} value={e[keyId]} title={e[keyDescription]} >{e[keyDescription]}</Option>;
                                })}
                            </Select>
                        </ItemFormRender>
                    </Col>
                    <Col md={3} style={{ textAlign: "center" }} >
                        <WithItemNone showLabel={showLabel} padding={false} >
                            <Button type="primary" icon="search" onClick={() => setVisible(true)} ></Button>
                        </WithItemNone>
                    </Col>
                </Row>

                <ModelForm
                    required={props.required}
                    visible={visible}
                    formMode={FormMode.SelectMultiple}
                    setVisible={setVisible}
                    setState={setState}
                    state={meta.value ?? []}
                    label={props.label}
                    errorMessage={props.errorMessage}
                    path={props.path} />
            </Form.Item>
        </>
    );
}

export default SelectModelMore
