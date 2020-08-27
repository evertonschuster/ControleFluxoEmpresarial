import React, { useState, useEffect, memo, useCallback, useMemo } from 'react';
import "./select-model-one-style.css";
import { AxiosResponse } from 'axios';
import { FormMode } from '../../layouts/BasicLayout/BasicLayoutContext';
import { Input as InputAntd, InputNumber } from "antd"
import { ItemFormRender, WithItemNone } from '../../hoc/WithFormItem';
import { Row, Col, Button, Form } from 'antd';
import { useDebouncedCallback } from '../../hoc/useDebouncedCallback';
import { useField, useFormikContext } from 'formik';
import ModelForm, { ErrorMessage, Label } from '../ModalForm/ModalForm';

export interface ICol {
    inputId?: number,
    btnSearch?: number,
    inputDescription?: number,
}

export interface Props {
    path: string;
    errorMessage: ErrorMessage;
    label: Label;
    name: string;
    keyId?: string;
    idIsInt?: boolean;
    keyDescription: string;
    required?: boolean;
    fetchMethod: (id: number) => Promise<AxiosResponse<any>>;
    showLabel?: boolean;
    showDescription?: boolean;
    objectName?: string;
    col?: ICol;
    disabled?: boolean;
}


const SelectModelOne: React.FC<Props> = (props) => {

    const [visible, setVisible] = useState(false);
    const [object, setObject] = useState<any>(null);
    const keyId = props.keyId ?? "id";
    const idIsInt = props.idIsInt ?? true;
    const keyDescription = props.keyDescription ?? "nome";
    const required = props.required ?? true;
    const showLabel = props.showLabel ?? true;
    const [field, meta, helpers] = useField(props.name);
    const [, , helpersObject] = useField(props.objectName ?? props.name); //Todo
    const { setSubmitting, isSubmitting } = useFormikContext();
    const showDescription = props.showDescription !== false;
    useEffect(() => {
        let id = field.value;
        handleClick(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [field.value, visible])

    async function getDesciptionValues(id: number) {
        if (id) {
            let respose = await props.fetchMethod(id);
            if (respose.data) {
                setObject(respose.data);

                if (props.objectName) {
                    helpersObject.setValue(respose.data)
                }
            } else {
                helpersObject.setValue(null)
                setObject(null);
            }
        } else {
            helpersObject.setValue(null)
            setObject(object)
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

    function onChangeId(value: any | undefined) {
        helpers.setValue(value ?? null);
        helpers.setTouched(true);
    }

    function onBlurId() {
        helpers.setTouched(true)
    }

    const validateStatus = useMemo(() => {
        if (meta.error && meta.touched) {
            return "error"
        }
        if (object?.situacao) {
            return "warning"
        }
        return "validating"
    }, [object?.situacao, meta.error, meta.touched])

    const helpMessage = useMemo(() => {
        if (meta.error && meta.touched) {
            return meta.error;
        }
        if (object?.situacao) {
            return props.label.label + " desativado(a).";
        }
        return "";
    }, [meta.error, meta.touched, object?.situacao])

    return (
        <>
            <Form.Item
                className="select-model-one-style-item"
                validateStatus={validateStatus}
                help={helpMessage}>
                <Row>
                    <Col span={(props.col?.inputId) ?? (showDescription ? 8 : 19)} >
                        <ItemFormRender showLabel={showLabel} label={props.label.label} required={required}>
                            {idIsInt ?
                                <InputNumber min={0} value={meta.value} onChange={onChangeId} onBlur={onBlurId} style={{ width: "inherit" }} disabled={props.disabled} />
                                :
                                <InputAntd value={meta.value} onChange={(e) => onChangeId(e.target.value)} onBlur={onBlurId} disabled={props.disabled}></InputAntd>
                            }
                        </ItemFormRender>
                    </Col>
                    {props.disabled ? undefined :
                        <Col span={(props.col?.btnSearch) ?? (showDescription ? 3 : 5)} style={{ textAlign: "center" }} >
                            <WithItemNone showLabel={showLabel} padding={false} >
                                <Button type="primary" icon={isSubmitting ? "loading" : "search"} onClick={() => setVisible(true)} disabled={props.disabled} />
                            </WithItemNone>
                        </Col>
                    }
                    {showDescription && <Col span={((props.col?.inputDescription) ?? 13) + (props.disabled ? (showDescription ? 3 : 5) : 0)} >
                        <WithItemNone showLabel={showLabel}>
                            <InputAntd value={object && object[keyDescription]} disabled={true} />
                        </WithItemNone>
                    </Col>}
                </Row>

                <ModelForm
                    required={props.required}
                    visible={visible}
                    formMode={FormMode.SelectOne}
                    setVisible={setVisible}
                    setState={setState}
                    state={isNaN(field.value) ? { [keyId]: field.value } : { [keyId]: Number(field.value) }}
                    label={props.label}
                    errorMessage={props.errorMessage}
                    path={props.path} />
            </Form.Item>
        </>
    );

}

export default memo(SelectModelOne);
