import React, { memo } from 'react'
import MaskedInput from 'react-text-mask'
import { Input } from 'antd';
import { FormItem } from 'formik-antd';
import { useField } from 'formik';
import { TextMasks } from '../../utils/TextMasks';

export interface Props {
    name: string;
    label: string;
    placeholder: string;
    required?: boolean
}

const InputCEP: React.FC<Props> = (props) => {

    const [, meta, helpers] = useField(props.name);

    return (
        <FormItem {...props} className="form-custom-item">
            <MaskedInput
                mask={TextMasks.cep}
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
                                propRender.onChange(event);
                                helpers.setValue(event.target.value);
                                event.preventDefault();
                            }}
                        />
                    )
                }} />
        </FormItem>
    )
}

export default memo(InputCEP)
