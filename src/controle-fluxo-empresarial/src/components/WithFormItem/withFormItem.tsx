import * as formikAntd from "formik-antd"
import { withFormItem, withFormItemCustom } from "../../hoc/WithFormItem"
import MaskedInput from 'react-text-mask'
import { memo } from "react";

export const Input = withFormItem(formikAntd.Input, { fast: true });
export const InputNumber = withFormItem(formikAntd.InputNumber, { decimalSeparator: ",", fast: true });
export const InputMasked = withFormItemCustom(MaskedInput, { fast: true });
export const TextArea = withFormItem(formikAntd.Input.TextArea, { fast: true });

export const Select = withFormItem(formikAntd.Select, { fast: true })

export const DatePicker = memo(withFormItem(formikAntd.DatePicker, { fast: true }));

export const Switch = withFormItem(formikAntd.Switch, { fast: true });