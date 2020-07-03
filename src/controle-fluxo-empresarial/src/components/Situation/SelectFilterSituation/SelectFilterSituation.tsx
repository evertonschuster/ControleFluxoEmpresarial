import React, { useState, useRef, useEffect } from 'react'
import { SITUACAO } from '../../../models/BaseEntity';
import { Icon, Tooltip } from 'antd';
import "./select-filter-situation.styles.less"
import MenuSituation from './component/MenuSituation';

export interface Props {
    onChange: (values: SITUACAO) => void;
}

const SelectFilterSituation: React.FC<Props> = (props) => {

    const [situacao, setSituacao] = useState<SITUACAO>(SITUACAO.HABILITADO);
    const refSelectMenu = useRef<HTMLDivElement>(null);
    const [showOptions, setShowOptions] = useState<boolean>(false)

    useEffect(() => {
        props.onChange(situacao);
    }, [props, situacao])

    return (
        <Tooltip placement="top" title="Filtro por situação." >
            <div className="select-situation" ref={refSelectMenu} onClick={() => setShowOptions((value) => !value)}>
                <span className="select-situation-description">
                    {situacao}
                </span>
                <span>
                    <Icon type={showOptions ? "up" : "down"} style={{ fontSize: 15 }} />
                </span>
            </div>

            {showOptions && <MenuSituation parent={refSelectMenu.current} situation={situacao} setSituacao={setSituacao} onClose={() => setShowOptions(false)} />}

        </Tooltip>
    )
}

export default SelectFilterSituation
