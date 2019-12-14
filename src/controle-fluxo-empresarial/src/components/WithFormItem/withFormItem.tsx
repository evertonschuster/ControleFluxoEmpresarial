import { Input as InputAntd, InputNumber as InputNumberAntd } from "formik-antd"
import { withFormItem } from "../../hoc/WithFormItem"


export const Input = withFormItem(InputAntd)
export const InputNumber = withFormItem(InputNumberAntd)