import React, { memo, useCallback } from 'react'
import MaskedInput from 'react-text-mask'
import { TextMasks } from '../../utils/TextMasks';
import { Input } from 'antd';
import { FormItem } from 'formik-antd';
import { useField } from 'formik';

export interface Props {
    name: string;
    label: string;
    placeholder: string;
    required?: boolean
}

const InputCPFCNPJ: React.FC<Props> = (props) => {

    const [, meta, helpers] = useField(props.name);

    const mask = useCallback(
        (value: string) => {
            if (value.length < 15) {
                return TextMasks.cpf;
            }

            return TextMasks.cnpj;
        }, [])

    return (
        <FormItem {...props} className="form-custom-item">
            <MaskedInput
                mask={mask}
                guide={false}
                showMask
                render={(ref, propRender) => {
                    return (
                        <Input
                            ref={(input: any) => ref(input && input.input)}
                            value={meta.value}
                            placeholder={props.placeholder}
                            {...propRender}
                            onChange={(event) => {
                                propRender.onChange(event)
                                helpers.setValue(event.target.value)
                                event.preventDefault();
                            }}
                        />
                    )
                }} />
        </FormItem>
    )
}


export default memo(InputCPFCNPJ)
