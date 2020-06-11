import React, { useState, useEffect } from 'react'
import Select from 'antd/lib/select'
import { Input, Form } from 'antd'
import './nationality-select-styles.less'
import { ItemFormRender } from '../../hoc/WithFormItem'
import { useField } from 'formik'


export interface Props {
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
}

export enum NATIONALITY_TYPE {
    BRASILEIRO = "Brasileiro",
    ESTRANGEIRO = "Estrangeiro"
}

const NationalitySelect: React.FC<Props> = (props) => {

    const [field, meta, helpers] = useField({ name: props.name });
    const [selectedValue, setSelectedValue] = useState(field.value)

    useEffect(() => {
        setSelectedValue(field.value === NATIONALITY_TYPE.BRASILEIRO ? NATIONALITY_TYPE.BRASILEIRO : NATIONALITY_TYPE.ESTRANGEIRO);
    }, [field.value])

    function onSelect(value: NATIONALITY_TYPE) {
        setSelectedValue(value);

        if (value === NATIONALITY_TYPE.BRASILEIRO) {
            helpers.setValue(value);
        }
        else {
            helpers.setValue(undefined);
        }
    }

    return (
        <Form.Item
            className="select-model-one-style-item"
            validateStatus={meta.error && meta.touched ? "error" : "validating"}
            help={meta.error && meta.touched ? meta.error : ""}>
            <ItemFormRender label={props.label} showLabel={true} required={props.required}>

                <Input.Group compact className="nationality-group">
                    <Select
                        onSelect={onSelect}
                        value={selectedValue}
                        className="nationality-select">
                        <Select.Option value={NATIONALITY_TYPE.BRASILEIRO}>{NATIONALITY_TYPE.BRASILEIRO}</Select.Option >
                        <Select.Option value={NATIONALITY_TYPE.ESTRANGEIRO}>{NATIONALITY_TYPE.ESTRANGEIRO}</Select.Option >
                    </Select>
                    <Input style={{ width: '80%' }} hidden={selectedValue === NATIONALITY_TYPE.BRASILEIRO} {...field} placeholder={props.placeholder} />
                </Input.Group>

            </ItemFormRender>
        </Form.Item>
    )
}

export default NationalitySelect
