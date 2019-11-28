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

    const InputForm = withItemNone(InputAntd);
    const [visible, setVisible] = useState(false);
    const keyId = props.keyId || "id";

    function setState(params: any) {

    }

    return (
        <>
            <Row>
                <Col span={2}>
                    <Input name={props.name} required={props.required} label={props.label.label} />
                </Col>
                <Col span={20}>
                    <Field type="email" name="email" />
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
                state={props.formik.values}
                label={props.label}
                errorMessage={props.errorMessage}
                path={props.path} />
        </>
    );

}

export default connect<Props<any>, {}>(SelectModelOne);
