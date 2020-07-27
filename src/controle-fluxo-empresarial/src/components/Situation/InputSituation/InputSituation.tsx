import React, { memo } from 'react'
import { Switch } from 'antd'
import { useField } from 'formik';
import { ItemFormRender } from '../../../hoc/WithFormItem';
import "./InputSituation.style.less"

export interface Props {
    name: string;
}

const InputSituation: React.FC<Props> = (props) => {
    const [, meta, helpers] = useField(props);

    function onClick() {
        if (!meta.value) {
            return helpers.setValue(new Date());
        }

        helpers.setValue(undefined);
    }

    return (
        <ItemFormRender label="Situação">
            <Switch className="switch-class"
                checkedChildren="Habilitado"
                unCheckedChildren="Desabilitado"
                onClick={onClick}
                defaultChecked
                checked={!meta.value} />
        </ItemFormRender>
    )
}

export default memo(InputSituation, () => true)
