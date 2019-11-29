import React, { memo, useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import { Input } from "../WithFormItem/withFormItem"
import { Input as InputAntd } from "antd"
import { withItemNone, ItemFormRender } from '../../hoc/WithFormItem';
import ModelForm, { ErrorMessage, Label } from '../ModalForm/ModalForm';
import { connect, FormikContextType, Field } from 'formik';

export interface Props<T> {
    path: string;
    errorMessage: ErrorMessage;
    label: Label;
    name: string;
    keyId?: string;
    keyDescription: string;
    required?: boolean;
}

const SelectModelOne: React.FC<Props<any> & { formik: FormikContextType<any> }> = (props) => {

    const [visible, setVisible] = useState(false);
    const keyId = props.keyId || "id";

    function setState(params: any) {
        props.formik.setFieldValue(props.name, params[keyId])
    }

    return (
        <>
            <Row>
                <Col span={2}>
                    <Input name={props.name} required={props.required} label={props.label.label} />
                </Col>
                <Col span={21}>
                    <ItemFormRender>
                        <InputAntd />
                    </ItemFormRender>
                </Col>
                <Col span={1} style={{ textAlign: "right" }} >
                    <ItemFormRender>
                        <Button type="primary" shape="circle" icon="search" onClick={() => setVisible(true)} ></Button>
                    </ItemFormRender>
                </Col>

            </Row>

            <ModelForm
                required={props.required}
                visible={visible}
                setVisible={setVisible}
                setState={setState}
                state={{ [keyId]: Number(props.formik.values[props.name]) }}
                label={props.label}
                errorMessage={props.errorMessage}
                path={props.path} />
        </>
    );

}

export default connect<Props<any>, {}>(SelectModelOne);
