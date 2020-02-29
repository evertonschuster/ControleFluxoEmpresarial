import { Input as InputAntd, InputNumber as InputNumberAntd, DatePicker as DatePickerAntd } from "formik-antd"
import { withFormItem } from "../../hoc/WithFormItem"


export const Input = withFormItem(InputAntd)
export const InputNumber = withFormItem(InputNumberAntd, { decimalSeparator:"," })

export const DatePicker = withFormItem(DatePickerAntd)