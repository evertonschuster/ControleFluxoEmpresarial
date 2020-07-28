import React from 'react'
import { AxiosResponse } from 'axios';
import { ColumnProps } from 'antd/lib/table';
import { Label, ErrorMessage } from '../ModalForm/ModalForm';
import { PaginationResult, PaginationQuery } from '../../models/BaseEntity';
import { Table, Row, Col, Button, Tooltip, Tag } from 'antd';
import { useField } from 'formik';
import { WithItemNone } from '../../hoc/WithFormItem';
import SelectModelMore from './SelectModelMore';

export interface Props {
    keyId?: string;
    keyDescription?: string;
    required?: boolean;
    name: string;
    label: Label;
    columns: ColumnProps<any>[];
    errorMessage: ErrorMessage;
    path: string;
    fetchMethod: (id: number) => Promise<AxiosResponse<any>>;
    getListPagined: (filter: PaginationQuery) => Promise<AxiosResponse<PaginationResult<any>>>;
}

const SelectModelMoreWithTable: React.FC<Props> = (props) => {

    const [, metaTable, helperTable] = useField<any[]>({ name: props.name });
    // const [data, setData] = useState<any[]>(metaTable.value ?? [])
    const [, meta, helper] = useField<any[]>({ name: props.name + "SelectionIds" })

    const keyId = props.keyId || "id";
    const keyDescription = props.keyDescription || "nome";

    const columns = props.columns.concat({
        width: 100,
        title: "Ações",
        render: renderAction
    })


    function onSaveClick() {

        let lefJoin = meta.value.filter(e => {
            return (metaTable.value ?? []).filter((ee) => ee[keyId] === e[keyId]).length === 0
        });

        let value = [...(metaTable.value ?? []), ...lefJoin];
        helperTable.setValue(value);

        helper.setValue([]);
    }

    function onRemoveClick(record: any) {
        helperTable.setValue(metaTable.value.filter(e => e[keyId] !== record[keyId]))
    }

    function renderAction(text: any, record: any, index: number) {

        return (
            <Tooltip placement="top" title="Remove o Registro Selecionado." >
                <Tag color="red" key={index + "23"} className="custom-cursor-pointer" onClick={() => {
                    onRemoveClick(record)
                }} >Remover</Tag>
            </Tooltip>
        );
    }

    return (
        <>
            <Row justify="end" >

                <Col span={12}>
                    <WithItemNone>
                        <div className="ant-col ant-form-item-label">
                            <label className={props.required ? "ant-form-item-required" : ""}>{props.label.label ?? <>&nbsp;</>}</label>
                        </div>
                    </WithItemNone>
                </Col>
                <Col span={10}>
                    <WithItemNone>
                        <SelectModelMore
                            fetchMethod={props.fetchMethod}
                            name={props.name + "SelectionIds"}
                            keyDescription={keyDescription}
                            keyId={keyId}
                            required={props.required}
                            showLabel={false}
                            label={props.label}
                            errorMessage={props.errorMessage}
                            getListPagined={props.getListPagined}
                            path={props.path} />
                    </WithItemNone>
                </Col>
                <Col span={2} >
                    <WithItemNone>
                        <Button onClick={onSaveClick}>Incluir</Button>
                    </WithItemNone>
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                    <WithItemNone >
                        <Table columns={columns} dataSource={metaTable.value} size="small" rowKey="id" />
                    </WithItemNone>
                </Col>
            </Row>
        </>
    )
}

export default SelectModelMoreWithTable
