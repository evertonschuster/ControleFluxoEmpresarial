import React, { useMemo } from 'react'
import NumberFormat, { NumberFormatValues } from 'react-number-format';
import { useField, } from 'formik';
import { ItemFormRender, ValidateStatuses } from '../../hoc/WithFormItem';
import { Input, Form } from 'antd';
import { useDebouncedCallback } from './../../hoc/useDebouncedCallback';

export interface Props {
    name: string;
    label?: string;
    placeholder: string
    required?: boolean;
    prefix?: string;
    disabled?: boolean;
    decimalScale?: number;

    onChange?: (value: number | undefined) => void;
    validateStatus?: typeof ValidateStatuses[number];
    help?: string;
}

const InputDecimal: React.FC<Props> = (props) => {

    const [{ value }, { error, touched }, { setValue, setTouched, }] = useField(props.name);

    const validateStatus = useMemo(() => {
        if (props.help) {
            return props.validateStatus
        }

        if (error && touched) {
            return "error"
        }

        return "validating"

    }, [props.help, error, touched])

    const helpMessage = useMemo(() => {
        if (props.help) {
            return props.help
        }

        if (error && touched) {
            return error
        }

        return undefined
    }, [error, props.help, touched])

    const onChange = useDebouncedCallback((value) => {
        props.onChange && props.onChange(value);
    }, 200)

    function onValueChange(eventValue: NumberFormatValues) {

        if (eventValue.floatValue === value) {
            return;
        }

        setValue(eventValue.floatValue ?? null);
        onChange(eventValue.floatValue ?? null);
    }

    return (
        <Form.Item
            className="select-model-one-style-item"
            validateStatus={validateStatus}
            help={helpMessage}>

            <ItemFormRender label={props.label} required={props.required} showLabel={!!props.label}>
                <NumberFormat
                    disabled={props.disabled}
                    onValueChange={onValueChange}
                    onBlur={() => setTouched(true)}
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
