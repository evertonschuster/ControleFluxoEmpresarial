import { Input as InputAntd, InputNumber as InputNumberAntd, DatePicker as DatePickerAntd } from "formik-antd"
import { withFormItem } from "../../hoc/WithFormItem"


export const Input = withFormItem(InputAntd, { fast: true })
export const InputNumber = withFormItem(InputNumberAntd, { decimalSeparator: ",", fast: true })

export const DatePicker = withFormItem(DatePickerAntd, { fast: true })