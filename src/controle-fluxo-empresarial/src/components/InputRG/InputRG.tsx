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

const InputRG: React.FC<Props> = (props) => {

    const [, meta, helpers] = useField(props.name);

    const mask = useCallback(
        (value: string) => {
            let length = value.replace(/[^\d]+/g, "").length;

            if (length < 10) {
                return TextMasks.rg;
            }
            else if (length < 11) {
                return TextMasks.inscricaoEstadual;
            }
            else if (length < 12) {
                return [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
            }

            return false;
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


export default memo(InputRG)
