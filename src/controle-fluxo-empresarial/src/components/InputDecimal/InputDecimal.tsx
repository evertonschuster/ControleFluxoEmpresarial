import React from 'react'
import NumberFormat, { NumberFormatValues } from 'react-number-format';
import { useField, } from 'formik';
import { ItemFormRender, ValidateStatuses } from '../../hoc/WithFormItem';
import { Input, Form } from 'antd';
import { useDebouncedCallback } from './../../hoc/useDebouncedCallback';

export interface Props {
    name: string;
    label: string;
    placeholder: string
    required?: boolean;
    prefix?: string;
    decimalScale?: number;

    onChange?: (value: number | undefined) => void;
    validateStatus?: typeof ValidateStatuses[number];
    help?: string;
}

const InputDecimal: React.FC<Props> = (props) => {

    const [{ value }, , { setValue }] = useField(props.name);

    const onChange = useDebouncedCallback((value) => {
        props.onChange && props.onChange(value);
    }, 200)

    function onValueChange(eventValue: NumberFormatValues) {

        if (eventValue.floatValue === value) {
            return;
        }

        setValue(eventValue.floatValue);
        onChange(eventValue.floatValue);
    }

    return (
        <Form.Item
            className="select-model-one-style-item"
            validateStatus={props.validateStatus}
            help={props.help}>

            <ItemFormRender label={props.label} required={props.required}>
                <NumberFormat
                    onValueChange={onValueChange}
                    customInput={Input}
                    value={value}
                    style={{ textAlign: "end" }}
                    placeholder={props.placeholder}
                    prefix={props.prefix}

                    decimalScale={props.decimalScale ?? 2}
                    thousandSeparator={'.'}
                    decimalSeparator={','}
                    fixedDecimalScale={true}
                    isNumericString={true}
                    inputMode="numeric" />
            </ItemFormRender>
        </Form.Item>
    )
}

export default InputDecimal
