import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import { Input, InputNumber } from "../WithFormItem/withFormItem"
import { Input as InputAntd } from "antd"
import { ItemFormRender } from '../../hoc/WithFormItem';
import ModelForm, { ErrorMessage, Label } from '../ModalForm/ModalForm';
import { connect, FormikContextType, ErrorMessage as ErrorMessageFormik } from 'formik';
import { useDebouncedCallback } from '../../hoc/useDebouncedCallback';
import { AxiosResponse } from 'axios';

export interface Props {
    path: string;
    errorMessage: ErrorMessage;
    label: Label;
    name: string;
    keyId?: string;
    keyDescription: string;
    required?: boolean;
    fetchMethod: (id: number) => Promise<AxiosResponse<any>>;
}





const SelectModelOne: React.FC<Props & { formik: FormikContextType<any> }> = (props) => {

    const [visible, setVisible] = useState(false);
    const [description, setDescription] = useState("")
    const keyId = props.keyId || "id";
    const keyDescription = props.keyDescription || "nome";
    const required = props.required || true;


    useEffect(() => {
        let id = props.formik.values[props.name];
        handleClick(id);
    }, [props.formik.values[props.name]])

    async function getDesciptionValues(id: number) {

        if (id) {
            let respose = await props.fetchMethod(id);
            if (respose.data) {
                setDescription(respose.data[keyDescription])
            } else {
                setDescription("")
            }
        } else {
            setDescription("")
        }

    }

    function setState(params: any) {
        let id = params[keyId];
        props.formik.setFieldValue(props.name, id);
    }

    const handleClick = useDebouncedCallback(async (id) => {
        try{
            props.formik.setSubmitting(true)
            await getDesciptionValues(id);
        
        }finally{
            props.formik.setSubmitting(false)
        }
    }, 500);


    return (
        <>
            <Row>
                <Col span={3}>
                    <InputNumber
                        name={props.name}
                        required={required}
                        min={0}
                        label={props.label.label} />
                </Col>
                <Col span={20}>
                    <ItemFormRender>
                        <InputAntd value={description} />
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
                state={isNaN(props.formik.values[props.name]) ? [] : { [keyId]: Number(props.formik.values[props.name]) }}
                label={props.label}
                errorMessage={props.errorMessage}
                path={props.path} />
        </>
    );

}

export default connect<Props, {}>(SelectModelOne);
