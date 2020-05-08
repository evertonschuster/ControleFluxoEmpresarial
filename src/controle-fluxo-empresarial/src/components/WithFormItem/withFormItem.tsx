import * as formikAntd from "formik-antd"
import { withFormItem } from "../../hoc/WithFormItem"


export const Input = withFormItem(formikAntd.Input, { fast: true });
export const InputNumber = withFormItem(formikAntd.InputNumber, { decimalSeparator: ",", fast: true });

export const Select = withFormItem(formikAntd.Select, { fast: true })

export const DatePicker = withFormItem(formikAntd.DatePicker, { fast: true });