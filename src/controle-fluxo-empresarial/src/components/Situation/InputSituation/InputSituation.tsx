import React, { memo } from 'react'
import "./InputSituation.style.less"
import { ItemFormRender } from '../../../hoc/WithFormItem';
import { Switch } from 'antd'
import { useField } from 'formik';

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
