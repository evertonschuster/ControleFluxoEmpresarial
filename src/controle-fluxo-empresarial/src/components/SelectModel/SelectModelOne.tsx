import React, { memo, useState } from 'react';
import { Row, Col, Button } from 'antd';
import { Input } from "../WithFormItem/withFormItem"
import { Input as InputAntd } from "antd"
import { withItemNone, ItemFormRender } from '../../hoc/WithFormItem';
import ModelForm, { ErrorMessage, Label } from '../ModalForm/ModalForm';

export interface Props<T> {
    setState: (values: T | T[]) => void;
    state: T | T[];
    path: string;
    errorMessage: ErrorMessage;
    label: Label;
    name: string;
    keyId: string;
    keyDescription: string;
}

const SelectModelOne: React.FC<Props<any>> = (props) => {

    const InputForm = withItemNone(InputAntd);
    const [visible, setVisible] = useState(false)
    const itemObject = ((props.state || [])[0] || {})

    return (
        <>
            <Row>
                <Col span={2}>
                    <Input name={props.name} required={true} label="Pais" value={itemObject[props.keyId]} />
                </Col>
                <Col span={20}>
                    <InputForm value={itemObject[props.keyDescription]} readOnly={true} />
                </Col>
                <Col span={2} style={{ textAlign: "right" }} >
                    <ItemFormRender>
                        <Button type="primary" shape="circle" icon="search" onClick={() => setVisible(true)} ></Button>
                    </ItemFormRender>
                </Col>

            </Row>

            <ModelForm
                visible={visible}
                setVisible={setVisible}
                setState={props.setState}
                state={props.state}
                label={props.label}
                errorMessage={props.errorMessage}
                path={props.path} />
        </>
    );

}

export default memo(SelectModelOne);
