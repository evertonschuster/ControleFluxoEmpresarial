import React, { useState, useEffect, memo } from 'react';
import { Row, Col, Button, Form } from 'antd';
import { Input as InputAntd, InputNumber } from "antd"
import { ItemFormRender, WithItemNone } from '../../hoc/WithFormItem';
import ModelForm, { ErrorMessage, Label } from '../ModalForm/ModalForm';
import { useField, useFormikContext } from 'formik';
import { useDebouncedCallback } from '../../hoc/useDebouncedCallback';
import { AxiosResponse } from 'axios';
import "./select-model-one-style.css";
import { FormMode } from '../../layouts/BasicLayout/BasicLayoutContext';

export interface Props {
    path: string;
    errorMessage: ErrorMessage;
    label: Label;
    name: string;
    keyId?: string;
    keyDescription: string;
    required?: boolean;
    fetchMethod: (id: number) => Promise<AxiosResponse<any>>;
    showLabel?: boolean;
    showDescription?: boolean;
    ObjectName?: string;
}


const SelectModelOne: React.FC<Props> = (props) => {

    const [visible, setVisible] = useState(false);
    const [description, setDescription] = useState("")
    const keyId = props.keyId || "id";
    const keyDescription = props.keyDescription || "nome";
    const required = props.required || true;
    const showLabel = props.showLabel ?? true;
    const [field, meta, helpers] = useField(props.name);
    const [, , helpersObject] = useField(props.ObjectName ?? props.name); //Todo
    const { setSubmitting } = useFormikContext();
    const showDescription = props.showDescription !== false;

    useEffect(() => {
        let id = field.value;
        handleClick(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [field.value])

    async function getDesciptionValues(id: number) {

        if (id) {
            let respose = await props.fetchMethod(id);
            if (respose.data) {
                setDescription(respose.data[keyDescription]);

                if (props.ObjectName) {
                    helpersObject.setValue(respose.data)
                }
            } else {
                setDescription("");
            }
        } else {
            setDescription("")
        }
    }

    function setState(params: any) {
        let id = params[keyId];
        helpers.setValue(id);
    }

    const handleClick = useDebouncedCallback(async (id) => {
        try {
            setSubmitting(true)
            await getDesciptionValues(id);

        } finally {
            setSubmitting(false)
        }
    }, 500);


    return (
        <>
            <Form.Item
                className="select-model-one-style-item"
                validateStatus={meta.error && meta.touched ? "error" : "validating"}
                help={meta.error && meta.touched ? meta.error : ""}>
                <Row>
                    <Col md={showDescription ? 8 : 19} >
                        <ItemFormRender showLabel={showLabel} label={props.label.label} required={required}>
                            <InputNumber min={0} value={meta.value} onChange={(value) => { helpers.setValue(value); helpers.setTouched(true) }} style={{ width: "inherit" }} />
                        </ItemFormRender>
                    </Col>
                    <Col md={showDescription ? 3 : 5} style={{ textAlign: "center" }} >
                        <WithItemNone showLabel={showLabel} padding={false} >
                            <Button type="primary" icon="search" onClick={() => setVisible(true)} ></Button>
                        </WithItemNone>
                    </Col>
                    {showDescription && <Col md={13} >
                        <WithItemNone showLabel={showLabel}>
                            <InputAntd value={description} />
                        </WithItemNone>
                    </Col>}
                </Row>

                <ModelForm
                    required={props.required}
                    visible={visible}
                    formMode={FormMode.SelectOne}
                    setVisible={setVisible}
                    setState={setState}
                    state={isNaN(field.value) ? [] : { [keyId]: Number(field.value) }}
                    label={props.label}
                    errorMessage={props.errorMessage}
                    path={props.path} />
            </Form.Item>
        </>
    );

}

export default memo(SelectModelOne);
