import React, { useEffect, useState } from "react";
import ReactInputMask, { InputState, MaskOptions } from "react-input-mask";
import { Input } from "../WithFormItem/withFormItem";
import { useField } from 'formik';

export interface Porps {
    name: string;
    label: string;
    mask: ((value: string) => string) | string;
}


var lastKeyCode: number;
export const InputMask: React.FC<Porps> = (props) => {

    const [field, meta] = useField(props);
    const [mask, setMask] = useState(typeof props.mask === "string" ? props.mask : props.mask(field.value || ""));






    function beforeMaskedValueChange(newState: InputState, oldState: InputState, userInput: string, maskOptions: MaskOptions): InputState {
        var { value } = newState;
        var selection = newState.selection;

        if (typeof props.mask === "function" && lastKeyCode !== 8) {
            setMask(props.mask(value || ""));
        }

        return {
            value,
            selection
        };
    }

    function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        lastKeyCode = e.keyCode
    }

    return (
        <ReactInputMask mask={mask} {...field} beforeMaskedValueChange={beforeMaskedValueChange} >
            {() =>
                <Input label={props.label} {...field} onKeyDown={onKeyDown} />
            }
        </ReactInputMask>
    );
};



export default InputMask;